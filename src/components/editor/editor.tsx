"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import { useTranslations } from "next-intl";

import "@/app/editor.css";

interface EditorProps {
	readonly?: boolean;
	autofocus?: boolean;
}

const Editor: React.FC<EditorProps> = ({ readonly, autofocus }) => {
	const t = useTranslations();

	const editor = useEditor({
		extensions: [
			StarterKit,
			Placeholder.configure({
				placeholder: t("dashboard.startTyping")
			})
		],
		immediatelyRender: false,
		editable: !readonly,
		autofocus: autofocus,
		editorProps: {
			attributes: {
				class: "p-4 min-h-32 outline-none transition bg-white border rounded-md border-neutral-400 focus:border-neutral-700"
			}
		}
	});

	return (
		<div>
			<EditorContent editor={editor} />
		</div>
	)
}

export default Editor;