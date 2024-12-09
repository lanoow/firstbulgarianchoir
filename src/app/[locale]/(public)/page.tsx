import { getTranslations } from "next-intl/server";
import HeroImage from "./_components/hero-image";
import EventCard from "./_components/event-card";
import { Button } from "@/components/ui/button";
import HomeGallery from "./_components/gallery";
import { getEvents, getHomeGallery } from "@/lib/actions";
import { Alice } from "next/font/google";
import Link from "next/link";
import { Metadata } from "next";

const alice = Alice({ subsets: ["latin-ext", "cyrillic-ext"], weight: "400", display: "swap" });

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: `${t("general.fbcLg")} ${t("general.YankoMustakov")}`,
    description: `${t("home.description")}`,
    openGraph: {
      images: [
        '/home.jpg'
      ]
    }
  }
}

export default async function Home() {
  const t = await getTranslations();
  const gallery = await getHomeGallery();
  const events = await getEvents();

  return (
    <div className="flex flex-col space-y-32 max-w-screen-2xl">
      <div className="flex flex-col items-center space-y-8">
        <div className="w-full max-h-[25rem] aspect-video overflow-hidden rounded-md relative shadow-xl">
          <HeroImage />
        </div>

        <div className="flex flex-col items-center mx-auto space-y-4">
          <h1 className={`flex flex-col items-center text-3xl sm:text-4xl text-center uppercase ${alice.className}`}>
            <span>{t("general.fbcLg")}</span>
            <span>{t("general.YankoMustakov")}</span>
          </h1>

          <p className={`text-xl sm:text-2xl max-w-[25rem] text-center ${alice.className}`}>
            {t("home.description")}
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <Button size="lg" className="text-lg uppercase" asChild>
              <Link href="/history">
                {t("general.more")}
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg uppercase" asChild>
              <Link href="/contacts">
                {t("navigation.contacts")}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center w-full space-y-8">
        <h2 className={`${alice.className} text-3xl uppercase hover:opacity-70 transition`}>
          <Link href="/events/">
            {t("home.latestEvents")}
          </Link>
        </h2>

        <div className="grid w-full grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard
              key={event.slug}
              {...event}
            />
          ))}
        </div>

        <Button
          size="lg"
          variant="outline"
          className="sm:text-lg"
          asChild
        >
          <Link href="/events/">
            {t("general.more")}
          </Link>
        </Button>
      </div>

      <div className="flex flex-col items-center space-y-8">
        <h2 className={`${alice.className} text-3xl uppercase hover:opacity-70 transition`}>
          <Link href="/gallery/">
            {t("navigation.gallery")}
          </Link>
        </h2>

        <HomeGallery gallery={gallery} />

        <Button
          size="lg"
          variant="outline"
          className="sm:text-lg"
          asChild
        >
          <Link href="/gallery/">
            {t("general.more")}
          </Link>
        </Button>
      </div>
    </div>
  )
}