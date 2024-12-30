import { useContext, createContext, ReactNode, FC, useState } from "react";
import { IUserCredentials, IUserDetails } from "../interface/shared";
import { useNavigate } from "react-router-dom";
import api from "../config/api";

interface AuthContextType {
  user:  IUserDetails | null;
  token: string;
  role: string;
  loginAction: (data: IUserCredentials) => void;
  registerAction: (data: IUserCredentials) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUserDetails | null>(null)

  const localStorageToken = localStorage.getItem("site") || ""
  const [token, setToken] = useState<string>(localStorageToken)

  const localStorageRole = localStorage.getItem("role") || ""
  const [role, setRole] = useState<string>(localStorageRole)

  const localStorageEmail = localStorage.getItem("email") || ""
  const [email, setEmail] = useState<string>(localStorageEmail)

  const navigate = useNavigate()

  const loginAction = async (data: IUserCredentials) => {
    try {
      const response = await api.post("/api/auth/login", data);

      if(response.data) {
        setUser(response.data.user);
        setToken(response.data.token);
        setRole(response.data.user.role);
        setEmail(response.data.user.email);
        localStorage.setItem("site", response.data.token);
        localStorage.setItem("role", response.data.user.role);
        localStorage.setItem("email", response.data.user.email);
        navigate("/dashboard");
        return;
      }
      throw new Error(response.data.message);
    } catch (err) {
      console.error(err);
    }
  }

  const registerAction = async (data: IUserCredentials) => {
    try {

      const response = await api.post("/api/auth/register", data);

      if(response.data) {
        navigate("/");
        return;
      }
      throw new Error(response.data.message);
    } catch (err) {
      console.error(err);
    }
  }

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    navigate("/");
  };

  const value = { token, role, email, user, loginAction, logout, registerAction }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
