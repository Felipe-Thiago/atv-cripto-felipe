"use client";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import router from "next/navigation";

const Decode = () => {
    const router = useRouter();

    const [mensagemDecodificada, setMensagemDecodificada] = useState("");
    const [erro, setErro] = useState("");
    const { bearerToken } = useAuth();

    type Mensagem = { hash: string; [key: string]: any };
    const [hashes, setHashes] = useState<Mensagem[]>([]);

    const handleLogout = () => {
        localStorage.removeItem("bearerToken");
        router.push("/pages/login");
    };

    function caesarDecipher(mensagem: string, hash: string) {
        return mensagem.split("").map((char) => {
            const charCode = char.charCodeAt(0);
            if (charCode >= 65 && charCode <= 90) {
                // Letras maiúsculas
                return String.fromCharCode(((charCode - 65 - passo + 26) % 26) + 65);
            } else if (charCode >= 97 && charCode <= 122) {
                // Letras minúsculas
                return String.fromCharCode(((charCode - 97 - passo + 26) % 26) + 97);
            }
            return char;
        }).join("");
    }

    async function gerarHash(mensagem: string): Promise<string> {
        const encoder = new TextEncoder();
        const data = encoder.encode(mensagem);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
    }

    const handleDecode = async (e: React.FormEvent) => {
        e.preventDefault();
        setErro("");
        setMensagemDecodificada("");
        const mensagem = (document.getElementById("mensagem") as HTMLInputElement).value;
        const hashInformado = (document.getElementById("hash") as HTMLInputElement).value;

        if (!mensagem || !hashInformado) {
            setErro("Preencha todos os campos");
            return;
        }

        const hashGerado = await gerarHash(mensagem);

        if (hashGerado === hashInformado) {
            const decodificada = caesarDecipher(mensagem, passo);
            setMensagemDecodificada(decodificada);
        } else {
            setErro("Hash não confere com a mensagem informada.");
        }
    };

    useEffect(() => {
        async function fetchHashes() {
            const res = await axios.get("http://localhost:4000/api/mensagens");
            setHashes(res.data);
        }
        fetchHashes();
    }, []);


    return (
        <div>
            <Header />
            {bearerToken}
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
            
            <h1 className="text-3xl font-bold mb-4">Cifra de César</h1>
            <p className="text-lg">Insira uma mensagem para ser decodificada em cifra de César e ao hash correspondente</p>

            <form className="bg-gray-800 p-6 rounded shadow-md w-96 mt-4" onSubmit={handleDecode}>
                <div className="mb-4">
                    <label htmlFor="mensagem" className="block text-white mb-2">Mensagem:</label>
                    <input type="text" id="mensagem" className="border border-gray-300 p-2 rounded w-full" />
                    <label htmlFor="hash" className="block text-white mb-2">Hash:</label>
                    <input type="text" id="hash" className="border border-gray-300 p-2 rounded w-full" />
                </div>
                
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Decodificar
                </button>
                
                
                
            </form>

            {erro && <div className="text-red-500 mt-2">{erro}</div>}
            {mensagemDecodificada && (
                <div className="bg-green-700 text-white p-4 rounded mt-4 w-96">
                    <strong>Mensagem decodificada:</strong> {mensagemDecodificada}
                </div>
            )}



            <div className="mt-4 flex gap-5 items-center">
                <button onClick={e => { e.preventDefault(); router.push("/pages/encode"); }} className="mt-6 bg-blue-500 text-white px-4 py-2 rounded">
                    Codificar
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

export default Decode;