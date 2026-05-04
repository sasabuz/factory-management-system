import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Separator } from "@/components/ui/separator";
import { checkUser } from "@/lib/checkUserServerConfig";
import { redirect } from "next/navigation";

const layout = async ({ children }: { children: React.ReactNode }) => {
  // if user is not loggedIn then automatic return to
  // login page
  const user = await checkUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/6 sticky top-0 h-screen">
        <Sidebar></Sidebar>
      </div>
      <div  className="flex-1 py-5 px-10">
        {/* Navbar */}
        <div className=""> <Navbar></Navbar></div>
              <Separator></Separator>
        {/* children */}
        <div className="pt-10 pl-10 pr-20">{children}</div>
      </div>
    </div>
  );
};

export default layout;
