"use client";

import { useEffect, useMemo, useState } from "react";
import { defaultTaxiFilters, searchTaxiPackages } from "@/lib/taxiPackage";
import type { TaxiFilters, TaxiSearchParams, TaxiSort } from "@/types/taxi";

export function useTaxiSearch(params: TaxiSearchParams) {
  const [filters, setFilters] = useState<TaxiFilters>(defaultTaxiFilters);
  const [sort, setSort] = useState<TaxiSort>("recommended");
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let cancelled = false;
    Promise.resolve().then(() => {
      if (cancelled) return;
      setStatus("loading");
    });
    const timer = window.setTimeout(() => {
      if (cancelled) return;
      setStatus("ready");
    }, 450);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [params]);

  const packages = useMemo(() => searchTaxiPackages(params, filters, sort), [params, filters, sort]);

  return { status, packages, filters, setFilters, sort, setSort };
}
