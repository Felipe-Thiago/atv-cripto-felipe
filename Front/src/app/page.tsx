"use client";
import { useRouter } from "next/navigation";
<<<<<<< HEAD
import { useEffect } from "react";
=======
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
>>>>>>> 05636f1bb5315593cd48a8bfabedd4dae54cf621

export default function App() {
  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  }, [router]);
  
  return null;
}
