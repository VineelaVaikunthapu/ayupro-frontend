"use client";

import { createContext, useContext, useEffect, useState } from "react";

type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
};

type AuthContextValue = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = "ayupro_user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // On first load, check if we already have a logged-in user saved from
  // a previous visit.
  // TODO: replace this with a real session/JWT check against the backend
  // once proper session handling is implemented. Storing the user in
  // localStorage like this is only safe because we're storing non-secret
  // profile info (id, email, name) — never the password or password hash.
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  function login(newUser: User) {
    setUser(newUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
  }

  function logout() {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }
  return context;
}