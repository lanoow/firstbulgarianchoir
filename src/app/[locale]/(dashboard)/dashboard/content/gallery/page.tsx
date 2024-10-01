import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import DashboardHeader from "@/components/dashboard-header";
import { getTranslations } from "next-intl/server";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import GallerySkeleton from "./skeleton";
import AddMedia from "./add-media";


const DashboardGallery = async () => {
	const t = await getTranslations();

	return (
		<div className="flex flex-col space-y-4">
			<Breadcrumb>
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
						<BreadcrumbPage>{t("navigation.gallery")}</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<DashboardHeader
				title={t("navigation.gallery")}
				subtitle={t("dashboard.descriptions.gallery.index")}
				actions={
					<AddMedia />
				}
			/>

			<Suspense fallback={<GallerySkeleton />}>

			</Suspense>
		</div>
	)
}

export default DashboardGallery;