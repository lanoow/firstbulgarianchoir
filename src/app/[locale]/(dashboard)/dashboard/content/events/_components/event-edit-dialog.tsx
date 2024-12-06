"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileUploader } from '@/components/uploader/file-uploader';
import { MinimalTiptapEditor } from '@/components/minimal-tiptap';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { EventSchema, EventSchemaType } from '@/schemas';
import { TimePicker } from '@/components/ui/time-picker';
import { useUploadFile } from '@/hooks/use-upload-file';
import { zodResolver } from '@hookform/resolvers/zod';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import React, { useState, useTransition } from 'react';
import { Input } from '@/components/ui/input';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { CalendarIcon, Pen, Trash } from 'lucide-react';
import { eventEdit, utDeleteFile } from '@/lib/actions';
import { useForm } from 'react-hook-form';
import { SafeEvent } from '@/types';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import Image from 'next/image';

const EventEditDialog: React.FC<{ event: SafeEvent }> = ({ event }) => {
	const [isPending, startTransition] = useTransition();
	const [isSheetOpen, setSheetOpen] = useState<boolean>(false);
	const [showUpload, setShowUpload] = useState<boolean>(false);
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
			titleBG: event.titleBG,
			titleEN: event.titleEN ?? "",
			contentBG: event.contentBG,
			contentEN: event.contentEN ?? "",
			locationBG: event.locationBG,
			locationEN: event.locationEN ?? "",
			date: new Date(event.date),
			cover: undefined,
		}
	});

	const cover = event.cover;

	const handleUpload = async (data: any) => {
		if (showUpload) {
			await utDeleteFile(cover);
			await onUpload(data.cover)
				.then(() => {
					data.cover = uploadedFiles[0].key;
					return eventEdit(event.id, data);
				});
		} else {
			data.cover = cover;
			return eventEdit(event.id, data);
		}
	}

	const onSubmit = async (data: any) => {
		startTransition(() => {
			toast.promise(handleUpload(data), {
				loading: t("general.loading"),
				success: t("success.event_edited"),
				error: t("errors.unknown_error"),
				finally: () => {
					setSheetOpen(false);
					setShowUpload(false);
					router.refresh();
				}
			});
		});
	}

	return (
		<Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
			<SheetTrigger>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Pen className="size-5 hover:opacity-70 transition" />
						</TooltipTrigger>
						<TooltipContent>{t("general.edit")}</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</SheetTrigger>
			<SheetContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<SheetHeader>
							<SheetTitle>
								{t("dashboard.nav.newEvent")}
							</SheetTitle>
							<SheetDescription>
								{t("dashboard.descriptions.events.new")}
							</SheetDescription>
						</SheetHeader>
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
														<TooltipProvider>
															<MinimalTiptapEditor
																output="html"
																editable={true}
																autofocus={false}
																injectCSS={true}
																value={field.value}
																onChange={(value) => field.onChange(value)}
																throttleDelay={1000}
																className="w-full bg-white border border-border"
																editorClassName="focus:outline-none"
																editorContentClassName="p-5 [&_.ProseMirror]:min-h-72"
																placeholder="Събитието ще се проведе в католическа църква &quot;Св. Св. Кирил и Методий&quot; в Свищов, България."
															/>
														</TooltipProvider>
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
														<TooltipProvider>
															<MinimalTiptapEditor
																output="html"
																editable={true}
																autofocus={false}
																injectCSS={true}
																value={field.value}
																onChange={(value) => field.onChange(value)}
																throttleDelay={1000}
																className="w-full bg-white border border-border"
																editorClassName="focus:outline-none"
																editorContentClassName="p-5 [&_.ProseMirror]:min-h-72"
																placeholder="The event will take place in the Catholic Church &quot;St. St. Cyril and Methodius&quot; in Svishtov, Bulgaria."
															/>
														</TooltipProvider>
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
														variant="datePicker"
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
												{cover && !showUpload ? (
													<div className="relative">
														<Image
															src={`https://utfs.io/f/${cover}`}
															alt={event.titleBG}
															width={1000}
															height={500}
															className="w-full rounded-lg"
														/>

														<div className="absolute top-2 right-2">
															<TooltipProvider>
																<Tooltip>
																	<TooltipTrigger asChild>
																		<Button
																			size="sm"
																			variant="flag"
																			className="opacity-50 hover:opacity-100 hover:text-destructive"
																			onClick={() => setShowUpload(true)}
																		>
																			<Trash className="size-5" />
																		</Button>
																	</TooltipTrigger>
																	<TooltipContent>{t("general.delete")}</TooltipContent>
																</Tooltip>
															</TooltipProvider>
														</div>
													</div>
												) : (
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
												)}
											</FormControl>
											<FormMessage />
										</FormItem>
									</div>
								)}
							/>
						</div>
						<SheetFooter className="flex flex-col gap-2 sm:flex-row sm:items-center">
							<SheetClose asChild>
								<Button variant="outline" disabled={isUploading || isPending} onClick={() => form.reset()}>
									{t("general.cancel")}
								</Button>
							</SheetClose>
							<Button type="submit" disabled={isUploading || isPending}>
								{t("general.save")}
							</Button>
						</SheetFooter>
					</form>
				</Form>
			</SheetContent>
		</Sheet>
	)
}

export default EventEditDialog;