import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { TooltipProvider } from "@/components/ui/tooltip";
import { getTranslations } from "next-intl/server";
import { ChevronDown } from "lucide-react";
import HistoryClient from "./client";
import Link from "next/link";
import { getHistory } from "@/lib/actions";

const DashboardHistory = async () => {
	const t = await getTranslations();
	const contentBG = await getHistory("bg");
	const contentEN = await getHistory("en");

	const historyBGContent = contentBG?.content.substring(1, contentBG.content.length-1) || "";
	const historyENContent = contentEN?.content.substring(1, contentEN.content.length-1) || "";

	return (
		<TooltipProvider>
			<Breadcrumb className="pb-4">
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/dashboard">{t("dashboard.nav.home")}</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<DropdownMenu>
							<DropdownMenuTrigger className="flex items-center gap-1 hover:text-black transition">
								{t("dashboard.nav.content")}

								<ChevronDown size={16} />
							</DropdownMenuTrigger>
							<DropdownMenuContent className="outline-none">
								<DropdownMenuItem asChild className="cursor-pointer">
									<Link href="/dashboard/content/history">{t("dashboard.nav.history")}</Link>
								</DropdownMenuItem>
								<DropdownMenuItem asChild className="cursor-pointer">
									<Link href="/dashboard/content/events">{t("dashboard.nav.events")}</Link>
								</DropdownMenuItem>
								<DropdownMenuItem asChild className="cursor-pointer">
									<Link href="/dashboard/content/gallery">{t("dashboard.nav.gallery")}</Link>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>{t("dashboard.nav.history")}</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<HistoryClient
				historyBGContent={historyBGContent}
				historyENContent={historyENContent}
			/>
		</TooltipProvider>
	)
}

export default DashboardHistory;