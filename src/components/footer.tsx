import { FaFacebook, FaYoutube } from "react-icons/fa6";
import { Mail, MapPin, Phone } from "lucide-react";

import Link from "next/link";
import Logo from "./logo";
import { NavigationProps } from "./navigation/navigation";
import { Separator } from "./ui/separator";
import { getTranslations } from "next-intl/server";

const Footer = async () => {
	const t = await getTranslations();

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
		<footer className="p-4 bg-black">
			<div className="flex flex-col mx-auto space-y-8 lg:space-y-4 max-w-screen-2xl">
				<div className="flex flex-col space-y-8 md:flex-row md:w-full md:justify-between md:items-start md:space-y-0">
					<div className="flex flex-col items-start gap-4 lg:gap-8 lg:flex-row">
						<Logo variant="lg" link="/" classNames="invert" />

						<ul className="flex flex-col space-y-4">
							<li>
								<a href="tel:0887600554" className="flex items-center space-x-2 text-white transition hover:opacity-70">
									<Phone size={24} />
									<span>0887 600 554</span>
								</a>
							</li>
							<li>
								<a href="mailto:chitalishte.svishtov@gmail.com" className="flex items-center space-x-2 text-white transition hover:opacity-70">
									<Mail size={24} />
									<span>chitalishte.svishtov@gmail.com</span>
								</a>
							</li>
							<li>
								<Link href="https://g.co/kgs/gR6M4CR" className="flex items-center space-x-2 text-white transition hover:opacity-70">
									<MapPin size={24} />
									<span>{t("general.address")}</span>
								</Link>
							</li>
						</ul>
					</div>

					<ul className="flex flex-col space-y-2 text-white md:place-self-end">
						<li className="text-sm uppercase text-neutral-400">{t("general.usefulLinks")}</li>
						<li className="md:text-end">
							<Link href="/" className="no-underline transition hover:underline underline-offset-4 hover:opacity-70">
								{t("navigation.home")}
							</Link>
						</li>
						<li className="md:text-end">
							<Link href="/history/" className="no-underline transition hover:underline underline-offset-4 hover:opacity-70">
								{t("navigation.history")}
							</Link>
						</li>
						<li className="md:text-end">
							<Link href="/events/" className="no-underline transition hover:underline underline-offset-4 hover:opacity-70">
								{t("navigation.events")}
							</Link>
						</li>
						<li className="md:text-end">
							<Link href="/gallery/" className="no-underline transition hover:underline underline-offset-4 hover:opacity-70">
								{t("navigation.gallery")}</Link></li>
						<li className="md:text-end">
							<Link href="/contacts/" className="no-underline transition hover:underline underline-offset-4 hover:opacity-70">
								{t("navigation.contacts")}
							</Link>
						</li>
					</ul>
				</div>

				<div className="flex flex-col space-y-2 md:place-self-end">
					<span className="text-sm uppercase text-neutral-400">{t("general.followUs")}</span>
					<ul className="flex items-center space-x-2 md:place-self-end">
						{socials.map((social) => (
							<li key={social.label}>
								<Link
									href={social.href}
									className="text-white transition hover:opacity-70"
								>
									{social.icon}
								</Link>
							</li>
						))}
					</ul>
				</div>

				<Separator style={{ backgroundColor: "#262626" }} />

				<div className="flex flex-col gap-4 text-sm lg:text-medium lg:items-center lg:justify-between lg:flex-row">
					<span className="text-neutral-400">
						&copy; {new Date().getFullYear()} {t("general.fbc")}. {t("general.allRightsReserved")}
					</span>

					<span className="text-neutral-400">
						{t("general.developedBy")} {` `}
						<Link
							href="https://lanoow.dev"
							className="text-white transition hover:opacity-70"
						>
							lanoow.dev
						</Link>
					</span>
				</div>
			</div>
		</footer>
	)
}

export default Footer;