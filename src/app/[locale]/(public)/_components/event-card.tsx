import { Calendar, MapPin } from "lucide-react";
import { getLocale } from "next-intl/server";
import EventSkeleton from "./event-skeleton";
import { Alice } from "next/font/google";
import { SafeEvent } from "@/types";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";

const alice = Alice({ subsets: ["latin-ext", "cyrillic-ext"], weight: "400", display: "swap" });

const EventCard: React.FC<SafeEvent> = async ({ titleBG, titleEN, locationBG, locationEN, cover, date, slug }) => {
	const locale = await getLocale();

	return (
		<Suspense fallback={<EventSkeleton />}>
			<Link href={`/events/${slug}`} className="flex flex-col items-start w-full space-y-4 transition hover:opacity-70">
				<div className="flex flex-col w-full space-y-2">
					<Image
						width={1000}
						height={1000}
						src={`https://utfs.io/f/${cover}`}
						alt={titleBG}
						className="w-full rounded-md sm:h-64 aspect-video"
					/>
					<h3 className={`text-lg sm:text-xl ${alice.className}`}>
						{locale === "en" ? (titleEN ? titleEN : titleBG) : titleBG}
					</h3>
				</div>

				<div className="flex items-center justify-between w-full gap-2 text-sm sm:text-md">
					<div className="flex items-center space-x-1">
						<MapPin className="size-5 sm:h-6 sm:w-6" />
						<span>
							{locale === "en" ?
								(locationEN ? locationEN : locationBG)
								: locationBG
							}
						</span>
					</div>

					<div className="flex items-center space-x-1">
						<Calendar className="size-5 sm:h-6 sm:w-6" />
						<span>
							{new Date(date).toLocaleDateString(locale)}
						</span>
					</div>
				</div>
			</Link>
		</Suspense>
	)
}

export default EventCard;