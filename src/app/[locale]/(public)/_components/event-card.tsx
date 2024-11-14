import { Calendar, MapPin } from "lucide-react";
import { getLocale } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import EventSkeleton from "./event-skeleton";

interface EventCardProps {
	titleBG: string;
	titleEN: string;
	locationBG: string;
	locationEN: string;
	cover: string;
	date: string;
	slug: string;
}

const EventCard: React.FC<EventCardProps> = async ({ titleBG, titleEN, locationBG, locationEN, cover, date, slug }) => {
	const locale = await getLocale();

	return (
		<Suspense fallback={<EventSkeleton />}>
			<Link href={`/events/${slug}`} className="flex flex-col items-start w-full space-y-4 transition hover:opacity-70">
				<div className="flex flex-col w-full space-y-2">
					<Image
						width={700}
						height={700}
						src={cover}
						alt={titleBG}
						className="w-full rounded-md sm:h-64 aspect-video"
					/>
					<h3 className="text-lg sm:text-xl">
						{locale === "en" ? (titleEN ? titleEN : titleBG) : titleBG}
					</h3>
				</div>

				<div className="flex items-center justify-between w-full gap-2 text-sm sm:text-md">
					<div className="flex items-center space-x-1">
						<MapPin className="w-5 h-5 sm:h-6 sm:w-6" />
						<span>
							{locale === "en" ?
								(locationEN ? locationEN : locationBG)
								: locationBG
							}
						</span>
					</div>

					<div className="flex items-center space-x-1">
						<Calendar className="w-5 h-5 sm:h-6 sm:w-6" />
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