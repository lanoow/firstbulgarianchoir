import { Skeleton } from "@/components/ui/skeleton";

const EventSkeleton = () => {
	return (
		<div className="flex flex-col items-start space-y-4">
			<Skeleton className="w-full h-64 rounded-md aspect-video" />
			<Skeleton className="w-full h-8 rounded-md" />
			<Skeleton className="w-1/2 h-8 rounded-md" />

			<div className="flex items-center justify-between w-full gap-2">
				<Skeleton className="w-1/3 h-4 rounded-md" />
				<Skeleton className="w-1/3 h-4 rounded-md" />
			</div>
		</div>
	)
}

export default EventSkeleton;