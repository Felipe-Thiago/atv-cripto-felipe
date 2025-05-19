"use client";
<<<<<<< HEAD
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useRouter } from "next/navigation";



const Register = () => {

  const router = useRouter();

  const handleRegister = () =>{
    if (senha != confirmarSenha) {
      
    }
  }

=======

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter();

>>>>>>> 05636f1bb5315593cd48a8bfabedd4dae54cf621
  return (
    <div>
        <Header />

        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
<<<<<<< HEAD
          <h1 className="text-3xl">Registre-se para entrar.</h1>
          <form className="bg-gray-800 p-6 rounded shadow-md w-96 mt-4">
=======
        <h1 className="text-3xl font-bold mb-4">Bem-vindo ao Codificador</h1>
        <p className="text-lg">Registre-se para acessar o sistema</p>
        <form className="bg-gray-800 p-6 rounded shadow-md w-96 mt-4">
          
>>>>>>> 05636f1bb5315593cd48a8bfabedd4dae54cf621
          <div className="mb-4">
            <label htmlFor="email" className="block text-white mb-2">Usuário:</label>
            <input type="email" id="email" className="border border-gray-300 p-2 rounded w-full" />
          </div>
<<<<<<< HEAD
=======

>>>>>>> 05636f1bb5315593cd48a8bfabedd4dae54cf621
          <div className="mb-4">
            <label htmlFor="password" className="block text-white mb-2">Senha:</label>
            <input type="password" id="password" className="border border-gray-300 p-2 rounded w-full" />
          </div>
<<<<<<< HEAD
          <div className="mb-4">
            <label htmlFor="cpassword" className="block text-white mb-2">Confirmar senha:</label>
            <input type="password" id="password" className="border border-gray-300 p-2 rounded w-full"></input>
          </div>
          
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => router.push("/login")}>
            Registrar-se
          </button>
          <p className="text-white mt-4">
            Já tem uma conta? <a href="" className="text-blue-400" onClick={() => router.push("/login")} >Faça Login</a>
          </p>
        </form>
        </div>
=======
          
          <div className="mb-4">
            <label htmlFor="password" className="block text-white mb-2">Confirme a Senha:</label>
            <input type="password" id="password" className="border border-gray-300 p-2 rounded w-full" />
          </div>
          
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => {
            alert("Usuário registrado com sucesso");
            router.push("/login");
          }}>
            Registrar
          </button>
          
        </form>
      </div>
>>>>>>> 05636f1bb5315593cd48a8bfabedd4dae54cf621
        
        <Footer />
    </div>
  );
}

export default Register;