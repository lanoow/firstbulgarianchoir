"use client";

import { EventSchema, EventSchemaType } from '@/schemas';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState, useTransition } from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { FileUploader } from '@/components/uploader/file-uploader';
import { Input } from '@/components/ui/input';
import { MinimalTiptapEditor } from '@/components/minimal-tiptap';
import { TimePicker } from '@/components/ui/time-picker';
import { TooltipProvider } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { eventCreate } from '@/lib/actions';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useUploadFile } from '@/hooks/use-upload-file';
import { zodResolver } from '@hookform/resolvers/zod';

const AddEvent = () => {
	const [isPending, startTransition] = useTransition();
	const [isSheetOpen, setSheetOpen] = useState<boolean>(false);
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
					setSheetOpen(false);
					form.reset();
					router.refresh();
				}
			});
		});
	}

	return (
		<Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
			<SheetTrigger asChild>
				<Button>
					{t("dashboard.nav.newEvent")}
				</Button>
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
						<SheetFooter className="flex flex-col gap-2 sm:flex-row sm:items-center">
							<SheetClose asChild>
								<Button variant="outline" disabled={isUploading || isPending} onClick={() => form.reset()}>
									{t("general.cancel")}
								</Button>
							</SheetClose>
							<Button type="submit" disabled={isUploading || isPending}>
								{t("general.create")}
							</Button>
						</SheetFooter>
					</form>
				</Form>
			</SheetContent>
		</Sheet>
	)
}

export default AddEvent;