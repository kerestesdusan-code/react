import React, { createContext, useContext, useEffect, useMemo, useState} from "react";

export type LoggedUser = {
    id: string;
    email: string;
    fullName: string | null;
    groupId: number;
};

type AuthState = {
    token: string | null;
    user: LoggedUser | null;
    isLoggedIn: boolean;
    setAuth: (token: string, user: LoggedUser) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthState | undefined>(undefined);

const TOKEN_KEY = "token";
const USER_KEY = "user";

function readUserFromStorage(): LoggedUser | null {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    try {
        return JSON.parse(raw) as LoggedUser;
    } catch {
        return null;
    }
}

export const AuthProvider: React.FC<{children : React.ReactNode}> = ({ children }) => {
    const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));
    const [ user, setUser] = useState<LoggedUser | null>(() => readUserFromStorage());

    const setAuth = (newToken: string, newUser: LoggedUser) => {
        localStorage.setItem(TOKEN_KEY, newToken);
        localStorage.setItem(USER_KEY, JSON.stringify(newUser));
        setToken(newToken);
        setUser(newUser);
    };

    const logout = () => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        setToken(null);
        setUser(null);
    };

    useEffect(() => {
        const onStorage = () => {
            setToken(localStorage.getItem(TOKEN_KEY));
            setUser(readUserFromStorage());
        };
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, []);

    const value = useMemo<AuthState>(() => {
        const isLoggedIn = !!token && !!user;
        return { token, user, isLoggedIn, setAuth, logout };
    }, [token, user]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthState => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
};