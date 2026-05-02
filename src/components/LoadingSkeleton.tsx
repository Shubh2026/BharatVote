import { Skeleton } from "@/components/ui/skeleton";

export function LoadingSkeleton() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl animate-in fade-in duration-500">
      <div className="space-y-8">
        <div className="space-y-4">
          <Skeleton className="h-12 w-3/4 mx-auto rounded-xl" />
          <Skeleton className="h-6 w-1/2 mx-auto rounded-lg" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-[200px] rounded-3xl" />
          <Skeleton className="h-[200px] rounded-3xl" />
          <Skeleton className="h-[200px] rounded-3xl" />
          <Skeleton className="h-[200px] rounded-3xl" />
        </div>
        
        <div className="space-y-4 pt-8">
          <Skeleton className="h-[400px] w-full rounded-3xl" />
        </div>
      </div>
    </div>
  );
}
