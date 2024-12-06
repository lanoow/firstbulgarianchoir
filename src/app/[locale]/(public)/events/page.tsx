import { getTranslations } from "next-intl/server";
import EventSkeleton from "../_components/event-skeleton";
import EventsClient from "./_components/client";
import { getEvents } from "@/lib/actions";
import { Alice } from "next/font/google";
import { Suspense } from "react";

const alice = Alice({ subsets: ["latin-ext", "cyrillic-ext"], weight: "400", display: "swap" });

export default async function Events() {
	const t = await getTranslations();
	const events = await getEvents();

	return (
		<div className="flex flex-col w-full space-y-4">
			<h2 className={`${alice.className} text-3xl uppercase`}>
				{t("navigation.events")}
			</h2>

			<Suspense fallback={<EventSkeleton />}>
				<EventsClient events={events} />
			</Suspense>
		</div>
	)
}