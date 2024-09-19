import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { getTranslations } from "next-intl/server";
import { ChevronDown } from "lucide-react";
import Link from "next/link";


const DashboardEvents = async () => {
	const t = await getTranslations();

	return (
		<div>
			<Breadcrumb className="pb-4">
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/dashboard">{t("dashboard.nav.home")}</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<DropdownMenu>
							<DropdownMenuTrigger className="flex items-center gap-1">
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
						<BreadcrumbPage>{t("dashboard.nav.events")}</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
		</div>
	)
}

export default DashboardEvents;