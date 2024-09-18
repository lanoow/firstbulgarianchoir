"use client";

import { IconBrowser, IconHome, IconLetterCase, IconLogout2, IconSettings, IconUsers } from "@tabler/icons-react";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import LanguageSwitcher from "./language-switcher";
import { useTranslations } from "next-intl";
import { signOut } from "next-auth/react";
import { motion } from "framer-motion";
import { useState } from "react";

const DashboardSidebar = () => {
	const t = useTranslations("dashboard.nav");
	const [open, setOpen] = useState<boolean>(false);

	const links = [
		{
			label: t("home"),
			href: "/dashboard",
			icon: (
				<IconHome className="flex-shrink-0 w-6 h-6 text-neutral-700 dark:text-neutral-200" />
			)
		},
		{
			label: t("content"),
			href: "/dashboard/content",
			icon: (
				<IconLetterCase className="flex-shrink-0 w-6 h-6 text-neutral-700 dark:text-neutral-200" />
			)
		},
		{
			label: t("users"),
			href: "/dashboard/users",
			icon: (
				<IconUsers className="flex-shrink-0 w-6 h-6 text-neutral-700 dark:text-neutral-200" />
			)
		},
		{
			label: t("settings"),
			href: "/dashboard/settings",
			icon: (
				<IconSettings className="flex-shrink-0 w-6 h-6 text-neutral-700 dark:text-neutral-200" />
			)
		}
	];

	return (
		<Sidebar open={open} setOpen={setOpen} animate={true}>
			<SidebarBody className="justify-between gap-10 bg-neutral-200">
				<div className="flex flex-col flex-1 overflow-x-hidden overflow-y-auto">
					<span>ПБХ</span>

					<div className="flex flex-col gap-2 mt-8">
						{links.map((link, idx) => (
							<SidebarLink key={idx} link={link} />
						))}
					</div>
				</div>
				<div className="flex flex-col gap-2">
					<LanguageSwitcher />

					<SidebarLink
						link={{
							label: t("toSite"),
							href: "/",
							icon: (
								<IconBrowser className="flex-shrink-0 w-6 h-6 text-neutral-700 dark:text-neutral-200" />
							)
						}}
					/>

					<button className="flex items-center justify-start gap-2 py-2 group/sidebar" onClick={() => signOut()}>
						<IconLogout2 className="flex-shrink-0 w-6 h-6 text-neutral-700 dark:text-neutral-200" />

						<motion.span
							animate={{
								display: open ? "inline-block" : "none",
								opacity: open ? 1 : 0,
							}}
							className="text-neutral-700 dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
						>
							{t("logout")}
						</motion.span>
					</button>
				</div>
			</SidebarBody>
		</Sidebar>
	)
}

export default DashboardSidebar;