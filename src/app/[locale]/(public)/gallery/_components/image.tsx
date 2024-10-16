"use client";

import Image from "next/image";
import { PhotoView } from "react-photo-view";

interface GalleryImageProps {
	media: string;
}

const GalleryImage: React.FC<GalleryImageProps> = ({ media }) => {
	return (
		<PhotoView src={`https://utfs.io/f/${media}`}>
			<div className="w-full overflow-hidden transition rounded-md cursor-pointer hover:opacity-70">
				<Image
					src={`https://utfs.io/f/${media}`}
					alt="Gallery Image"
					width={700}
					height={700}
					className="aspect-video"
				/>
			</div>
		</PhotoView>
	)
}

export default GalleryImage;