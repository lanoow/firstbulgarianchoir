"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { GallerySchema, GallerySchemaType } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { useTransition } from 'react';

const AddMedia = () => {
	const [isPending, startTransition] = useTransition();
	const t = useTranslations();

	const form = useForm<GallerySchemaType>({
		resolver: zodResolver(GallerySchema),
		defaultValues: {
			mediaType: "image",
			media: "",
		}
	});

	const onSubmit = (values: GallerySchemaType) => {
		startTransition(() => {
			console.log(values);
		});
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>{t("dashboard.nav.newPost")}</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-xl">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<DialogHeader>
							<DialogTitle>{t("dashboard.nav.newPost")}</DialogTitle>
							<DialogDescription>{t("dashboard.descriptions.gallery.new")}</DialogDescription>
						</DialogHeader>
						<div className="flex flex-col space-y-4 py-4">
							<FormField
								control={form.control}
								name="mediaType"
								render={({ field }) => (
									<FormItem>
										<FormLabel>{t("dashboard.mediaType")}</FormLabel>
										<Select onValueChange={field.onChange} defaultValue={field.value} disabled={isPending}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder={t("dashboard.mediaType")} />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="image">
													{t("dashboard.mediaTypes.image")}
												</SelectItem>
												<SelectItem value="video">
													{t("dashboard.mediaTypes.video")}
												</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>

							{form.watch("mediaType") === "image" ? (
								<FormField
									control={form.control}
									name="media"
									render={({ field }) => (
										<FormItem>
											<FormLabel>{t("dashboard.media")}</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							) : (
								<FormField
									control={form.control}
									name="media"
									render={({ field }) => (
										<FormItem>
											<FormLabel>{t("dashboard.youtubeLink")}</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder="https://youtube.com/watch?v=..."
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							)}
						</div>
						<DialogFooter>
							<DialogClose asChild>
								<Button type="button" variant="secondary">{t("general.close")}</Button>
							</DialogClose>
							<Button type="submit">{t("general.create")}</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}

export default AddMedia;