"use client";

import { FaFacebook, FaShield, FaYoutube } from "react-icons/fa6";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import LanguageSwitcher from "../language-switcher";
import Link from "next/link";
import Logo from "../logo";
import MobileNavigation from "./mobile";
import { ReactElement } from "react";
import { SafeUser } from "@/types";
import { Separator } from "../ui/separator";
import { UserRole } from "@prisma/client";
import { usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export type NavigationProps = {
	label: string;
	href: string;
	icon?: ReactElement;
}

const Navigation: React.FC<{ currentUser?: SafeUser; }> = ({ currentUser }) => {
	const t = useTranslations();

	const links = [
		{
			label: t("navigation.home"),
			href: "/"
		},
		{
			label: t("navigation.history"),
			href: "/history/"
		},
		{
			label: t("navigation.events"),
			href: "/events/"
		},
		{
			label: t("navigation.gallery"),
			href: "/gallery/"
		},
		{
			label: t("navigation.contacts"),
			href: "/contacts/"
		}
	] as NavigationProps[];

	const socials = [
		{
			label: "Facebook",
			href: "https://www.facebook.com/profile.php?id=100068113579154",
			icon: <FaFacebook size={24} />
		},
		{
			label: "YouTube",
			href: "https://www.youtube.com/@VeselinaMiteva-td4jc",
			icon: <FaYoutube size={24} />
		}
	] as NavigationProps[];

	return (
		<nav>
			<div className="fixed z-10 flex flex-row items-center justify-between w-full gap-8 px-4 py-4 bg-black lg:px-0 lg:justify-normal lg:flex-col lg:bg-transparent lg:static">
				<div className="lg:py-4">
					<Logo variant="lg" link="/" classNames="text-white lg:text-black" />
				</div>

				<DesktopNavigation
					links={links}
					socials={socials}
					showAdmin={currentUser
						&& currentUser.role === UserRole.ADMIN ? true : false
					}
					adminLabel={t("dashboard.nav.dashboard")}
				/>

				<MobileNavigation
					links={links}
					socials={socials}
					showAdmin={currentUser
						&& currentUser.role === UserRole.ADMIN ? true : false
					}
					adminLabel={t("dashboard.nav.dashboard")}
				/>
			</div>

			<Separator orientation="horizontal" className="lg:hidden" />
		</nav>
	)
}

const DesktopNavigation: React.FC<{
	links: NavigationProps[];
	socials: NavigationProps[];
	showAdmin: boolean;
	adminLabel: string;
}> = ({ links, socials, showAdmin, adminLabel }) => {
	const pathname = usePathname();

	const isOnPath = (href: string) => {
		if (pathname === href) {
			return true;
		}

		return false;
	};

	return (
		<div className="hidden w-full bg-black shadow-lg lg:block">
			<div className="flex items-center justify-between w-full px-4 mx-auto max-w-screen-2xl">
				<div className="flex items-center space-x-4">
					{links.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							className={`
								p-2 text-xl uppercase transition text-white	hover:opacity-70
								${isOnPath(link.href) && "font-semibold"}
							`}
						>
							{link.label}
						</Link>
					))}
				</div>

				<TooltipProvider>
					<div className="flex items-center p-2 space-x-4">
						{showAdmin && (
							<Tooltip>
								<TooltipTrigger asChild>
									<Link href="/dashboard/" className="text-white transition hover:opacity-70">
										<FaShield size={24} />
									</Link>
								</TooltipTrigger>
								<TooltipContent>
									{adminLabel}
								</TooltipContent>
							</Tooltip>
						)}

						<LanguageSwitcher />

						{socials.map((social) => (
							<Tooltip key={social.href}>
								<TooltipTrigger asChild>
									<Link href={social.href} className="text-white transition hover:opacity-70">
										{social.icon}
									</Link>
								</TooltipTrigger>
								<TooltipContent align="center">
									{social.label}
								</TooltipContent>
							</Tooltip>
						))}
					</div>
				</TooltipProvider>
			</div>
		</div>
	)
}

export default Navigation;