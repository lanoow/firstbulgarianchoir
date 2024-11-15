import { getCurrentUser } from "@/lib/actions";
import { redirect } from "next/navigation";
import { UserRole } from "@prisma/client";
import ResetPasswordClient from "./client";

const ResetPassword = async () => {
	const currentUser = await getCurrentUser();
	
	if (currentUser) {
		if (currentUser.role === UserRole.ADMIN) {
			return redirect("/dashboard");
		}

		return redirect("/");
	}
	
	return <ResetPasswordClient />;
}

export default ResetPassword;