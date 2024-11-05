import { setRequestLocale } from "next-intl/server";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { Formats } from "next-intl";

export const formats = {
  dateTime: {
    short: {
      day: "numeric",
      month: "short",
      year: "numeric",
    },
  },
  number: {
    precise: {
      maximumFractionDigits: 5,
    },
  },
  list: {
    enumeration: {
      style: "long",
      type: "conjunction",
    },
  },
} satisfies Formats;

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  setRequestLocale(locale);

  return {
    // messages: (await import(`../../messages/${locale}.json`)).default,
    locale,
    formats,
  };
});
