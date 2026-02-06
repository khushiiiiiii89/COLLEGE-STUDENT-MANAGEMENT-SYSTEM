import api from "../services/api";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    alert("Login Success");
  };

  return (
    <>
      <input onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={login}>Login</button>
    </>
  );
}
