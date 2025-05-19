"use client";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Encode = () => {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("bearerToken");
        if (!token) {
            router.push("/pages/login");
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("bearerToken");
        router.push("/pages/login");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
            <Header />
            <h1 className="text-3xl font-bold mb-4">Codificador de Mensagens</h1>
            <p className="text-lg">Acesse o sistema de criptografia de mensagens.</p>
            <form className="bg-gray-800 p-6 rounded shadow-md w-96 mt-4">
                <div className="mb-4">
                <label htmlFor="message" className="block text-white mb-2">Mensagem:</label>
                <input type="text" id="message" className="border border-gray-300 p-2 rounded w-full" />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Codificar
                </button>
            </form>
            <button onClick={handleLogout} className="mt-6 bg-red-500 text-white px-4 py-2 rounded">
                Sair
            </button>
        <Footer />
        </div>
    );
}

export default Encode;