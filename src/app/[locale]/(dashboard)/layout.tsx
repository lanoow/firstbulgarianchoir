import DashboardSidebar from "@/components/dashboard-sidebar";
import { getCurrentUser } from "@/lib/actions";
import { redirect } from "next/navigation";
import { UserRole } from "@prisma/client";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "FBC Dashboard",
	robots: {
		index: false,
		follow: false,
	}
};

export default async function DashboardLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return redirect("/login");
	}

	if (currentUser.role !== UserRole.ADMIN) {
		return redirect("/");
	}

	return (
		<main className="flex flex-col flex-1 w-full h-screen overflow-hidden border md:flex-row bg-neutral-200 dark:bg-neutral-800">
			<DashboardSidebar />
			
			<div className="w-full h-screen px-4 py-3 overflow-y-auto rounded-l-large bg-neutral-100 dark:bg-neutral-900">
				{children}
			</div>

			<Link href="https://lanoow.dev" className="absolute transition bottom-2 right-2 text-neutral-400 hover:text-black dark:hover:text-white">
				lanoow.dev
			</Link>
		</main>
	);
}
