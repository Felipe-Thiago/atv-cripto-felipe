/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import authService from "@/app/services/authService";

const Register = () => {

  const [errorMsg, setErrorMsg] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [csenha, setCSenha] = useState("");
  const router = useRouter();

  const handleRegister = async (email: string, senha: string, csenha: string) =>{
    if (senha != csenha) {
      setErrorMsg(["As senhas não coincidem."])
      return;
    }

    try{
      await authService.register({email, senha});
      router.push("/");
    } catch(error: any){
      if(error.response && error.response.data && Array.isArray(error.response.data.errors)){
        setErrorMsg(error.response.data.errors.map((e: {msg: string}) => e.msg));
      } else{
        setErrorMsg(["Ocorreu um erro durante o registro."]);
      }
      console.error("Erro no registro: ", error);
    }
  }

  return (
    <div>
        <Header />

        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
          <h1 className="text-3xl">Registre-se para entrar.</h1>
          <form className="bg-gray-800 p-6 rounded shadow-md w-96 mt-4" onSubmit={e => { e.preventDefault(); handleRegister(email, senha, csenha); }}>
          {errorMsg.length > 0 && (
            <div className="mb-4 text-red-400">
              {errorMsg.map((msg, idx) => <div key={idx}>{msg}</div>)}
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="email" className="block text-white mb-2">Usuário:</label>
            <input type="email" name="email" id="email" className="border border-gray-300 p-2 rounded w-full" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="mb-4">
            <label htmlFor="senha" className="block text-white mb-2">Senha:</label>
            <input type="password" id="senha" name="senha" className="border border-gray-300 p-2 rounded w-full" value={senha} onChange={e => setSenha(e.target.value)} />
          </div>
          <div className="mb-4">
            <label htmlFor="csenha" className="block text-white mb-2">Confirmar senha:</label>
            <input type="password" id="csenha" name="csenha" className="border border-gray-300 p-2 rounded w-full" value={csenha} onChange={e => setCSenha(e.target.value)}></input>
          </div>
          
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Registrar-se
          </button>
          <p className="text-white mt-4">
            Já tem uma conta? <a href="" className="text-blue-400" onClick={e => { e.preventDefault(); router.push("/pages/login"); }} >Faça Login</a>
          </p>
        </form>
        </div>
        
        <Footer />
    </div>
  );
}

export default Register;