"use client";

import { useRouter } from "next/navigation";
import "../style/CadastroForm.css";

export function CadastroForm() {
  const router = useRouter();

  function handleCadastro(e: React.FormEvent) {
    e.preventDefault();
    router.push('/medicamentos')
  }

  return (
    <main className="cadastro-container">
      <div className="cadastro-card">
        <h1>MedControl</h1>

        <h3>Seu tratamento no horário certo</h3>

        <form className="cadastro-form" onSubmit={handleCadastro}>
          <input type="text" placeholder="Nome*" />

          <input type="email" placeholder="E-mail*" />

          <input type="password" placeholder="Senha*" />

          <input type="password" placeholder="Confirmar senha*" />

          <button type="submit">Entrar</button>

          <div className="cadastro-link">
            <a href="/">Voltar</a>
          </div>
        </form>
      </div>
    </main>
  );
}