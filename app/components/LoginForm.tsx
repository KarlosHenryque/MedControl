"use client";

import { useRouter } from "next/navigation";
import "../style/LoginForm.css";

export function LoginForm() {
  const router = useRouter();

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    router.push('/medicamentos')
  }

  return (
    <main className="login-container">
      <div className="login-card">
        <h1>MedControl</h1>

        <h3>Seu tratamento no horário certo</h3>

        <form className="login-form" onSubmit={handleLogin}>
          <input type="email" placeholder="E-mail*" />

          <input type="password" placeholder="Senha*" />

          <button type="submit">Entrar</button>

          <div className="login-link">
            <a href="#">Esqueceu a senha</a>

            <a href="/cadastro">Cadastre-se</a>
          </div>
        </form>
      </div>
    </main>
  );
}