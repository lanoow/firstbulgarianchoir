'use client'

import * as React from 'react'
import { EyeIcon, EyeOffIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input, type InputProps } from '@/components/ui/input'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
	const [showPassword, setShowPassword] = React.useState(false)
	const disabled = props.value === '' || props.value === undefined || props.disabled
	const t = useTranslations("auth.password");

	return (
		<div className="relative">
			<Input
				type={showPassword ? 'text' : 'password'}
				className={cn('hide-password-toggle pr-10', className)}
				ref={ref}
				{...props}
			/>
			<Button
				type="button"
				variant="ghost"
				size="sm"
				className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
				onClick={() => setShowPassword((prev) => !prev)}
				disabled={disabled}
			>
				<TooltipProvider>
					{showPassword && !disabled ? (
						<Tooltip>
							<TooltipTrigger asChild>
								<EyeIcon className="w-4 h-4" aria-hidden="true" />
							</TooltipTrigger>
							<TooltipContent>{t("hide")}</TooltipContent>
						</Tooltip>
					) : (
						<Tooltip>
							<TooltipTrigger asChild>
								<EyeOffIcon className="w-4 h-4" aria-hidden="true" />
							</TooltipTrigger>
							<TooltipContent>{t("show")}</TooltipContent>
						</Tooltip>
					)}
				</TooltipProvider>
				{/* <span className="sr-only">{showPassword ? 'Hide password' : 'Show password'}</span> */}
			</Button>

			{/* hides browsers password toggles */}
			<style>{`
					.hide-password-toggle::-ms-reveal,
					.hide-password-toggle::-ms-clear {
						visibility: hidden;
						pointer-events: none;
						display: none;
					}
				`}</style>
		</div>
	)
})
PasswordInput.displayName = 'PasswordInput'

export { PasswordInput }