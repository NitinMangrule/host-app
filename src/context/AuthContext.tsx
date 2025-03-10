import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  role?: string;
}

const AuthContext = createContext<{
  user: User | null;
  login: (role: User) => void;
  logout: () => void;
  isAdmin: boolean;
}>({
  user: null,
  login: () => {},
  logout: () => {},
  isAdmin: false,
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const navigate = useNavigate();

  const login = (role: any) => {
    const token = btoa(JSON.stringify({ role }));
    localStorage.setItem("token", token);
    setUser({ role });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  // Check for saved token on initial load
  useState(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const { role } = JSON.parse(atob(token));
      setUser({ role });
    }
  });

  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
