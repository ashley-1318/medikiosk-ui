import { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

export type UserRole = "patient" | "doctor" | "admin";

interface AuthContextType {
  role: UserRole | null;
  isAuthenticated: boolean;
  login: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  role: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole | null>(() => {
    return (localStorage.getItem("medikiosk-role") as UserRole) || null;
  });

  const login = (selectedRole: UserRole) => {
    setRole(selectedRole);
    localStorage.setItem("medikiosk-role", selectedRole);
  };

  const logout = () => {
    setRole(null);
    localStorage.removeItem("medikiosk-role");
  };

  return (
    <AuthContext.Provider value={{ role, isAuthenticated: !!role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
