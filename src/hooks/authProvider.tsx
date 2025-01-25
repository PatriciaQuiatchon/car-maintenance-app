import { useContext, createContext, ReactNode, FC, useState } from "react";
import { IUserCredentials, IUserDetails } from "../interface/shared";
import { useNavigate } from "react-router-dom";
import api from "../config/api";
import handleError from "../components/error";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

interface AuthContextType {
  user:  IUserDetails | null;
  token: string;
  role: string;
  isSubmitting: boolean;
  loginAction: (data: IUserCredentials) => void;
  registerAction: (data: IUserCredentials) => void;
  getUserProfile: () => void;
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

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const navigate = useNavigate()

  const getUserProfile = async () => {
    try {
      if(!user) {
        const response = await api.get(`/api/user/email/${email}`)
        if(response.data) {
          setUser({...response.data});
        }
      }
    } catch (error) {
        handleError(error as AxiosError)
    }
  }

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
        localStorage.setItem("is_verified", response.data.user.is_verified);
        navigate("/dashboard");
        return;
      }
      throw new Error(response.data.message);
    } catch (error) {
      handleError(error as AxiosError); 
    }
  }

  const registerAction = async (data: IUserCredentials) => {
    try {
      setIsSubmitting(true)
      const response = await api.post("/api/auth/register", data);

      if(response.data) {
        toast.success("Registered Successfully")
        navigate("/");
        return;
      }
      throw new Error(response.data.message);
    } catch (err) {
      handleError(err as AxiosError); 
    } finally {
      setIsSubmitting(false)
    }
  }

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    localStorage.removeItem("is_verified");
    navigate("/");
  };

  const value = { token, role, email, user, isSubmitting, loginAction, logout, registerAction, getUserProfile }

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
