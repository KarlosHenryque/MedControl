"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";
import "../style/CadastroForm.css";

export function CadastroForm() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  async function handleCadastro(e: React.FormEvent) {
    e.preventDefault();

    if (!nome.trim()) {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Informe o nome",
      });
      return;
    }

    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: "error",
        title: "E-mail inválido",
        text: "Digite um e-mail válido (ex: exemplo@email.com)",
      });
      return;
    }

    if (senha !== confirmarSenha) {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "As senhas não conferem",
      });
      return;
    }

    if (senha.length < 6) {
      Swal.fire({
        icon: "error",
        title: "Senha fraca",
        text: "A senha deve ter pelo menos 6 caracteres",
      });
      return;
    }

    Swal.fire({
      title: "Cadastrando...",
      text: "Aguarde um momento",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await fetch("/api/usuarios/cadastrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          email,
          senha,
        }),
      });

      const data = await response.json();

      Swal.close();

      if (!response.ok) {
        Swal.fire({
          icon: "error",
          title: "Erro ao cadastrar",
          text: data.error || "Tente novamente",
        });
        return;
      }

      await Swal.fire({
        icon: "success",
        title: "Sucesso!",
        text: "Usuário cadastrado com sucesso",
        confirmButtonColor: "#0077ff",
      });

      router.push("/");
    } catch (error) {
      Swal.close();

      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Erro de conexão com o servidor",
      });
    }
  }

  return (
    <main className="cadastro-container">
      <div className="cadastro-card">
        <h1>MedControl</h1>
        <h3>Seu tratamento no horário certo</h3>

        <form className="cadastro-form" onSubmit={handleCadastro}>
          <input
            type="text"
            placeholder="Nome*"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

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

          <input
            type="password"
            placeholder="Confirmar senha*"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
          />

          <button type="submit">Cadastrar</button>

          <div className="cadastro-link">
            <a href="/">Voltar</a>
          </div>
        </form>
      </div>
    </main>
  );
}
