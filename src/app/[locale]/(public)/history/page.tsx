import { NotFoundBoundary } from "next/dist/client/components/not-found-boundary";
import { getLocale, getTranslations } from "next-intl/server";
import HistoryOutput from "./_components/history";
import { getHistory } from "@/lib/actions";
import { Alice } from "next/font/google";
import { Locale } from "@/types";

const alice = Alice({ subsets: ["latin-ext", "cyrillic-ext"], weight: "400", display: "swap" });

export default async function History() {
	const t = await getTranslations();
	const locale = await getLocale();
	const history = await getHistory(locale as Locale);

	return (
		<div className="flex flex-col w-full space-y-4">
			<h2 className={`${alice.className} text-3xl uppercase`}>
				{t("navigation.history")}
			</h2>

			<NotFoundBoundary>
				{history && <HistoryOutput history={history} />}
			</NotFoundBoundary>
		</div>
	)
}