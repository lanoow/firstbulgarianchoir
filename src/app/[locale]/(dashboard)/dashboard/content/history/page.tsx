import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { TooltipProvider } from "@/components/ui/tooltip";
import { getTranslations } from "next-intl/server";
import { ChevronDown } from "lucide-react";
import { getHistory } from "@/lib/actions";
import HistoryClient from "./client";
import Link from "next/link";

const DashboardHistory = async () => {
	const t = await getTranslations();
	const bgContent = await getHistory("bg").then((data) => data?.content || "");
	const enContent = await getHistory("en").then((data) => data?.content || "");

	return (
		<TooltipProvider>
			<Breadcrumb className="pb-4">
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/dashboard">{t("navigation.home")}</BreadcrumbLink>
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
						<BreadcrumbPage>{t("navigation.history")}</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<HistoryClient
				bulgarian={bgContent}
				english={enContent}
			/>
		</TooltipProvider>
	)
}

export default DashboardHistory;