"use client";
import Cookies from 'js-cookie';
import React, { createContext, useContext, useEffect, useState } from 'react';

//contexto de autenticação
const AuthContext = createContext({
    bearerToken: '',
    login: (username: string, password: string) => {},
    logout: () => {},
});

interface AuthProviderProps {
    children: React.ReactNode;
}

//provider de autenticação
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [bearerToken, setBearerToken] = useState<string>('');

    useEffect(() => {
        setBearerToken(Cookies.get("token") || "");
        //resgata o token do cookie quando atualizar a página
    }, []);

    const login = (username: string, password: string) => { //quando logar, setar token no cookie
        const token = "bearer token";
        setBearerToken(token);

        Cookies.set("token", token);
    };

    const logout = () => { //quando deslogar, remove token no cookie
        Cookies.remove("token");
        setBearerToken("");
    }

    return ( //uso do autenticador
        <AuthContext.Provider value ={{ bearerToken, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);


