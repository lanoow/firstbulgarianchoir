import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { bg } from "date-fns/locale";
import { SafeEvent } from "@/types";
import { Eye } from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";

const EventDialog: React.FC<{ event: SafeEvent; }> = ({ event }) => {
	const t = useTranslations();

	return (
		<Dialog>
			<DialogTrigger>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Eye className="w-5 h-5 hover:opacity-70 transition" />
						</TooltipTrigger>
						<TooltipContent>{t("general.read")}</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{`${t("general.event")} - ${event.titleBG}`}</DialogTitle>
				</DialogHeader>
				<div className="flex flex-col space-y-4">
					<Tabs>
						<TabsList>
							<TabsTrigger value="bg">{t("general.bulgarian")}</TabsTrigger>
							{event.titleEN && event.locationEN && event.contentEN && (
								<TabsTrigger value="en">{t("general.english")}</TabsTrigger>
							)}
						</TabsList>
						<TabsContent value="bg" className="flex flex-col space-y-2">
							<div>
								<Label>{t("general.title")}</Label>
								<Input value={event.titleBG} readOnly autoFocus={false} />
							</div>

							<div>
								<Label>{t("general.location")}</Label>
								<Input value={event.locationBG} readOnly autoFocus={false} />
							</div>

							<div>
								<Label>{t("general.content")}</Label>
								<Textarea value={event.contentBG} readOnly autoFocus={false} />
							</div>
						</TabsContent>
						{event.titleEN && event.locationEN && event.contentEN && (
							<TabsContent value="en" className="flex flex-col space-y-2">
								<div>
									<Label>{t("general.title")}</Label>
									<Input value={event.titleEN} readOnly autoFocus={false} />
								</div>

								<div>
									<Label>{t("general.location")}</Label>
									<Input value={event.locationEN} readOnly autoFocus={false} />
								</div>

								<div>
									<Label>{t("general.content")}</Label>
									<Textarea value={event.contentEN} readOnly autoFocus={false} />
								</div>
							</TabsContent>
						)}
					</Tabs>

					<div>
						<Label>{t("general.date")}</Label>
						<Input value={format(event.date, 'd.m.Y H:s', { locale: bg })} readOnly autoFocus={false} />
					</div>

					<div className="rounded-md overflow-hidden">
						<Image
							alt={event.titleBG}
							src={`https://utfs.io/f/${event.cover}`}
							width={1000}
							height={1000}
							className="w-max max-h-96 mx-auto"
						/>
					</div>
				</div>
				<DialogFooter>
					<DialogClose asChild>
						<Button type="button">
							{t("general.close")}
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default EventDialog;