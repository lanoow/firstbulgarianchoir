"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { FileUploader } from '@/components/uploader/file-uploader';
import { IconPhoto, IconVideo } from '@tabler/icons-react';
import { useUploadFile } from '@/hooks/use-upload-file';
import { Button } from '@/components/ui/button';
import { useState, useTransition } from 'react';
import { Input } from '@/components/ui/input';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { createGalleryPhoto, createGalleryVideo } from '@/lib/actions';
import { useRouter } from 'next/navigation';

const AddMedia = () => {
	const [isPending, startTransition] = useTransition();
	const [isImageDialogOpen, setImageDialogOpen] = useState<boolean>(false);
	const [isVideoDialogOpen, setVideoDialogOpen] = useState<boolean>(false);
	const { onUpload, uploadedFiles, progresses, isUploading } = useUploadFile("imageUploader",
		{
			defaultUploadedFiles: [],
		}
	);
	const t = useTranslations();
	const router = useRouter();

	const form = useForm({
		defaultValues: {
			media: undefined
		}
	});

	const handleUpload = async (data: any) => {
		await onUpload(data.media)
			.then(() => {
				return createGalleryPhoto(uploadedFiles[0].key);
			});
	}

	const onSubmitPhoto = async (data: any) => {
		startTransition(() => {
			toast.promise(handleUpload(data), {
				loading: t("uploads.uploading"),
				success: t("success.image_uploaded"),
				error: t("errors.unknown_error"),
				finally: () => {
					setImageDialogOpen(false);
					form.reset();
					router.refresh();
				}
			});
		});
	}

	const onSubmitVideo = async (data: any) => {
		startTransition(() => {
			toast.promise(createGalleryVideo(data), {
				loading: t("general.loading"),
				success: t("success.video_uploaded"),
				error: t("errors.unknown_error"),
				finally: () => {
					setVideoDialogOpen(false);
					form.reset();
					router.refresh();
				}
			});
		});
	};

	return (
		<div>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button>
						{t("dashboard.nav.newPost")}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem onClick={() => {
						setVideoDialogOpen(false);
						setImageDialogOpen(true);
					}} className="flex items-center space-x-1 cursor-pointer">
						<IconPhoto className="flex-shrink-0 size-5" />
						<span>{t("dashboard.mediaTypes.image")}</span>
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => {
						setImageDialogOpen(false);
						setVideoDialogOpen(true);
					}} className="flex items-center space-x-1 cursor-pointer">
						<IconVideo className="flex-shrink-0 size-5" />
						<span>{t("dashboard.mediaTypes.video")}</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<Dialog onOpenChange={setImageDialogOpen} open={isImageDialogOpen}>
				<DialogContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmitPhoto)} className="space-y-4">
							<DialogHeader>
								<DialogTitle>
									{t("dashboard.addImage")}
								</DialogTitle>
								<DialogDescription>
									{t("dashboard.descriptions.gallery.new")}
								</DialogDescription>
							</DialogHeader>
							<div>
								<FormField
									control={form.control}
									name="media"
									render={({ field }) => (
										<div className="space-y-6">
											<FormItem className="w-full">
												<FormLabel>{t("general.image")}</FormLabel>
												<FormControl>
													<FileUploader
														value={field.value}
														onValueChange={field.onChange}
														maxFileCount={1}
														maxSize={10 * 1024 * 1024}
														progresses={progresses}
														// pass the onUpload function here for direct upload
														// onUpload={uploadFiles}
														disabled={isUploading || isPending}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										</div>
									)}
								/>
							</div>
							<DialogFooter className="flex flex-col gap-2 sm:flex-row sm:items-center">
								<DialogClose asChild>
									<Button variant="outline" disabled={isUploading || isPending} onClick={() => form.reset()}>
										{t("general.cancel")}
									</Button>
								</DialogClose>
								<Button type="submit" disabled={isUploading || isPending}>
									{t("general.save")}
								</Button>
							</DialogFooter>
						</form>
					</Form>
				</DialogContent>
			</Dialog>

			<Dialog onOpenChange={setVideoDialogOpen} open={isVideoDialogOpen}>
				<DialogContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmitVideo)} className="space-y-4">
							<DialogHeader>
								<DialogTitle>
									{t("dashboard.addVideo")}
								</DialogTitle>
								<DialogDescription>
									{t("dashboard.descriptions.gallery.new")}
								</DialogDescription>
							</DialogHeader>
							<FormField
								control={form.control}
								name="media"
								render={({ field }) => (
									<FormItem>
										<FormLabel>{t("dashboard.media")}</FormLabel>
										<FormControl>
											<Input
												{...field}
												disabled={isPending}
												placeholder="https://youtube.com/watch?v=..."
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<DialogFooter>
								<DialogClose asChild>
									<Button variant="outline" disabled={isPending} onClick={() => form.reset()}>
										{t("general.cancel")}
									</Button>
								</DialogClose>
								<Button type="submit" disabled={isPending}>
									{t("general.save")}
								</Button>
							</DialogFooter>
						</form>
					</Form>
				</DialogContent>
			</Dialog>
		</div>
	)
}

export default AddMedia;