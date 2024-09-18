"use client";

import { useTranslations } from "next-intl";
import { Alice } from "next/font/google";
import Link from "next/link";

const font = Alice({ subsets: ["cyrillic", "latin"], weight: "400" });

const Logo: React.FC<{
	link?: string;
	short?: boolean;
	classNames?: string;
}> = ({ link, short, classNames }) => {
	const t = useTranslations("general");

	return (
		<>
			{link ? (
				<Link href={link} className={`${font.className} text-4xl text-black hover:opacity-70 transition ${classNames}`}>
					{short ? t("fbcShort") : t("fbc")}
				</Link>
			) : (
				<span className={`${font.className} text-4xl text-black ${classNames}`}>
					{short ? t("fbcShort") : t("fbc")}
				</span>
			)}
		</>
	)
}

export default Logo;