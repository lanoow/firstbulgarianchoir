import { getCurrentUser } from "@/lib/actions";
import { redirect } from "next/navigation";
import { UserRole } from "@prisma/client";
import LoginClient from "./client";

const Login = async () => {
	const currentUser = await getCurrentUser();
	
	if (currentUser) {
		if (currentUser.role === UserRole.ADMIN) {
			return redirect("/dashboard");
		}

		return redirect("/");
	}
	
	return <LoginClient />;
}

export default Login;