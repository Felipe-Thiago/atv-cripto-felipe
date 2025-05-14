"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "./context/AuthContext";

export default function App() {
  const router = useRouter();

  const { bearerToken, login } = useAuth();

  return (
    <div>
      
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
        <h1 className="text-3xl font-bold mb-4">Bem-vindo ao Codificador</h1>
        <p className="text-lg">Acesse o sistema de criptografia de mensagens.</p>
        <form className="bg-gray-800 p-6 rounded shadow-md w-96 mt-4">
          <div className="mb-4">
            <label htmlFor="email" className="block text-white mb-2">Usuário:</label>
            <input type="email" id="email" className="border border-gray-300 p-2 rounded w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-white mb-2">Senha:</label>
            <input type="password" id="password" className="border border-gray-300 p-2 rounded w-full" />
          </div>
          
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Fazer Login
          </button>
          <p className="text-white mt-4">
            Não tem uma conta? <a href="/register" className="text-blue-400">Registrar</a>
          </p>
        </form>
      </div>

    </div>
  );
}
