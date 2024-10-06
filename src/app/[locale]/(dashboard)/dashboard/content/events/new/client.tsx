"use client";

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import DashboardHeader from "@/components/dashboard-header";
import { MinimalTiptapEditor } from "@/components/minimal-tiptap";
import { EventSchema, EventSchemaType } from "@/schemas";
import { CalendarIcon, ChevronDown } from "lucide-react";
import { TimePicker } from "@/components/ui/time-picker";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useState, useTransition } from "react";
import Link from "next/link";
import { Content } from "@tiptap/core";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const NewEventClient = () => {
	const t = useTranslations();
	const [isPending, startTransition] = useTransition();
	const [contentBG, setContentBG] = useState<Content>('');
	const [contentEN, setContentEN] = useState<Content>('');

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
			images: []
		}
	});

	const onSubmit = (values: EventSchemaType) => {
		values.contentBG = contentBG as string;
		values.contentEN = contentEN as string;

		startTransition(() => {
			console.log(values);
		});
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-4">
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink href="/dashboard">{t("navigation.home")}</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<DropdownMenu>
								<DropdownMenuTrigger className="flex items-center gap-1 transition hover:text-black">
									{t("dashboard.nav.content")}

									<ChevronDown size={16} />
								</DropdownMenuTrigger>
								<DropdownMenuContent className="outline-none">
									<DropdownMenuItem asChild className="cursor-pointer">
										<Link href="/dashboard/content/history">{t("navigation.history")}</Link>
									</DropdownMenuItem>
									<DropdownMenuItem asChild className="cursor-pointer">
										<Link href="/dashboard/content/events">{t("navigation.events")}</Link>
									</DropdownMenuItem>
									<DropdownMenuItem asChild className="cursor-pointer">
										<Link href="/dashboard/content/gallery">{t("navigation.gallery")}</Link>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbLink href="/dashboard/content/events">{t("navigation.events")}</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage>{t("general.new")}</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>

				<DashboardHeader
					title={t("dashboard.nav.newEvent")}
					subtitle={t("dashboard.descriptions.events.new")}
					actions={
						<div className="flex flex-col items-center gap-2 md:flex-row">
							<Button disabled={isPending}>
								{t("general.create")}
							</Button>

							<Button variant="secondary" asChild disabled={isPending}>
								<Link href="/dashboard/content/events">
									{t("general.back")}
								</Link>
							</Button>
						</div>
					}
				/>

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
												disabled={isPending}
												placeholder={t("locale") === "bg" ?
													"Празничен концерт в католическа църква \"Св. Св. Кирил и Методий\""
													:
													"Festive concert in the Catholic Church \"St. St. Cyril and Methodius\""
												}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-end">
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
													placeholder={t("locale") === "bg" ? "Свищов, България" : "Svishtov, Bulgaria"}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="date"
									render={({ field }) => (
										<FormItem className="flex flex-col w-full">
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
													<div className="p-3 border-t border-border">
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
							</div>

							<TooltipProvider>
								<div className="flex flex-col space-y-3">
									<Label>{t("general.content")}</Label>
									<MinimalTiptapEditor
										value={contentBG}
										onChange={setContentBG}
										throttleDelay={2000}
										className="w-full"
										editorContentClassName="p-4"
										output="html"
										placeholder={t("dashboard.startTyping")}
										autofocus={false}
										immediatelyRender={false}
										editable={!isPending}
										injectCSS={true}
										editorClassName="focus:outline-none"
									/>
								</div>
							</TooltipProvider>
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
												disabled={isPending}
												placeholder={t("locale") === "bg" ?
													"Празничен концерт в католическа църква \"Св. Св. Кирил и Методий\""
													:
													"Festive concert in the Catholic Church \"St. St. Cyril and Methodius\""
												}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-end">
								<FormField
									control={form.control}
									name="locationEN"
									render={({ field }) => (
										<FormItem>
											<FormLabel>{t("general.location")}</FormLabel>
											<FormControl>
												<Input
													disabled={isPending}
													placeholder={t("locale") === "bg" ? "Свищов, България" : "Svishtov, Bulgaria"}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="date"
									render={({ field }) => (
										<FormItem className="flex flex-col w-full">
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
														mode="single"
														selected={field.value}
														onSelect={field.onChange}
														disabled={(date) => date < new Date(+new Date() - 86400000)}
													/>
													<div className="p-3 border-t border-border">
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
							</div>

							<TooltipProvider>
								<div className="flex flex-col space-y-3">
									<Label>{t("general.content")}</Label>
									<MinimalTiptapEditor
										value={contentEN}
										onChange={setContentEN}
										throttleDelay={2000}
										className="w-full"
										editorContentClassName="p-4"
										output="html"
										placeholder={t("dashboard.startTyping")}
										autofocus={false}
										immediatelyRender={false}
										editable={!isPending}
										injectCSS={true}
										editorClassName="focus:outline-none"
									/>
								</div>
							</TooltipProvider>
						</div>
					</TabsContent>
				</Tabs>
			</form>
		</Form>
	)
}

export default NewEventClient;