"use client"
import React, { useEffect, useState } from "react";
import { Eye, EyeOff, Loader } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";

function Login5() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    email:"",
    password:""
  })
  const router = useRouter();

  const { user, checkCurrentUser, login, isLoggingIn, errorMessage} = useAuthStore();

  useEffect(()=>{
    const checkUser = async()=>{
      await checkCurrentUser();
    }
    checkUser();
  },[checkCurrentUser])

  useEffect(() => {
    if (user) {
      if(user.role === 'admin') router.push('/dashboard/overview/admin');
      if(user.role === 'manager') router.push('/dashboard/overview/manager');
      if(user.role === 'accountant') router.push('/dashboard/overview/accountant');
      if(user.role === 'worker') router.push('/dashboard/overview/worker');
    }
  }, [user, router]);

  const togglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <>
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-50">
      <div className="w-full max-w-md mx-auto border border-gray-300 rounded-xl shadow-md p-10 space-y-6 bg-white dark:bg-white text-gray-900 dark:text-gray-900">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-semibold text-green-600 dark:text-green-600">
            Pure Agro Industries
          </h1>
          <p className="text-md text-gray-500 dark:text-gray-500">
            Enter your credentials to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="text-md font-medium dark:text-gray-900">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              onChange={(e)=>setFormData({...formData, email:e.target.value})}
              placeholder="name@example.com"
              className="mt-1 w-full h-10 border border-gray-300 rounded-md px-3 text-md bg-white text-gray-900 dark:bg-white dark:text-gray-900 focus:ring-2 focus:ring-green-600 outline-none"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-md font-medium dark:text-gray-900">
              Password
            </label>
            <div className="relative mt-2">
              <input
                id="password"
                type={passwordVisible ? "text" : "password"}
                required
                onChange={(e)=>setFormData({...formData, password:e.target.value})}
                placeholder="Enter your password"
                className="w-full h-12 border border-gray-300 rounded-md px-4 pr-10 text-base bg-white text-gray-900 dark:bg-white dark:text-gray-900 focus:ring-2 focus:ring-green-600 outline-none"
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-600 dark:text-gray-500 dark:hover:text-green-600"
              >
                {passwordVisible ? (
                  <Eye size={20} strokeWidth={1.8} />
                ) : (
                  <EyeOff size={20} strokeWidth={1.8} />
                )}
              </button>
            </div>
          </div>

          {/* show error message */}
          <div>
            {errorMessage && <div className="text-sm text-red-500 dark:text-red-500">{errorMessage}</div>}
          </div>

          <button
            type="submit"
            className="w-full h-10 bg-green-600 hover:bg-green-700 text-white dark:bg-green-600 dark:text-white font-medium rounded-md transition"
            disabled={isLoggingIn}
          >
            {isLoggingIn? (
              <div className="flex gap-2 justify-center"> Signing In <Loader className="animate-spin" /></div>
            ) : 'Sign In'}
          </button>
        </form>
      </div>
    </div>

    {/* Inline global CSS for autofill fix */}
    <style jsx global>{`
      input:-webkit-autofill,
      input:-webkit-autofill:hover,
      input:-webkit-autofill:focus,
      input:-webkit-autofill:active {
        -webkit-box-shadow: 0 0 0px 1000px white inset !important;
        -webkit-text-fill-color: #171717 !important;
      }
    `}</style>
    </>
  );
}

export default Login5;
