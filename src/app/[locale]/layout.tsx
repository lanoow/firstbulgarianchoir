import { generateStaticParams } from "@/lib/generate-intl-static-params";
import { getMessages, setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

// @ts-nocheck
export default async function LocaleLayout(
	// @ts-nocheck
	props: Readonly<{
		// @ts-nocheck
		children: React.ReactNode;
		// @ts-nocheck
		params: { locale: string };
	}>
) {
	const { children, params: { locale } } = props;

	if (!routing.locales.includes(locale as any)) {
		notFound();
	}

	setRequestLocale(locale);

	const messages = await getMessages();

	generateStaticParams();

	return (
		<NextIntlClientProvider messages={messages}>
			{children}
		</NextIntlClientProvider>
	);
}
