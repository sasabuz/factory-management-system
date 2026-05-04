import { checkUser } from "@/lib/checkUserServerConfig";
import { redirect } from "next/navigation";

export default async function RootPage() {
  const user = await checkUser();

  if (!user) {
    redirect("/login");
  }
  switch (user.role) {
    case "admin":
      redirect("/dashboard/overview/admin");
    case "manager":
      redirect("/dashboard/overview/manager");
    case "accountant":
      redirect("/dashboard/overview/accountant");
    case "worker":
      redirect("/dashboard/overview/worker");
    default:
      redirect("/unauthorized");
  }
}
