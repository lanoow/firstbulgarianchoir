import { getCurrentUser } from "@/lib/actions";
import { redirect } from "next/navigation";
import { UserRole } from "@prisma/client";
import SignUpClient from "./client";

const SignUp = async () => {
	const currentUser = await getCurrentUser();
	
	if (currentUser) {
		if (currentUser.role === UserRole.ADMIN) {
			return redirect("/dashboard");
		}

		return redirect("/");
	}
	
	return <SignUpClient />;
}

export default SignUp;