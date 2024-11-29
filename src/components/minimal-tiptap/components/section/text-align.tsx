import * as React from 'react'
import type { Editor } from '@tiptap/react'
import type { toggleVariants } from '@/components/ui/toggle'
import type { VariantProps } from 'class-variance-authority'
import { CaretDownIcon } from '@radix-ui/react-icons'
import { ToolbarButton } from '../toolbar-button'
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

interface TextAlignSectionProps extends VariantProps<typeof toggleVariants> {
	editor: Editor
}

const TextAlignIcon = ({ alignment }: { alignment: string }) => {
	switch (alignment) {
		case 'left':
			return <AlignLeft />
		case 'center':
			return <AlignCenter />
		case 'right':
			return <AlignRight />
		case 'justify':
			return <AlignJustify />
		default:
			return <AlignLeft />
	}
}

export const TextAlignSection: React.FC<TextAlignSectionProps> = ({ editor, size, variant }) => {
	const alignment = editor.getAttributes('textAlign').textAlign || 'left'
	const [textAlignment, setTextAlignment] = React.useState<string>(alignment)

	const handleAlignmentChange = React.useCallback(
		(value: string) => {
			setTextAlignment(value)
			editor.chain().focus().setTextAlign(value).run()
		},
		[editor]
	)

	React.useEffect(() => {
		setTextAlignment(alignment)
	}, [alignment])

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<ToolbarButton
					size={size}
					variant={variant}
					tooltip="Text alignment"
					aria-label="Text alignment"
					className="w-12"
				>
					<TextAlignIcon alignment={textAlignment} />
					<CaretDownIcon className="size-5" />
				</ToolbarButton>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start" className="w-full">
				<DropdownMenuItem
					className="flex items-center space-x-2"
					onClick={() => handleAlignmentChange('left')}
				>
					<AlignLeft />
					<span>Left</span>
				</DropdownMenuItem>
				<DropdownMenuItem
					className="flex items-center space-x-2"
					onClick={() => handleAlignmentChange('center')}
				>
					<AlignCenter />
					<span>Center</span>
				</DropdownMenuItem>
				<DropdownMenuItem
					className="flex items-center space-x-2"
					onClick={() => handleAlignmentChange('right')}
				>
					<AlignRight />
					<span>Right</span>
				</DropdownMenuItem>
				<DropdownMenuItem
					className="flex items-center space-x-2"
					onClick={() => handleAlignmentChange('justify')}
				>
					<AlignJustify />
					<span>Justify</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

TextAlignSection.displayName = 'TextAlignSection'

export default TextAlignSection
