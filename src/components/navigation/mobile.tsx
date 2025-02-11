"use client";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import LanguageSwitcher from "../language-switcher";
import { Button } from "@/components/ui/button";
import { NavigationProps } from "./navigation";
import { Menu } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Logo from "../logo";

const MobileNavigation: React.FC<{
	links: NavigationProps[];
	socials: NavigationProps[];
	showAdmin: boolean;
	adminLabel: string;
}> = ({ links, socials, showAdmin, adminLabel }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="lg:hidden">
			<Sheet open={isOpen} onOpenChange={setIsOpen}>
				<SheetTrigger asChild>
					<Button variant="outline" className="text-white bg-transparent border-white" size="icon">
						<Menu className="w-6 h-6" />
						<span className="sr-only">Toggle navigation menu</span>
					</Button>
				</SheetTrigger>
				<SheetContent side="right" className="w-[300px] sm:w-[400px]">
					<SheetTitle className="hidden">
						Navigation menu
					</SheetTitle>
					<div className="flex flex-col h-full">
						<nav className="flex-grow py-6">
							<div className="mb-8">
								<Logo variant="sm" link="/" />
							</div>

							<ul className="space-y-4">
								{links.map((link) => (
									<li key={link.href}>
										<Link
											href={link.href}
											className="text-lg transition hover:opacity-70"
											onClick={() => setIsOpen(false)}
										>
											{link.label}
										</Link>
									</li>
								))}
								{showAdmin && (
									<li>
										<Link
											href="/dashboard/"
											className="text-lg transition hover:opacity-70"
											onClick={() => setIsOpen(false)}
										>
											{adminLabel}
										</Link>
									</li>
								)}
							</ul>
						</nav>
						<div className="py-6 space-y-4 border-t">
							<LanguageSwitcher />

							<div className="flex space-x-4">
								<TooltipProvider>
									{socials.map((social) => (
										<Tooltip key={social.href}>
											<TooltipTrigger asChild>
												<Link href={social.href} className="text-black transition hover:opacity-70">
													{social.icon}
												</Link>
											</TooltipTrigger>
											<TooltipContent align="center">
												{social.label}
											</TooltipContent>
										</Tooltip>
									))}
								</TooltipProvider>
							</div>
						</div>
					</div>
				</SheetContent>
			</Sheet>
		</div>
	)
}

export default MobileNavigation;