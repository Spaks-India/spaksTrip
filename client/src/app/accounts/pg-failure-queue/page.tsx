export default function PGFailureQueuePage() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
      <h1 className="text-2xl font-bold text-ink">PG Failure Queue</h1>
      <p className="mt-2 text-sm text-ink-muted">Retry failed payment gateway transactions.</p>
    </div>
  );
}
