import { getTranslations } from "next-intl/server";
import HeroImage from "./_components/hero-image";
import EventCard from "./_components/event-card";
import { Button } from "@/components/ui/button";
import { Alice } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const alice = Alice({ subsets: ["latin-ext", "cyrillic-ext"], weight: "400" });

export default async function Home() {
  const t = await getTranslations();

  const events = [
    {
      titleBG: "Заглавен текст на последно събитие",
      titleEN: "Event 1",
      slug: "sabitie-1",
      locationBG: "Място 1",
      locationEN: "Location 1",
      cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxQ0UUZjrC7vTAdiXCgYcFdF3TH5_s8L8c8w&s",
      date: new Date().toISOString()
    },
    {
      titleBG: "Заглавен текст на последно събитие",
      titleEN: "Event 1",
      slug: "sabitie-1",
      locationBG: "Място 1",
      locationEN: "Location 1",
      cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxQ0UUZjrC7vTAdiXCgYcFdF3TH5_s8L8c8w&s",
      date: new Date().toISOString()
    },
    {
      titleBG: "Заглавен текст на последно събитие",
      titleEN: "Event 1",
      slug: "sabitie-1",
      locationBG: "Място 1",
      locationEN: "Location 1",
      cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxQ0UUZjrC7vTAdiXCgYcFdF3TH5_s8L8c8w&s",
      date: new Date().toISOString()
    }
  ];

  return (
    <div className="flex flex-col space-y-32 max-w-screen-2xl">
      <div className="flex flex-col items-center space-y-8">
        <div className="w-full h-[25rem] overflow-hidden rounded-md relative shadow-xl">
          <HeroImage />
        </div>

        <div className="flex flex-col items-center mx-auto space-y-4">
          <h1 className={`flex flex-col items-center text-4xl uppercase ${alice.className}`}>
            <span>{t("general.fbcLg")}</span>
            <span>{t("general.YankoMustakov")}</span>
          </h1>

          <p className={`text-2xl max-w-[25rem] text-center ${alice.className}`}>
            {t("home.description")}
          </p>

          <div className="flex flex-col items-center gap-4 lg:flex-row">
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

      <div className="flex flex-col items-center space-y-8">
        <h2 className={`${alice.className} text-3xl uppercase`}>{t("home.latestEvents")}</h2>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard
              key={event.slug}
              {...event}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center space-y-8">
        <h2 className={`${alice.className} text-3xl uppercase`}>{t("navigation.gallery")}</h2>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpbD6wK_XFLjPKiFZYl9fRHSx55lEOlXKUHQ&s"
            alt="Gallery 1"
            width={700}
            height={700}
            className="w-full h-64 rounded-md aspect-video"
          />

          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpbD6wK_XFLjPKiFZYl9fRHSx55lEOlXKUHQ&s"
            alt="Gallery 1"
            width={700}
            height={700}
            className="w-full h-64 rounded-md aspect-video"
          />

          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpbD6wK_XFLjPKiFZYl9fRHSx55lEOlXKUHQ&s"
            alt="Gallery 1"
            width={700}
            height={700}
            className="w-full h-64 rounded-md aspect-video"
          />

          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpbD6wK_XFLjPKiFZYl9fRHSx55lEOlXKUHQ&s"
            alt="Gallery 1"
            width={700}
            height={700}
            className="w-full h-64 rounded-md aspect-video"
          />

          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpbD6wK_XFLjPKiFZYl9fRHSx55lEOlXKUHQ&s"
            alt="Gallery 1"
            width={700}
            height={700}
            className="w-full h-64 rounded-md aspect-video"
          />

          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpbD6wK_XFLjPKiFZYl9fRHSx55lEOlXKUHQ&s"
            alt="Gallery 1"
            width={700}
            height={700}
            className="w-full h-64 rounded-md aspect-video"
          />
        </div>
      </div>
    </div>
  )
}