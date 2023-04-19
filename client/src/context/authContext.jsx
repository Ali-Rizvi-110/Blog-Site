import { Children, createContext, useEffect, useState } from "react";
import React from "react";
import axios from "axios";

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
    
    const login = async(inputs) => {
        const res = await axios.post("/api/auth/login", inputs);
        setCurrentUser(res.data);
    }
    const logout = async(inputs) => {
        console.log("i logout", inputs);
        // await axios.post("http://localhost:8800/auth/temp");
        await axios.post("/api/auth/logout");
        setCurrentUser(null);
    }

    useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser])

    return (
        <AuthContext.Provider value = {{currentUser, login, logout}} >
            {children}
        </AuthContext.Provider>
    );

}