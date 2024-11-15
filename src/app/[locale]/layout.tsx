import { generateStaticParams } from "@/lib/generate-intl-static-params";
import { getMessages, setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

export default async function LocaleLayout(
	props: {
		children: React.ReactNode;
		params: { locale: string };
	}
) {
	const { locale } = await Promise.resolve(props.params);
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
