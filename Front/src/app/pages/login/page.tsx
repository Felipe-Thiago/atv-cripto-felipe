/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useRouter } from "next/navigation";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import React, { useState } from "react";
import authService from "@/app/services/authService";
import { useAuth } from "@/context/AuthContext";
const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [errorMsg, setErrorMsg] = useState<string[]>([]);

    const { bearerToken, login } = useAuth();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg([]);
        try {
            await authService.login({ email, senha });
            router.push("/pages/encode");
        } catch (error: any) {
            if (error.response && error.response.data && Array.isArray(error.response.data.errors)) {
                setErrorMsg(error.response.data.errors.map((e: { msg: string }) => e.msg));
            } else {
                setErrorMsg(["Usuário ou senha inválidos."]);
            }
        }
    };
    return (
        <div>
            { bearerToken }
            <Header />
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
                <h1 className="text-3xl font-bold mb-4">Bem-vindo ao Codificador</h1>
                <p className="text-lg">Acesse o sistema de criptografia de mensagens.</p>
                <form className="bg-gray-800 p-6 rounded shadow-md w-96 mt-4" onSubmit={handleLogin}>
                    {errorMsg.length > 0 && (
                        <div className="mb-4 text-red-400">
                            {errorMsg.map((msg, idx) => <div key={idx}>{msg}</div>)}
                        </div>
                    )}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-white mb-2">Usuário:</label>
                        <input type="email" id="email" className="border border-gray-300 p-2 rounded w-full" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-white mb-2">Senha:</label>
                        <input type="password" id="password" className="border border-gray-300 p-2 rounded w-full" value={senha} onChange={e => setSenha(e.target.value)} />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                        Fazer Login
                    </button>
                    <p className="text-white mt-4">
                        Não tem uma conta? <a href="" className="text-blue-400" onClick={e => { e.preventDefault(); router.push("/pages/register"); }} >Registrar</a>
                    </p>
                </form>
            </div>
        <Footer />
        </div>
        
    )
}

export default Login;