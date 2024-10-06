"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { GallerySchema, GallerySchemaType } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { useState, useTransition } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { FileUploader } from '@/components/uploader/file-uploader';
import { useUploadFile } from '@/hooks/use-upload-file';
import { toast } from 'sonner';
import { UploadedFilesCard } from '@/components/uploader/uploaded-files-card';

const AddMedia = () => {
	const [isPending, startTransition] = useTransition();
	const [isImageDialogOpen, setImageDialogOpen] = useState<boolean>(false);
	const [isVideoDialogOpen, setVideoDialogOpen] = useState<boolean>(false);
	const { onUpload, progresses, uploadedFiles, isUploading } = useUploadFile(
    "imagesUploader",
    { defaultUploadedFiles: [] }
  )
	const t = useTranslations();

	const form = useForm<GallerySchemaType>({
		resolver: zodResolver(GallerySchema),
		defaultValues: {
			media: undefined
		}
	});

	const onSubmit = async (data: GallerySchemaType) => {
		startTransition(() => {
			toast.promise()
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
					}}>
						{t("dashboard.mediaTypes.image")}
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => {
						setImageDialogOpen(false);
						setVideoDialogOpen(true);
					}}>
						{t("dashboard.mediaTypes.video")}
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<Dialog onOpenChange={setImageDialogOpen} open={isImageDialogOpen}>
				<DialogContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
												<FormLabel>{t("general.images")}</FormLabel>
												<FormControl>
													<FileUploader
														value={field.value}
														onValueChange={field.onChange}
														maxFileCount={4}
														maxSize={4 * 1024 * 1024}
														progresses={progresses}
														// pass the onUpload function here for direct upload
														// onUpload={uploadFiles}
														disabled={isUploading}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
											{uploadedFiles.length > 0 ? (
												<UploadedFilesCard uploadedFiles={uploadedFiles} />
											) : null}
										</div>
									)}
								/>
							</div>
							<DialogFooter>
								<DialogClose asChild>
									<Button variant="outline" onClick={() => { }}>
										{t("general.cancel")}
									</Button>
								</DialogClose>
								<Button type="submit">
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
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
							<DialogHeader>
								<DialogTitle>
									{t("dashboard.addVideo")}
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
										<FormItem>
											<FormLabel>{t("dashboard.media")}</FormLabel>
											<FormControl>
												<Input
													placeholder="https://youtube.com/watch?v=..."
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<DialogFooter>
								<DialogClose asChild>
									<Button variant="outline" onClick={() => { }}>
										{t("general.cancel")}
									</Button>
								</DialogClose>
								<Button type="submit">
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