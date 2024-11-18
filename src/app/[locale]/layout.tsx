import { generateStaticParams } from "@/lib/generate-intl-static-params";
import { getMessages, setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

// @ts-expect-error Builds and works just fine, vercel is just ass
export default async function LocaleLayout(props: Readonly<{children: React.ReactNode;params: { locale: string };}>) {
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
