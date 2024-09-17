import { getCurrentUser } from "@/lib/actions";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";

const Dashboard = async () => {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return redirect("/login");
	}

	if (currentUser.role !== UserRole.ADMIN) {
		return redirect("/");
	}

	return (
		<div>Dashboard</div>
	)
}

export default Dashboard;