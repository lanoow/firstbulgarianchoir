import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "First Bulgarian Choir",
};

export default async function BaseLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
		<main>
			{children}
		</main>
  );
}
