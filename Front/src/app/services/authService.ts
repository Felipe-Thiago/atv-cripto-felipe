/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

// const apiUrl = "https://server-m6e345y6a-felipe-thiagos-projects.vercel.app/api/logins"
    const apiUrl = "http://localhost:4000/api/logins"

interface dadosLogin {
    email: string;
    senha: string;
}

interface dadosRegistro {
    email: string;
    senha: string;
}

class AuthService {
    async login(dados: dadosLogin){
        try{
            const response = await axios.post(apiUrl, dados);
            return response.data;
        } catch(error){
            console.error("Erro ao fazer login: ", error);
            throw error;
        }
    }

    async register(dados: dadosRegistro){
        try{
            const response = await axios.post(`${apiUrl}/cadastro`, dados);
            return response.data;
        } catch(error){
            console.error("Erro ao registrar: ", error);
            throw error;
        }
    }
}

export default new AuthService();
