"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";
import "../style/LoginForm.css";
import "../style/EsqueceuSenha.css";

export function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    if (!email || !senha) {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Preencha email e senha",
      });
      return;
    }

    Swal.fire({
      title: "Entrando...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const response = await fetch("/api/usuarios/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      Swal.close();

      if (!response.ok) {
        Swal.fire({
          icon: "error",
          title: "Erro ao entrar",
          text: data.error || "Credenciais inválidas",
        });
        return;
      }

      localStorage.setItem("usuario", JSON.stringify(data.usuario));

      await Swal.fire({
        icon: "success",
        title: "Bem-vindo!",
        text: `Olá, ${data.usuario.nome}`,
        confirmButtonColor: "#0077ff",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });

      router.push("/medicamentos");
    } catch (error) {
      Swal.close();

      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Erro de conexão com o servidor",
      });
    }
  }

  async function handleForgotPassword() {
    const { value: email } = await Swal.fire({
      title: "Recuperar senha",
      input: "email",
      inputLabel: "Digite seu e-mail",
      inputPlaceholder: "seuemail@gmail.com",
      confirmButtonText: "Enviar",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      reverseButtons: true,
      customClass: {
        popup: "custom-popup",
        confirmButton: "custom-confirm",
        cancelButton: "custom-cancel",
      },
      inputValidator: (value) => {
        if (!value) {
          return "Informe um e-mail";
        }
      },
    });

    if (email) {
      Swal.fire({
        icon: "success",
        title: "E-mail enviado!",
        text: "Verifique sua caixa de entrada.",
        confirmButtonText: "OK",
      });
    }
  }

  return (
    <main className="login-container">
      <div className="login-card">
        <h1>MedControl</h1>
        <h3>Seu tratamento no horário certo</h3>

        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="E-mail*"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Senha*"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <button type="submit">Entrar</button>

          <div className="login-link">
            <a type="button" onClick={handleForgotPassword}>
              Esqueceu a senha
            </a>

            <a href="/cadastro">Cadastre-se</a>
          </div>
        </form>
      </div>
    </main>
  );
}