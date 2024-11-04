import { getTranslations, setRequestLocale } from "next-intl/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { generateStaticParams } from "@/lib/generate-intl-static-params";
import type { Locale } from "@/types";

export default async function NotFound({params: {locale}}: {params: {locale: Locale}}) {
	generateStaticParams();
	setRequestLocale(locale);
	const t = await getTranslations();

	return (
		<div className="flex flex-col items-center justify-center h-[80vh] space-y-4">
			<div className="flex flex-col items-center space-y-2">
				<h1 className="text-3xl font-bold">{t("general.error")} 404</h1>
				<p>{t("errors.not_found")}</p>
			</div>
			<Button asChild>
				<Link href="/">
					{t("navigation.home")}
				</Link>
			</Button>
		</div>
	)
}