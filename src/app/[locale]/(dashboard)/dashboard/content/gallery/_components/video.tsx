"use client";

import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import { Play } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { deleteGalleryPost } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

interface VideoProps {
	id: string;
	media: string;
}

const Video: React.FC<VideoProps> = ({ id, media }) => {
	const t = useTranslations();
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	const handleDelete = () => {
		startTransition(() => {
			toast.promise(deleteGalleryPost(id), {
				loading: t("general.deleting"),
				success: t("success.post_deleted"),
				error: t("errors.unknown_error"),
				finally: () => {
					router.refresh();
				}
			});
		});
	}

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
			<DialogContent className="lg:max-w-screen-md xl:max-w-screen-lg 2xl:max-w-screen-xl p-4">
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
				<DialogFooter className="flex flex-col space-y-2 sm:flex-row sm:space-y-0">
					<DialogClose asChild>
						<Button variant="outline" disabled={isPending}>
							{t("general.close")}
						</Button>
					</DialogClose>
					<Button variant="destructive" onClick={handleDelete} disabled={isPending}>
						{t("general.delete")}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default Video;