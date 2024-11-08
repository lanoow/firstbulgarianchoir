"use client";

import { IconBrowser, IconBuildingArch, IconHome, IconLogout2, IconMail, IconPhoto, IconSettings, IconTicket, IconUsers } from "@tabler/icons-react";
import { Sidebar, SidebarBody, SidebarCategory, SidebarLink } from "./ui/sidebar";
import { useTranslations } from "next-intl";
import { signOut } from "next-auth/react";
import { motion } from "framer-motion";
import { useState } from "react";
import Logo from "./logo";

const DashboardSidebar = () => {
	const t = useTranslations();
	const [open, setOpen] = useState<boolean>(false);

	const links = [
		{
			category: t("dashboard.nav.dashboard"),
			links: [
				{
					label: t("navigation.home"),
					href: "/dashboard",
					icon: (
						<IconHome className="flex-shrink-0 w-6 h-6 text-neutral-700 dark:text-neutral-200" />
					)
				},
				{
					label: t("dashboard.nav.messages"),
					href: "/dashboard/messages",
					icon: (
						<IconMail className="flex-shrink-0 w-6 h-6 text-neutral-700 dark:text-neutral-200" />
					)
				},
				{
					label: t("dashboard.nav.users"),
					href: "/dashboard/users",
					icon: (
						<IconUsers className="flex-shrink-0 w-6 h-6 text-neutral-700 dark:text-neutral-200" />
					)
				},
				{
					label: t("dashboard.nav.settings"),
					href: "/dashboard/settings",
					icon: (
						<IconSettings className="flex-shrink-0 w-6 h-6 text-neutral-700 dark:text-neutral-200" />
					)
				}
			]
		},
		{
			category: t("general.content"),
			links: [
				{
					label: t("navigation.history"),
					href: "/dashboard/content/history",
					icon: (
						<IconBuildingArch className="flex-shrink-0 w-6 h-6 text-neutral-700 dark:text-neutral-200" />
					)
				},
				{
					label: t("navigation.events"),
					href: "/dashboard/content/events",
					icon: (
						<IconTicket className="flex-shrink-0 w-6 h-6 text-neutral-700 dark:text-neutral-200" />
					)
				},
				{
					label: t("navigation.gallery"),
					href: "/dashboard/content/gallery",
					icon: (
						<IconPhoto className="flex-shrink-0 w-6 h-6 text-neutral-700 dark:text-neutral-200" />
					)
				}
			]
		}
	];

	return (
		<Sidebar open={open} setOpen={setOpen} animate={true}>
			{/* @ts-expect-error className is not allowed but it is working right */}
			<SidebarBody className="justify-between gap-10 bg-neutral-200">
				<div className="flex flex-col flex-1 overflow-x-hidden overflow-y-auto">
					<Logo short link="/dashboard" />

					<div className="flex flex-col gap-8 mt-8">
						{links.map((item, idx) => (
							<SidebarCategory key={idx} title={item.category}>
								{item.links.map((link, idx) => (
									<SidebarLink key={idx} link={link} />
								))}
							</SidebarCategory>
						))}
					</div>
				</div>
				<div className="flex flex-col gap-2">
					<SidebarLink
						link={{
							label: t("dashboard.nav.toSite"),
							href: "/",
							icon: (
								<IconBrowser className="flex-shrink-0 w-6 h-6 text-neutral-700 dark:text-neutral-200" />
							)
						}}
					/>

					<button className="flex items-center justify-start gap-2 py-2 group/sidebar" onClick={() => signOut()}>
						<IconLogout2 className="flex-shrink-0 w-6 h-6 text-neutral-700 dark:text-neutral-200 group-hover/sidebar:text-danger-400" />

						<motion.span
							animate={{
								display: open ? "inline-block" : "none",
								opacity: open ? 1 : 0,
							}}
							// @ts-expect-error className is not allowed but it is working right
							className="text-neutral-700 dark:text-neutral-200 group-hover/sidebar:text-danger-400 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
						>
							{t("dashboard.nav.logout")}
						</motion.span>
					</button>
				</div>
			</SidebarBody>
		</Sidebar>
	)
}

export default DashboardSidebar;