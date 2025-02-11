"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePathname, useRouter } from "@/i18n/routing";
import ReactCountryFlag from "react-country-flag";
import { useState, useTransition } from "react";
import { useParams } from "next/navigation";
import { Locale } from "@/types";
import { Globe } from "lucide-react";

const LanguageSwitcher = () => {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const [value, setValue] = useState<string>(params.locale as string);
  const [isPending, startTransition] = useTransition();

  type Language = {
    code: string;
    label: string;
    flag: string;
  }

  const languages = [
    { code: "bg", label: "Български", flag: "BG" },
    { code: "en", label: "English", flag: "GB" }
  ] as Language[];

  const handleLocaleChange = (value: string) => {
    const nextLocale = value as Locale;

    startTransition(() => {
      router.replace(
        pathname,
        { locale: nextLocale }
      );

      setValue(nextLocale);
      router.refresh();
    });

    console.log("Locale changed to", nextLocale);
  }

  return (
    <Select
      defaultValue={value}
      onValueChange={handleLocaleChange}
    >
      <SelectTrigger
        className={`
          outline-none ${!pathname.includes('dashboard') && 'lg:text-white lg:bg-transparent lg:border-0'}  
        `}
        disabled={isPending}
      >
        {pathname.includes("dashboard") ? (
          <SelectValue />
        ) : (
          <div>
            <div className="lg:hidden">
              <SelectValue />
            </div>

            <span className="hidden p-2 text-xl uppercase opacity-0 lg:opacity-100 lg:block lg:hover:opacity-70 transition">
              {/* {value === "bg" ? "БГ" : "EN"} */}
              <Globe />
            </span>
          </div>
        )}
      </SelectTrigger>
      <SelectContent>
        {languages.map((language, index) => (
          <SelectItem key={index} value={language.code}>
            <div className="flex items-center space-x-2">
              <ReactCountryFlag
                svg
                countryCode={language.flag || "GB"}
                aria-label={language.label}
                className="text-xl rounded-full"
              />

              <span>{language.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select >
  )
}

export default LanguageSwitcher;