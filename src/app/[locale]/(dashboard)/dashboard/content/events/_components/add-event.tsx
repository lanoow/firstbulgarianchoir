"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileUploader } from '@/components/uploader/file-uploader';
import { EventSchema, EventSchemaType } from '@/schemas';
import { TimePicker } from '@/components/ui/time-picker';
import { useUploadFile } from '@/hooks/use-upload-file';
import { zodResolver } from '@hookform/resolvers/zod';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useState, useTransition } from 'react';
import { Input } from '@/components/ui/input';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { eventCreate } from '@/lib/actions';

const AddEvent = () => {
	const [isPending, startTransition] = useTransition();
	const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
	const { onUpload, uploadedFiles, progresses, isUploading } = useUploadFile("imageUploader",
		{
			defaultUploadedFiles: [],
		}
	);
	const t = useTranslations();
	const router = useRouter();

	const form = useForm<EventSchemaType>({
		resolver: zodResolver(EventSchema),
		defaultValues: {
			titleBG: "",
			titleEN: "",
			contentBG: "",
			contentEN: "",
			locationBG: "",
			locationEN: "",
			date: new Date(),
			cover: ""
		}
	});

	const handleUpload = async (data: any) => {
		await onUpload(data.cover)
			.then(() => {
				data.cover = uploadedFiles[0].key;
				return eventCreate(data);
			});
	}

	const onSubmit = async (data: any) => {
		startTransition(() => {
			toast.promise(handleUpload(data), {
				loading: t("general.loading"),
				success: t("success.event_created"),
				error: t("errors.unknown_error"),
				finally: () => {
					setDialogOpen(false);
					form.reset();
					router.refresh();
				}
			});
		});
	}

	return (
		<Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
			<DialogTrigger asChild>
				<Button>
					{t("dashboard.nav.newEvent")}
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-xl overflow-y-auto">
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
							<Tabs defaultValue="bg">
								<TabsList>
									<TabsTrigger value="bg">{t("general.bulgarian")}</TabsTrigger>
									<TabsTrigger value="en">{t("general.english")}</TabsTrigger>
								</TabsList>
								<TabsContent value="bg">
									<div className="flex flex-col space-y-4">
										<FormField
											control={form.control}
											name="titleBG"
											render={({ field }) => (
												<FormItem>
													<FormLabel>{t("general.title")}</FormLabel>
													<FormControl>
														<Input
															required
															autoFocus
															disabled={isPending}
															placeholder="Празничен концерт в католическа църква &quot;Св. Св. Кирил и Методий&quot;"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="locationBG"
											render={({ field }) => (
												<FormItem>
													<FormLabel>{t("general.location")}</FormLabel>
													<FormControl>
														<Input
															required
															disabled={isPending}
															placeholder="Свищов, България"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="contentBG"
											render={({ field }) => (
												<FormItem>
													<FormLabel>{t("general.content")}</FormLabel>
													<FormControl>
														<Textarea
															required
															disabled={isPending}
															placeholder="Концертът ще се проведе на 24.12.2021 г. от 19:00 часа."
															{...field}
														/>
													</FormControl>
												</FormItem>
											)}
										/>
									</div>
								</TabsContent>

								<TabsContent value="en">
									<div className="flex flex-col space-y-4">
										<FormField
											control={form.control}
											name="titleEN"
											render={({ field }) => (
												<FormItem>
													<FormLabel>{t("general.title")}</FormLabel>
													<FormControl>
														<Input
															required
															disabled={isPending}
															placeholder="Festive concert in the Catholic Church &quot;St. St. Cyril and Methodius&quot;"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="locationEN"
											render={({ field }) => (
												<FormItem>
													<FormLabel>{t("general.location")}</FormLabel>
													<FormControl>
														<Input
															required
															disabled={isPending}
															placeholder="Svishtov, Bulgaria"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="contentEN"
											render={({ field }) => (
												<FormItem>
													<FormLabel>{t("general.content")}</FormLabel>
													<FormControl>
														<Textarea
															required
															disabled={isPending}
															placeholder="The concert will take place on 24.12.2021 at 19:00."
															{...field}
														/>
													</FormControl>
												</FormItem>
											)}
										/>
									</div>
								</TabsContent>
							</Tabs>

							<FormField
								control={form.control}
								name="date"
								render={({ field }) => (
									<FormItem className="flex flex-col w-full my-4">
										<FormLabel className="text-left">{t("general.date")}</FormLabel>
										<Popover>
											<FormControl>
												<PopoverTrigger asChild>
													<Button
														disabled={isPending}
														variant="outline"
														className={cn(
															"w-full justify-start text-left font-normal",
															!field.value && "text-muted-foreground"
														)}
													>
														<CalendarIcon className="w-4 h-4 mr-2" />
														{field.value ? (
															format(field.value, "PPP HH:mm")
														) : (
															<span>{t("dashboard.pickADate")}</span>
														)}
													</Button>
												</PopoverTrigger>
											</FormControl>
											<PopoverContent className="w-auto p-0" align="start">
												<Calendar
													required
													mode="single"
													selected={field.value}
													onSelect={field.onChange}
													disabled={(date) => date < new Date(+new Date() - 86400000)}
												/>
												<div className="p-3 border-t border-neutral-700">
													<TimePicker
														setDate={field.onChange}
														date={field.value}
													/>
												</div>
											</PopoverContent>
										</Popover>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="cover"
								render={({ field }) => (
									<div className="space-y-6">
										<FormItem className="w-full">
											<FormLabel>{t("general.image")}</FormLabel>
											<FormControl>
												<FileUploader
													value={field.value}
													onValueChange={field.onChange}
													maxFileCount={1}
													maxSize={8 * 1024 * 1024}
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
								{t("general.create")}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}

export default AddEvent;