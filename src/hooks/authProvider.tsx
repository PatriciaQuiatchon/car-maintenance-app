import { useContext, createContext, ReactNode, FC, useState } from "react";
import { IUserCredentials, IUserDetails } from "../interface/shared";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  user:  IUserDetails | null;
  token: string;
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

  const navigate = useNavigate()

  const loginAction = async (data: IUserCredentials) => {
    try {
      const response = await fetch("", {
        method: "POST",
        headers:  {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })

      const res = await response.json();

      if(res.data) {
        setUser(res.data.user);
        setToken(res.token);
        localStorage.setItem("site", res.token);
        navigate("/dashboard");
        return;
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
    }
  }

  const registerAction = async (data: IUserCredentials) => {
    try {
      const response = await fetch("", {
        method: "POST",
        headers:  {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })

      const res = await response.json();

      if(res.data) {
        setUser(res.data.user);
        setToken(res.token);
        localStorage.setItem("site", res.token);
        navigate("/dashboard");
        return;
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
    }
  }

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    navigate("/login");
  };

  const value = { token, user, loginAction, logout, registerAction }

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
