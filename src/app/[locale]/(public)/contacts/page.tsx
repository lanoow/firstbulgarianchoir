import { Mail, MapPin, Phone } from "lucide-react";

import { Alice } from "next/font/google";
import ContactForm from "./_components/form";
import Link from "next/link";
import { Metadata } from "next";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";

const alice = Alice({ weight: "400", subsets: ["cyrillic-ext", "latin-ext"], display: "swap" });

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: `${t("navigation.contacts")} | ${t("general.fbc")}`,
    description: `${t("home.description")}`,
		
  }
}

export default async function ContactsPage() {
	const t = await getTranslations();

	return (
		<div className="flex flex-col space-y-16">
			<div className="flex flex-col items-start gap-8 lg:flex-row lg:justify-between">
				<div className="flex flex-col space-y-4">
					<div className="flex flex-col space-y-2">
						<h2 className="text-xl uppercase">{t("navigation.contacts")}</h2>
						<h1 className={`text-4xl uppercase ${alice.className}`}>{t("general.fbc")}</h1>
					</div>

					<ul className="flex flex-col space-y-4">
						<li>
							<a href="tel:0887600554" className="flex items-center space-x-4 text-black transition hover:opacity-70">
								<Phone size={24} />
								<span>0887 600 554</span>
							</a>
						</li>
						<li>
							<a href="mailto:chitalishte.svishtov@gmail.com" className="flex items-center space-x-4 text-black transition hover:opacity-70">
								<Mail size={24} />
								<span>chitalishte.svishtov@gmail.com</span>
							</a>
						</li>
						<li>
							<Link href="https://g.co/kgs/gR6M4CR" className="flex items-center space-x-4 text-black transition hover:opacity-70">
								<MapPin size={24} />
								<span>{t("general.address")}</span>
							</Link>
						</li>
					</ul>
				</div>

				<Suspense fallback={<Skeleton className="w-full rounded-md shadow-lg aspect-video max-h-96" />}>
					<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2888.469701391475!2d25.3463827!3d43.617582!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aea1f14cb6f28d%3A0xde566fe974be3d1f!2z0KfQuNGC0LDQu9C40YnQtSDQldC70LXQvdC60LAg0Lgg0JrQuNGA0LjQuyDQlC4g0JDQstGA0LDQvNC-0LLQuA!5e0!3m2!1sen!2sbg!4v1739300140550!5m2!1sen!2sbg" className="w-full rounded-md shadow-lg aspect-video max-h-96 lg:max-w-[50%]" style={{ border: 0 }} allowFullScreen={true} loading="lazy"></iframe>
				</Suspense>
			</div>

			<div className="flex flex-col space-y-4">
				<h1 className={`text-4xl text-center uppercase ${alice.className}`}>
					{t("contacts.writeUs")}
				</h1>

				<ContactForm />
			</div>
		</div>
	)
}