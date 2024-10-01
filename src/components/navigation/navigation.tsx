"use client";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { FaFacebook, FaYoutube } from "react-icons/fa6";
import LanguageSwitcher from "../language-swicher";
import { useTranslations } from "next-intl";
import MobileNavigation from "./mobile";
import Link from "next/link";
import Logo from "../logo";
import { Separator } from "../ui/separator";

export type NavigationProps = {
	label: string;
	href: string;
	icon?: JSX.Element;
}

const Navigation = () => {
	const t = useTranslations("navigation");

	const links = [
		{
			label: t("home"),
			href: "/"
		},
		{
			label: t("history"),
			href: "/history"
		},
		{
			label: t("events"),
			href: "/events"
		},
		{
			label: t("gallery"),
			href: "/gallery"
		},
		{
			label: t("contacts"),
			href: "/contacts"
		}
	] as NavigationProps[];

	const socials = [
		{
			label: "Facebook",
			href: "https://www.facebook.com/groups/135746839829291/",
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
			<div className="flex flex-row items-center justify-between gap-8 px-4 py-4 lg:px-0 lg:justify-normal lg:flex-col">
				<div className="lg:py-4">
					<Logo variant="lg" link="/" />
				</div>

				<DesktopNavigation links={links} socials={socials} />
				<MobileNavigation links={links} socials={socials} />
			</div>

			<Separator orientation="horizontal" className="lg:hidden" />
		</nav>
	)
}

const DesktopNavigation: React.FC<{
	links: NavigationProps[];
	socials: NavigationProps[];
}> = ({ links, socials }) => {
	return (
		<div className="hidden w-full bg-black shadow-lg lg:block">
			<div className="flex items-center justify-between w-full px-4 mx-auto max-w-screen-2xl">
				<div className="flex items-center space-x-4">
					{links.map((link) => (
						<Link key={link.href} href={link.href} className="p-2 text-xl text-white uppercase transition hover:opacity-70">
							{link.label}
						</Link>
					))}
				</div>

				<div className="flex items-center p-2 space-x-4">
					<LanguageSwitcher />

					<TooltipProvider>
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
					</TooltipProvider>
				</div>
			</div>
		</div>
	)
}

export default Navigation;