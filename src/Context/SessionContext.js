"use client";
import { createContext, useState, useEffect, useContext } from 'react';
import { useUser } from "@/Context/UserContext";
import axios from 'axios';

const SessionContext = createContext();

export function SessionProvider({ children }) {
    const [ session, setSession ] = useState(null);
    const [ sessionInfo, setSessionInfo ] = useState(null);
    const [loading, setLoading] = useState(false);
    const { token } = useUser();

    const fetchSessionInfo = async () => {
        setLoading(true);

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/sessions`,
            {},
            {
                headers: {
                    Authorization: token,
                },
            });

            const sessionData = response.data.data;
            setSessionInfo(sessionData);
            setSession(sessionData?.id);
            localStorage.setItem('session', sessionData?.id);
            console.log("session info:", sessionData);
        } catch (err) {
            console.error("Session fetch error:", err.message);
            setSessionInfo(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SessionContext.Provider value={{
            session,
            sessionInfo,
            loading,
            fetchSessionInfo
        }}
        >
        {children}
        </SessionContext.Provider>
    );
}

export function useSession() {
    return useContext(SessionContext);
}