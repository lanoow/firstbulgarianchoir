import { generateStaticParams } from "@/lib/generate-intl-static-params";
import { getMessages, setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

export default async function LocaleLayout(
	props: Readonly<{
		children: React.ReactNode;
		params: { locale: string };
	}>
) {
	const { locale } = props.params;
  const { children } = props;

	setRequestLocale(locale);

	const messages = await getMessages();

	generateStaticParams();

	return (
		<NextIntlClientProvider messages={messages}>
			{children}
		</NextIntlClientProvider>
	);
}
