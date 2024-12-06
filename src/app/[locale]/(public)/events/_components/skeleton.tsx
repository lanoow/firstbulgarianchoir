import EventSkeleton from "../../_components/event-skeleton";

const EventsSkeleton = () => {
	return (
		<div className="grid w-full grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
			<EventSkeleton />
			<EventSkeleton />
			<EventSkeleton />
			<EventSkeleton />
			<EventSkeleton />
			<EventSkeleton />
		</div>
	)
}

export default EventsSkeleton;