import LanguageSwitcher from "@/components/language-switcher"
import { getCurrentUser } from "@/lib/actions"
import Link from "next/link";

const Home = async () => {
  const currentUser = await getCurrentUser();

  return (
    <div>
      {currentUser ? (
        <div>
          <h1>Welcome back, {currentUser.name}</h1>
          <p>Your email is {currentUser.email}</p>
          <p>Your role is {currentUser.role}</p>
        </div>
      ) : (
        <Link href={"/dashboard/login"}>Please login</Link>
      )}

      <LanguageSwitcher />
    </div>
  )
}

export default Home