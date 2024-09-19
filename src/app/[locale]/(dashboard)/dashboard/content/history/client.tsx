"use client";

import { useState } from "react";
import { Content } from "@tiptap/react";
import { MinimalTiptapEditor } from "@/components/editor";
import { useTranslations } from "next-intl";

const HistoryClient = () => {
	const [value, setValue] = useState<Content>('');
	const t = useTranslations("dashboard");
	
	return (
		<MinimalTiptapEditor
			value={value}
			onChange={setValue}
			throttleDelay={2000}
			className="w-[95%]"
			editorContentClassName="p-4"
			output="html"
      placeholder={t("startTyping")}
      autofocus={true}
      immediatelyRender={true}
      editable={true}
      injectCSS={true}
      editorClassName="focus:outline-none"
		/>
	)
}

export default HistoryClient;