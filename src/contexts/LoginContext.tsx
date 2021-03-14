import { createContext, useState } from "react";

interface dataTypes {
  getLogin(username: string, password: string): void;
  isLogged: boolean;
  isFail: boolean;
  setIsLogged(param: boolean): void;
  user: string;
  setUser(param: string): void;
}

export const LoginContext = createContext({} as dataTypes);

export function LoginProvider({ children }) {
  const [isLogged, setIsLogged] = useState(false);
  const [isFail, setIsFail] = useState(false);
  const [user, setUser] = useState("");

  async function getLogin(username: string, password: string) {
    const response = await fetch("/api/users", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (data.login === "Ok") {
      setIsLogged(true);
      console.log(data.user);
      setUser(data.user);
    } else {
      setIsFail(true);
    }
  }

  return (
    <LoginContext.Provider
      value={{ getLogin, isLogged, isFail, setIsLogged, user, setUser }}
    >
      {children}
    </LoginContext.Provider>
  );
}
