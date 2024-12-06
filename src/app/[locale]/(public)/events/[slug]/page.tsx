import { getLocale, getTranslations } from "next-intl/server";
import { Calendar, ChevronLeft, MapPin } from "lucide-react";
import EventContent from "./_components/content";
import { notFound } from "next/navigation";
import { getEvent } from "@/lib/actions";
import { Alice } from "next/font/google";
import { Locale } from "@/types";
import Image from "next/image";
import Link from "next/link";

const alice = Alice({ subsets: ["latin-ext", "cyrillic-ext"], weight: "400", display: "swap" });

export default async function Event({ params }: { params: { slug?: string } }) {
	const locale = await getLocale() as Locale;
	const t = await getTranslations();
	const { slug } = await params;

	if (!slug) {
		return notFound();
	}

	const event = await getEvent(slug);

	if (!event) {
		return notFound();
	}

	return (
		<div className="flex flex-col w-full space-y-4">
			<Link href="/events/" className="flex items-center space-x-1 no-underline hover:underline underline-offset-4 w-fit">
				<ChevronLeft className="size-5" />
				<span>{t("general.back")}</span>
			</Link>

			<div className="flex flex-col w-full space-y-4">
				<div className="flex flex-col w-full space-y-2">
					<h1 className={`text-2xl font-bold sm:text-3xl first-letter:uppercase ${alice.className}`}>
						{locale === "bg" ? event.titleBG : (event.titleEN ? event.titleEN : event.titleBG)}
					</h1>

					<div className="flex items-center space-x-4">
						<div className="flex items-center space-x-1">
							<MapPin className="size-5 sm:size-6" />
							<span>
								{locale === "bg" ?
									event.locationBG
									: (event.locationEN ? event.locationEN : event.locationBG)
								}
							</span>
						</div>

						<div className="flex items-center space-x-1">
							<Calendar className="size-5 sm:size-6" />
							<span>
								{new Date(event.date).toLocaleDateString(locale)}
							</span>
						</div>
					</div>
				</div>

				<Image
					width={1000}
					height={1000}
					src={`https://utfs.io/f/${event.cover}`}
					alt={event.titleBG}
					className="w-full rounded-md aspect-video"
				/>

				<EventContent locale={locale} titleBG={event.titleBG} titleEN={event.titleEN} />
			</div>
		</div>
	)
}