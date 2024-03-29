"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import API from "../../services/API";
import General from "../../styles/General.module.css";

export default function Login() {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [loginStatus, setLoginStatus] = useState(undefined);
  const router = useRouter();

  const showLoginStatus = () => {
    if (loginStatus === undefined) return null;
    if (loginStatus === true) router.push("/");
    return (
      <span className={`text-${loginStatus.type}`}>{loginStatus.msg}</span>
    );
  };

  const doLogin = () => {
    localStorage.removeItem("jwt");
    API.post("/login/", {
      name: usernameRef.current.value,
      password: passwordRef.current.value,
    })
      .then((res) => {
        if ("response" in res && res.response.status !== 200) {
          setLoginStatus({ type: "danger", msg: "Usuário ou senha inválidos" });
          return;
        }
        setLoginStatus(true);
        localStorage.setItem("jwt", res.data.jwt);
      })
      .catch((err) => {
        console.log(err);
        setLoginStatus({ type: "danger", msg: "Usuário ou senha inválidos" });
      });
  };

  return (
    <div className={General.content_container}>
      <h3>Entrar</h3>
      {showLoginStatus()}
      <div className="">
        <input
          ref={usernameRef}
          type="text"
          autoComplete="off"
          className="form-control mt-1"
          placeholder="Nome"
        />
        <input
          ref={passwordRef}
          type="password"
          autoComplete="off"
          className="form-control mt-1"
          placeholder="Senha"
        />
        <button className="btn btn-success mt-2 w-100" onClick={doLogin}>
          Entrar
        </button>
      </div>
    </div>
  );
}
