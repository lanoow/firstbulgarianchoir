"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import { useTranslations } from 'next-intl';
import { Play } from 'lucide-react';
import Image from 'next/image';

interface VideoProps {
	media: string;
}

const Video: React.FC<VideoProps> = ({ media }) => {
	const t = useTranslations();

	return (
		<Dialog>
			<DialogTrigger asChild>
				<div className="relative overflow-hidden transition rounded-md cursor-pointer aspect-video hover:opacity-70">
					<Image
						width={500}
						height={500}
						src={`https://img.youtube.com/vi/${media}/hqdefault.jpg`}
						alt="YouTube Embed Poster"
						className="scale-150 aspect-video"
					/>

					<div className='absolute px-2 py-1 text-white -translate-x-1/2 -translate-y-1/2 rounded-md top-1/2 left-1/2 bg-neutral-400/50'>
						<Play />
					</div>
				</div>
			</DialogTrigger>
			<DialogContent className="max-w-screen-xl p-4">
				<DialogHeader>
					<DialogTitle>
						{t("general.video")}
					</DialogTitle>
				</DialogHeader>
				<div className="overflow-hidden rounded-md">
					<LiteYouTubeEmbed
						id={media}
						webp={true}
						title="YouTube Embed"
					/>
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default Video;