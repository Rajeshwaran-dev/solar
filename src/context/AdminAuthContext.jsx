import { createContext, useContext, useState } from "react";

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("sol_admin_auth") === "true";
  });

  const login = (email, password) => {
    // Mock credentials check
    if (email === "admin@solgreen.in" && password === "admin123") {
      localStorage.setItem("sol_admin_auth", "true");
      setIsAuthenticated(true);
      return { success: true };
    }
    return { success: false, error: "Invalid email or password. Use demo credentials." };
  };

  const logout = () => {
    localStorage.removeItem("sol_admin_auth");
    setIsAuthenticated(false);
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  }
  return context;
}
