import Navigation from "@/components/navigation/navigation";
import { getCurrentUser } from "@/lib/actions";
import Footer from "@/components/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "First Bulgarian Choir",
};

export default async function BaseLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  
  return (
    <main>
      <Navigation currentUser={currentUser ?? undefined} />

      <div className="px-4 mx-auto my-8 max-w-screen-2xl">
        {children}
      </div>

      <Footer />
    </main>
  );
}
