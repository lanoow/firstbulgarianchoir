"use client";

import { PhotoProvider, PhotoView } from 'react-photo-view';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import "react-photo-view/dist/react-photo-view.css";

const HeroImage = () => {
	const t = useTranslations("general");
	return (
		<PhotoProvider>
			<PhotoView src="/home.jpg">
				<Image
					width={2000}
					height={1000}
					src="/home.jpg"
					alt={t("fbc")}
					className="absolute -top-1/2"
				/>
			</PhotoView>
		</PhotoProvider>
	)
}

export default HeroImage;