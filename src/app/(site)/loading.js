// Shown instantly while a page's data loads (helpful on slow mobile networks).
export default function Loading() {
  return (
    <div className="container-x animate-pulse py-10" aria-busy="true" aria-label="Loading">
      <div className="h-8 w-2/3 max-w-md rounded-xl bg-surface" />
      <div className="mt-3 h-5 w-1/2 max-w-sm rounded-lg bg-surface" />
      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="overflow-hidden rounded-2xl border border-navy/5">
            <div className="aspect-square bg-surface" />
            <div className="space-y-2 p-4">
              <div className="h-4 rounded bg-surface" />
              <div className="h-4 w-2/3 rounded bg-surface" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
