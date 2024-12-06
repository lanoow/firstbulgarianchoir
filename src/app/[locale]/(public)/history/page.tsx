import HistoryOutput from "./_components/history";
import { getLocale } from "next-intl/server";
import { getHistory } from "@/lib/actions";
import { Locale } from "@/types";
import { NotFoundBoundary } from "next/dist/client/components/not-found-boundary";

export default async function History() {
	const locale = await getLocale();
	const history = await getHistory(locale as Locale);

	return (
		<>
			{history ? <HistoryOutput history={history} /> : NotFoundBoundary}
		</>
	)
}