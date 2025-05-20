"use client";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Encode = () => {
    const router = useRouter();
    
    const { bearerToken } = useAuth();
    const [mensagemCript, setMensagemCript] = useState<string>("");
    const [hash, setHash] = useState<string>("");
    const [passo, setPasso] = useState<number>(0);

    const handleLogout = () => {
        localStorage.removeItem("bearerToken");
        router.push("/pages/login");
    };

    async function gerarHash(mensagem: string): Promise<string> {
        const encoder = new TextEncoder();
        const data = encoder.encode(mensagem);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
    }

    const handleEncode = async (e: React.FormEvent) => {
        e.preventDefault();
        const mensagem = (document.getElementById("mensagem") as HTMLInputElement).value;
        const passo = parseInt((document.getElementById("passo") as HTMLInputElement).value);
        if (mensagem && passo) {
            const mensagemCript = caesarCipher(mensagem, passo);
            const hash = await gerarHash(mensagemCript);
            
            setMensagemCript(mensagemCript);
            setHash(hash);
            setPasso(passo);
            try {
                await axios.post("http://localhost:4000/api/mensagens", {
                    hash, passo
                });
            } catch (error) {
                console.error("Erro ao enviar a mensagem:", error);
                alert("Erro ao enviar a mensagem. Tente novamente.");
            }
        } else {
            setMensagemCript("");
            setHash("");
            setPasso(0);
            alert("Por favor, preencha todos os campos.");
        }
    }

    const caesarCipher = (mensagem: string, passo: number) => {
        return mensagem.split("").map((char) => {
            const charCode = char.charCodeAt(0);
            if (charCode >= 65 && charCode <= 90) {
                return String.fromCharCode(((charCode - 65 + passo) % 26) + 65);
            } else if (charCode >= 97 && charCode <= 122) {
                return String.fromCharCode(((charCode - 97 + passo) % 26) + 97);
            }
            return char;
        }).join("");
    };

    return (
        <div>
            <Header />
            {bearerToken}
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
            
            <h1 className="text-3xl font-bold mb-4">Cifra de César</h1>
            <p className="text-lg">Insira uma mensagem para ser codificada em cifra de César e a quantidade de letras a serem puladas</p>
            <form className="bg-gray-800 p-6 rounded shadow-md w-96 mt-4">
                <div className="mb-4">
                    <label htmlFor="mensagem" className="block text-white mb-2">Mensagem:</label>
                    <input type="text" id="mensagem" className="border border-gray-300 p-2 rounded w-full" />
                    <label htmlFor="passo" className="block text-white mb-2">Passo:</label>
                    <input type="number" id="passo" className="border border-gray-300 p-2 rounded w-full" />
                </div>
                
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleEncode}>
                Codificar
                </button>
                
                
            </form>

            {mensagemCript && (
                <div className="bg-gray-700 text-white p-4 rounded mt-4 w-96">
                    <p className=""><strong>Mensagem codificada:</strong> {mensagemCript}</p>
                    <p><strong>Hash:</strong> {hash}</p>
                </div>
            )}

            <div className="mt-4 flex gap-5 items-center">
                <button onClick={e => { e.preventDefault(); router.push("/pages/decode"); }} className="mt-6 bg-blue-500 text-white px-4 py-2 rounded">
                    Decodificar
                </button>
                <button onClick={handleLogout} className="mt-6 bg-red-500 text-white px-4 py-2 rounded">
                    Sair
                </button>
            </div>
            
            </div>
            <Footer />
        </div>
        
    );
}

export default Encode;