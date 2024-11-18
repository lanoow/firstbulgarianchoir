import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import DashboardHeader from "@/components/dashboard-header";
import { getTranslations } from "next-intl/server";
import { UsersTable } from "./_components/users-table";
import { columns } from "./_components/users-table-columns";
import { getUsers } from "@/lib/actions";

export default async function DashboardUsers () {
	const t = await getTranslations();
	const data = await getUsers();

	return (
		<div className="flex flex-col space-y-4">
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/dashboard">{t("navigation.home")}</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>{t("dashboard.nav.users")}</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<DashboardHeader
				title={t("dashboard.nav.users")}
				subtitle={t("dashboard.descriptions.users.index")}
			/>

			<UsersTable columns={columns} data={data} />
		</div>
	)
}