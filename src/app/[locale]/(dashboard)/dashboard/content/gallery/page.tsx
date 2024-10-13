import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import DashboardHeader from "@/components/dashboard-header";
import GallerySkeleton from "./_components/skeleton";
import { getTranslations } from "next-intl/server";
import AddMedia from "./_components/add-media";
import { ChevronDown } from "lucide-react";
import { getGallery } from "@/lib/actions";
import Video from "./_components/video";
import { Fragment, Suspense } from "react";
import Link from "next/link";
import { SafeGallery } from "@/types";
import { MediaType } from "@prisma/client";
import GalleryImage from "./_components/image";

const DashboardGallery = async () => {
	const t = await getTranslations();
	const gallery = await getGallery();

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
				<div className="flex items-start gap-4">
					{gallery.map((media: SafeGallery) => (
						<Fragment key={media.id}>
							{media.mediaType === MediaType.VIDEO ? (
								<Video id={media.id} media={media.media} />
							) : (
								<>
									<GalleryImage id={media.id} media={media.media} />
								</>
							)}
						</Fragment>
					))}
				</div>
			</Suspense>
		</div>
	)
}

export default DashboardGallery;