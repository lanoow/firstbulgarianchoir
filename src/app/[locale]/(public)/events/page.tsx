import EventSkeleton from "../_components/event-skeleton";
import EventsClient from "./_components/client";
import { getEvents } from "@/lib/actions";
import { Suspense } from "react";

export default async function Events() {
	const events = await getEvents();

	return (
		<Suspense fallback={<EventSkeleton />}>
			<EventsClient events={events} />
		</Suspense>
	)
}