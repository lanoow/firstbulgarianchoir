"use client";

import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useTransition } from "react";
import { deleteGalleryPost } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface GalleryImageProps {
	id: string;
	media: string;
}

const GalleryImage: React.FC<GalleryImageProps> = ({ id, media }) => {
	const t = useTranslations();
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

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
				<div className="w-full overflow-hidden transition rounded-md cursor-pointer aspect-video hover:opacity-70">
					<Image
						src={`https://utfs.io/f/${media}`}
						alt="Gallery Image"
						width={500}
						height={500}
						className="aspect-video"
					/>
				</div>
			</DialogTrigger>
			<DialogContent className="max-w-screen-xl p-4">
				<DialogHeader>
					<DialogTitle>
						{t("general.image")}
					</DialogTitle>
				</DialogHeader>
				<div className="overflow-hidden rounded-md">
					<Image
						src={`https://utfs.io/f/${media}`}
						alt="Gallery Image"
						width={1000}
						height={1000}
						className="w-full"
					/>
				</div>
				<DialogFooter>
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

export default GalleryImage;