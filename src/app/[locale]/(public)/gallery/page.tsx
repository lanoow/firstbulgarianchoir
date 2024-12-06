import GallerySkeleton from "../../(dashboard)/dashboard/content/gallery/_components/skeleton";
import { getTranslations } from "next-intl/server";
import GalleryClient from "./_components/client";
import { getGallery } from "@/lib/actions";
import { Alice } from "next/font/google";
import { Suspense } from "react";

const alice = Alice({ subsets: ["latin-ext", "cyrillic-ext"], weight: "400", display: "swap" });

export default async function Gallery() {
	const t = await getTranslations();
	const gallery = await getGallery();

	return (
		<div className="flex flex-col w-full space-y-4">
			<h2 className={`${alice.className} text-3xl uppercase`}>
				{t("navigation.gallery")}
			</h2>

			<Suspense fallback={<GallerySkeleton />}>
				<GalleryClient gallery={gallery} />
			</Suspense>
		</div>
	)
}