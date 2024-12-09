import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "First Bulgarian Choir",
	robots: {
		index: false,
		follow: false
	}
};

export default async function AuthLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
		<main>
			{children}

			<Link href="https://lanoow.dev" className="absolute bottom-2 right-2 text-neutral-400 hover:text-black transition">
				lanoow.dev
			</Link>
		</main>
  );
}
