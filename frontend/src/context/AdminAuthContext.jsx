import { createContext, useContext, useState } from "react";
import api from "../services/api";

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("lofa_admin_token"));

  const login = async (email, password) => {
    const { data } = await api.post("/auth/admin-login", { email, password });
    localStorage.setItem("lofa_admin_token", data.token);
    setToken(data.token);
  };

  const logout = () => {
    localStorage.removeItem("lofa_admin_token");
    setToken(null);
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthed: !!token, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export const useAdminAuth = () => useContext(AdminAuthContext);
