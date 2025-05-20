"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function App() {
  const router = useRouter();

  const { bearerToken, login } = useAuth();

  useEffect(() => {
    router.push("/pages/login");
  }, [router]);
  
  return null;
}
