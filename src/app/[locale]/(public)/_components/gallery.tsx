"use client";

import { SafeGallery } from "@/types";
import { MediaType } from "@prisma/client";
import { Fragment } from "react";
import { PhotoProvider } from "react-photo-view";
import Video from "../gallery/_components/video";
import GalleryImage from "../gallery/_components/image";

interface HomeGalleryProps {
	gallery: SafeGallery[];
}

const HomeGallery: React.FC<HomeGalleryProps> = ({ gallery }) => {
	return (
		<PhotoProvider>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{gallery.map((media: SafeGallery) => (
					<Fragment key={media.id}>
						{media.mediaType === MediaType.VIDEO ? (
							<Video media={media.media} />
						) : (
							<GalleryImage media={media.media} />
						)}
					</Fragment>
				))}
			</div>
		</PhotoProvider>
	)
}

export default HomeGallery;