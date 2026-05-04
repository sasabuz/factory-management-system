import axios from "axios";
import { cookies } from "next/headers";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  image: string;
  salary: number;
}

export const checkUser = async (): Promise<User | null> => {
  
    //asynchronous cookies
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;

  if (!token) {
    return null;
  }

  try {
    const res = await axios.get<{ data: User }>(
      "http://localhost:3000/api/auth/me",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.data.data;
  } catch (error) {
    console.error("User check failed:", error);
    return null;
  }
};
