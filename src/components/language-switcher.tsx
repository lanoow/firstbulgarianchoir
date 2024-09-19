"use client";

import { Select, SelectedItemProps, SelectItem } from "@nextui-org/react";
import { ChangeEvent, useState, useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/routing";
import { useParams } from "next/navigation";
import { Locale } from "@/types";

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
    { code: "bg", label: "Български" },
    { code: "en", label: "English" }
  ] as Language[];

  const handleLocaleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value as Locale;

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
    <div>
      <Select
        items={languages}
        disallowEmptySelection
        disableSelectorIconRotation
        defaultSelectedKeys={[value]}
        onChange={handleLocaleChange}
        isDisabled={isPending}
        aria-label="Select language"
        selectorIcon={
          <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="1em"
            role="presentation"
            stroke="hsl(240 5.03% 64.9%)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            width="1em"
          >
            <path d="M0 0h24v24H0z" fill="none" stroke="none" />
            <path d="M8 9l4 -4l4 4" />
            <path d="M16 15l-4 4l-4 -4" />
          </svg>
        }
        renderValue={(items: SelectedItemProps<Language>[]) => {
          return items.map((item) => (
            <span key={item.data?.code}>
              {item.data?.label}
            </span>
          ))
        }}
      >
        {(item) => (
          <SelectItem
            key={item.code}
            value={item.code}
          >
            {item.label}
          </SelectItem>
        )}
      </Select>
    </div>
  )
}

export default LanguageSwitcher;