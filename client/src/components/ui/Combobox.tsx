"use client";

import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";

export type ComboOption = {
  value: string;
  label: string;
  sublabel?: string;
  badge?: string;
  group?: string;
};

type Props = {
  label?: string;
  placeholder?: string;
  value: ComboOption | null;
  onChange: (v: ComboOption | null) => void;
  search: (q: string) => Promise<ComboOption[]> | ComboOption[];
  leading?: ReactNode;
  renderOption?: (o: ComboOption, active: boolean) => ReactNode;
  renderValue?: (o: ComboOption) => ReactNode;
  minQuery?: number;
  emptyText?: string;
  className?: string;
  inputClassName?: string;
  autoFocus?: boolean;
};

export default function Combobox({
  label,
  placeholder,
  value,
  onChange,
  search,
  leading,
  renderOption,
  renderValue,
  minQuery = 0,
  emptyText = "No matches",
  className,
  inputClassName,
  autoFocus,
}: Props) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [opts, setOpts] = useState<ComboOption[]>([]);
  const [hover, setHover] = useState(0);
  const [busy, setBusy] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    if (query.length < minQuery) {
      Promise.resolve().then(() => {
        if (cancelled) return;
        setOpts([]);
        setBusy(false);
      });
      return () => { cancelled = true; };
    }
    Promise.resolve()
      .then(() => {
        if (cancelled) return [];
        setBusy(true);
        return search(query);
      })
      .then((result) => {
        if (cancelled) return;
        setOpts(result);
        setHover(0);
        setBusy(false);
      });
    return () => { cancelled = true; };
  }, [query, open, search, minQuery]);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  // Input is always in the DOM so focus is immediate — no setTimeout needed.
  useLayoutEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const select = (o: ComboOption) => {
    onChange(o);
    setOpen(false);
    setQuery("");
  };

  const grouped = (() => {
    const g = new Map<string, ComboOption[]>();
    for (const o of opts) {
      const k = o.group ?? "";
      if (!g.has(k)) g.set(k, []);
      g.get(k)!.push(o);
    }
    return g;
  })();

  let flatIndex = -1;

  // Whether the selected-value overlay is visible (input is opacity-0 behind it).
  const showValueOverlay = Boolean(value && !open);

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      {label ? (
        <label htmlFor={id} className="text-[12px] font-medium text-ink-muted cursor-text">
          {label}
        </label>
      ) : null}

      {/*
        The entire bordered block is one click target.
        The <input> is always mounted so every click inside naturally focuses it
        and triggers onFocus → setOpen(true).
        When a value is selected and the dropdown is closed, a pointer-events-none
        overlay shows the formatted value while the invisible input sits behind it.
      */}
      <div
        className={cn(
          "relative flex cursor-text items-center gap-2 rounded-md border border-border bg-white px-3 h-11 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/20",
          inputClassName,
        )}
      >
        {leading ? <span className="text-ink-muted">{leading}</span> : null}

        {/* Stretch wrapper fills the full height so the overlay covers the whole area */}
        <div className="relative flex min-w-0 flex-1 self-stretch items-center">
          {/* Value display — sits above the input, passes all pointer events through */}
          {showValueOverlay ? (
            <div className="pointer-events-none absolute inset-0 flex items-center">
              {renderValue ? (
                renderValue(value!)
              ) : (
                <span className="flex min-w-0 flex-col">
                  <span className="truncate text-[14px] font-semibold text-ink">
                    {value!.label}
                  </span>
                  {value!.sublabel ? (
                    <span className="truncate text-[11px] text-ink-muted">
                      {value!.sublabel}
                    </span>
                  ) : null}
                </span>
              )}
            </div>
          ) : null}

          {/* Input — always rendered. When the overlay is active it is invisible
              but still covers the full area and receives focus/click events. */}
          <input
            id={id}
            ref={inputRef}
            autoFocus={autoFocus}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setHover((h) => Math.min(opts.length - 1, h + 1));
              }
              if (e.key === "ArrowUp") {
                e.preventDefault();
                setHover((h) => Math.max(0, h - 1));
              }
              if (e.key === "Enter" && opts[hover]) {
                e.preventDefault();
                select(opts[hover]);
              }
              if (e.key === "Escape") setOpen(false);
            }}
            placeholder={showValueOverlay ? "" : placeholder}
            aria-label={showValueOverlay ? (value?.label ?? label) : label}
            className={cn(
              "h-full w-full min-w-0 flex-1 bg-transparent text-[14px] text-ink outline-none placeholder:text-ink-subtle",
              showValueOverlay && "opacity-0",
            )}
          />
        </div>

        {value ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onChange(null);
              setQuery("");
              setOpen(true);
            }}
            aria-label="Clear"
            className="shrink-0 text-ink-muted hover:text-ink"
          >
            <svg
              viewBox="0 0 24 24"
              width={14}
              height={14}
              fill="none"
              stroke="currentColor"
              strokeWidth={2.2}
              strokeLinecap="round"
              aria-hidden
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        ) : null}
      </div>

      {open ? (
        <div
          role="listbox"
          className="absolute z-50 mt-1.5 w-full min-w-[280px] rounded-lg border border-border-soft bg-white shadow-[var(--shadow-pop)] max-h-[340px] overflow-y-auto scrollbar-thin animate-pop-in"
        >
          {busy ? (
            <div className="px-4 py-3 text-[13px] text-ink-muted">Searching…</div>
          ) : opts.length === 0 ? (
            <div className="px-4 py-3 text-[13px] text-ink-muted">{emptyText}</div>
          ) : (
            Array.from(grouped.entries()).map(([gk, list]) => (
              <div key={gk}>
                {gk ? (
                  <div className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wide text-ink-subtle">
                    {gk}
                  </div>
                ) : null}
                {list.map((o) => {
                  flatIndex += 1;
                  const active = flatIndex === hover;
                  return (
                    <button
                      key={o.value}
                      type="button"
                      role="option"
                      aria-selected={active}
                      onMouseEnter={() => setHover(flatIndex)}
                      onClick={() => select(o)}
                      className={cn(
                        "flex w-full items-center gap-3 px-3 py-2 text-left",
                        active ? "bg-brand-50" : "hover:bg-surface-muted",
                      )}
                    >
                      {renderOption ? (
                        renderOption(o, active)
                      ) : (
                        <>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-[14px] font-semibold text-ink">
                              {o.label}
                            </span>
                            {o.sublabel ? (
                              <span className="block truncate text-[12px] text-ink-muted">
                                {o.sublabel}
                              </span>
                            ) : null}
                          </span>
                          {o.badge ? (
                            <span className="rounded bg-surface-sunken px-2 py-0.5 text-[11px] font-semibold text-ink-muted">
                              {o.badge}
                            </span>
                          ) : null}
                        </>
                      )}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>
      ) : null}
    </div>
  );
}
