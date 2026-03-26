export default function Loading() {
  return (
    <div className="page-shell">
      <header className="page-header">
        <div className="h-8 w-32 bg-slate-700/50 rounded animate-pulse mb-3" />
        <div className="h-4 w-80 bg-slate-700/30 rounded animate-pulse" />
      </header>

      {/* Filter skeleton */}
      <div className="flex gap-2 mb-8">
        {[80, 72, 88, 64, 96, 76].map((w, i) => (
          <div key={i} className="h-7 rounded-md bg-slate-700/40 animate-pulse" style={{ width: w }} />
        ))}
      </div>

      {/* Card grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-5 space-y-3">
            <div className="flex justify-between">
              <div className="h-4 w-24 bg-slate-700/50 rounded animate-pulse" />
              <div className="h-4 w-16 bg-slate-700/30 rounded animate-pulse" />
            </div>
            <div className="h-4 w-full bg-slate-700/50 rounded animate-pulse" />
            <div className="h-4 w-3/4 bg-slate-700/40 rounded animate-pulse" />
            <div className="h-3 w-full bg-slate-700/30 rounded animate-pulse" />
            <div className="h-3 w-2/3 bg-slate-700/20 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
