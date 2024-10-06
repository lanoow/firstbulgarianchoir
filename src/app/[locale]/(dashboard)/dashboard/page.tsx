import DashboardHeader from "@/components/dashboard-header";
import { getTranslations } from "next-intl/server";

export default async function Dashboard() {
	const t = await getTranslations();

	return (
		<div className="flex flex-col space-y-4">
			<DashboardHeader
				title={t("dashboard.nav.dashboard")}
				subtitle={t("dashboard.descriptions.dashboard")}
			/>
		</div>
	)
}
