import { getLocale } from "next-intl/server";
import { getHistory } from "@/lib/actions";
import HistoryClient from "./client";
import { Locale } from "@/types";

export default async function History() {
	const locale = await getLocale();
	const history = await getHistory(locale as Locale);
	const content = "test";

  return (
		<HistoryClient content={content} />
  )
}