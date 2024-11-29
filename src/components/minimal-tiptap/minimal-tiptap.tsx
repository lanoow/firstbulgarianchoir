import * as React from 'react'
import './styles/index.css'

import type { Content, Editor } from '@tiptap/react'
import type { UseMinimalTiptapEditorProps } from './hooks/use-minimal-tiptap'
import { EditorContent } from '@tiptap/react'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { SectionOne } from './components/section/one'
import { SectionTwo } from './components/section/two'
import { SectionThree } from './components/section/three'
import { SectionFour } from './components/section/four'
import { SectionFive } from './components/section/five'
import { LinkBubbleMenu } from './components/bubble-menu/link-bubble-menu'
import { useMinimalTiptapEditor } from './hooks/use-minimal-tiptap'
import { MeasuredContainer } from './components/measured-container'
import TextAlignSection from './components/section/text-align'

export interface MinimalTiptapProps extends Omit<UseMinimalTiptapEditorProps, 'onUpdate'> {
  value?: Content
  onChange?: (value: Content) => void
  className?: string
  editorContentClassName?: string
  preview?: boolean
}

const Toolbar = ({ editor }: { editor: Editor }) => (
  <div className="shrink-0 overflow-x-auto border-b border-border p-2">
    <div className="flex w-max items-center gap-px">
      <SectionOne editor={editor} activeLevels={[1, 2, 3, 4, 5, 6]} />

      <SectionTwo
        editor={editor}
        activeActions={['bold', 'italic', 'underline', 'strikethrough', 'clearFormatting']}
        mainActionCount={3}
      />

      <Separator orientation="vertical" className="mx-2 h-7" />

      <TextAlignSection editor={editor} />

      <Separator orientation="vertical" className="mx-2 h-7" />

      <SectionThree editor={editor} />

      <Separator orientation="vertical" className="mx-2 h-7" />

      <SectionFour editor={editor} activeActions={['orderedList', 'bulletList']} mainActionCount={0} />

      <Separator orientation="vertical" className="mx-2 h-7" />

      <SectionFive editor={editor} activeActions={['blockquote', 'horizontalRule']} mainActionCount={0} />
    </div>
  </div>
)

export const MinimalTiptapEditor = React.forwardRef<HTMLDivElement, MinimalTiptapProps>(
  ({ value, onChange, className, editorContentClassName, preview, ...props }, ref) => {
    const editor = useMinimalTiptapEditor({
      value,
      onUpdate: onChange,
      editable: !preview,
      immediatelyRender: false,
      ...props
    })

    if (!editor) {
      return null
    }

    return (
      <MeasuredContainer
        as="div"
        name="editor"
        ref={ref}
        className={cn(
          !preview && 'flex h-auto w-full flex-col rounded-md shadow-sm focus-within:border-primary',
          className
        )}
      >
        {!preview && (
          <Toolbar editor={editor} />
        )}
        <EditorContent
          editor={editor}
          className={cn(
            'minimal-tiptap-editor',
            editorContentClassName
          )}
        />
        {!preview && (
          <LinkBubbleMenu editor={editor} />
        )}
      </MeasuredContainer>
    )
  }
)

MinimalTiptapEditor.displayName = 'MinimalTiptapEditor'

export default MinimalTiptapEditor
