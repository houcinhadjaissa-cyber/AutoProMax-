export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse bg-autopro-border rounded ${className}`} />;
}

export function CardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-autopro-border overflow-hidden">
      <div className="h-40 bg-autopro-bg" />
      <div className="p-3 space-y-2"><Skeleton className="h-3 w-16" /><Skeleton className="h-4 w-full" /><Skeleton className="h-3 w-24" /><div className="flex items-center justify-between pt-2"><Skeleton className="h-6 w-20" /><Skeleton className="h-8 w-16" /></div></div>
    </div>
  );
}
