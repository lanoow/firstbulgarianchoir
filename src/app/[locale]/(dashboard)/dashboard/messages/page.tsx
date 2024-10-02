import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import DashboardHeader from "@/components/dashboard-header";
import { getTranslations } from "next-intl/server";
import { MessagesTable } from "./_components/messages-table";
import { columns } from "./_components/messages-table-columns";
import { getMessages } from "@/lib/actions";

export default async function DashboardMessages() {
	const t = await getTranslations();
	const messages = await getMessages();

	return (
		<div className="flex flex-col space-y-4">
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/dashboard">{t("navigation.home")}</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>{t("dashboard.nav.messages")}</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<DashboardHeader
				title={t("dashboard.nav.messages")}
				subtitle={t("dashboard.descriptions.messages.index")}
			/>

			<MessagesTable columns={columns} data={messages} />
		</div>
	)
}