import GallerySkeleton from "../../(dashboard)/dashboard/content/gallery/_components/skeleton";
import GalleryClient from "./_components/client";
import { getGallery } from "@/lib/actions";
import { Suspense } from "react";

export default async function Gallery() {
	const gallery = await getGallery();

	return (
		<Suspense fallback={<GallerySkeleton />}>
			<GalleryClient gallery={gallery} />
		</Suspense>
	)
}