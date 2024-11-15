import { getCurrentUser } from "@/lib/actions";
import { redirect } from "next/navigation";
import { UserRole } from "@prisma/client";
import ForgotPasswordClient from "./client";

const ForgotPassword = async () => {
	const currentUser = await getCurrentUser();
	
	if (currentUser) {
		if (currentUser.role === UserRole.ADMIN) {
			return redirect("/dashboard");
		}

		return redirect("/");
	}
	
	return <ForgotPasswordClient />;
}

export default ForgotPassword;