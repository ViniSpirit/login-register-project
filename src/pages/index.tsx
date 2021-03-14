import style from "../styles/Home.module.css";

import Login from "../components/Login";
import Content from "../components/Content";
import Register from "../components/Register";

import { useContext, useState } from "react";
import { LoginContext } from "../contexts/LoginContext";

export default function home() {
  const { isLogged } = useContext(LoginContext);

  const [isRegister, setIsRegister] = useState(true);

  function registerLogin() {
    setIsRegister(!isRegister);
  }

  return (
    <section className={style.containerMain}>
      {!isLogged ? (
        <>
          {isRegister ? (
            <Login registerLogin={registerLogin} />
          ) : (
            <Register registerLogin={registerLogin} />
          )}
        </>
      ) : (
        <Content />
      )}
    </section>
  );
}
