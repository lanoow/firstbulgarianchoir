"use client";

import { useTranslations } from "next-intl";
import { Alice } from "next/font/google";
import Link from "next/link";

const font = Alice({ subsets: ["cyrillic", "latin"], weight: "400", display: "swap" });

const Logo: React.FC<{
	link?: string;
	short?: boolean;
	classNames?: string;
	variant?: "sm" | "lg";
}> = ({ link, short, classNames, variant = "sm" }) => {
	const t = useTranslations("general");

	return (
		<>
			{link ? (
				<Link href={link} className={`
					${font.className} text-black hover:opacity-70 transition cursor-pointer whitespace-nowrap
					${classNames}
				`}>
					{variant === "sm" ? (
						<span className="text-2xl lg:text-4xl">
							{short ? t("fbcShort") : t("fbc")}
						</span>
					) : (
						<div className="flex flex-col items-center -space-y-2 uppercase lg:space-y-0 ">
							<span className="text-lg lg:text-2xl">
								{t("fbcLg")}
							</span>
							<span className="text-2xl lg:text-[2.75rem]">
								{t("YankoMustakov")}
							</span>
						</div>
					)}
				</Link>
			) : (
				<div className={`${font.className} text-black whitespace-nowrap ${classNames}`}>
					{variant === "sm" ? (
						<span className="text-2xl lg:text-4xl">
							{short ? t("fbcShort") : t("fbc")}
						</span>
					) : (
						<div className="flex flex-col items-center -space-y-2 uppercase lg:space-y-0">
							<span className="text-lg lg:text-2xl">
								{t("fbcLg")}
							</span>
							<span className="text-2xl lg:text-[2.75rem]">
								{t("YankoMustakov")}
							</span>
						</div>
					)}
				</div>
			)}
		</>
	)
}

export default Logo;