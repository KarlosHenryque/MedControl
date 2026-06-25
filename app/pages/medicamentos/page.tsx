"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {FaClock, FaBell, FaPlus } from "react-icons/fa";
import { MedicamentoForm } from "../../components/MedicamentoForm";
import "../../style/MedicamentoPage.css";

interface Medicamento {
  id: number;
  nome: string;
  dosagem: string;
  unidade: string;
  frequencia: string;
  horario: string;
  lembrete: boolean;
}

export default function MedicamentosPage() {
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
  const [loading, setLoading] = useState(true);

  async function carregarMedicamentos() {
    try {
      const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");

      if (!usuario.id) return;

      const response = await fetch(
        `/api/medicamentos?usuario_id=${usuario.id}`,
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      setMedicamentos(data.medicamentos);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Erro ao carregar medicamentos",
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarMedicamentos();
  }, []);

  async function handleNovoMedicamento() {
    const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");

    const { value: formValues } = await Swal.fire({
      title: "Cadastrar medicamento",

      html: MedicamentoForm(),

      focusConfirm: false,
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonText: "Salvar",
      cancelButtonText: "Cancelar",

      preConfirm: () => {
        return {
          usuario_id: usuario.id,

          nome: (document.getElementById("nome") as HTMLInputElement).value,

          dosagem: (document.getElementById("dosagem") as HTMLInputElement)
            .value,

          unidade: (document.getElementById("unidade") as HTMLSelectElement)
            .value,

          frequencia: (
            document.getElementById("frequencia") as HTMLSelectElement
          ).value,

          horario: (document.getElementById("horario") as HTMLInputElement)
            .value,

          lembrete: (document.getElementById("lembrete") as HTMLInputElement)
            .checked,
        };
      },
    });

    if (!formValues) return;

    try {
      const response = await fetch("/api/medicamentos", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formValues),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      setMedicamentos((prev) => [data.medicamento, ...prev]);

      Swal.fire({
        icon: "success",
        title: "Medicamento cadastrado!",
        text: `${formValues.nome} foi salvo com sucesso.`,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Erro ao cadastrar medicamento",
      });
    }
  }

  return (
    <main className="med-container">
      <header className="med-header">
        <h1>
          Meus Medicamentos
        </h1>

        <button onClick={handleNovoMedicamento}>
          <FaPlus />
          Novo medicamento
        </button>
      </header>

      <section className="med-grid">
        {loading && <p className="med-loading">Carregando medicamentos...</p>}

        {!loading && medicamentos.length === 0 && (
          <p className="med-empty">Nenhum medicamento cadastrado.</p>
        )}

        {medicamentos.map((med) => (
          <div className="med-card" key={med.id}>

            <h2>{med.nome}</h2>

            <p>
              <strong>Dosagem</strong>

              <span>
                {med.dosagem} {med.unidade}
              </span>
            </p>

            <p>
              <strong>Frequência</strong>

              <span>{med.frequencia}</span>
            </p>

            <p>
              <strong>
                <FaClock />
                Horário
              </strong>

              <span>{med.horario}</span>
            </p>

            <div className="badge">
              <FaBell />

              {med.lembrete ? "Lembrete ativo" : "Sem lembrete"}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}