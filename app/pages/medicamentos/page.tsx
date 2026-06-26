"use client";

import { useEffect, useState } from "react";

import Swal from "sweetalert2";

import { FaClock, FaBell, FaPlus, FaPen, FaTrash } from "react-icons/fa";

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

  async function abrirModal(medicamento?: Medicamento) {
    const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");

    const editando = !!medicamento;

    const { value: formValues } = await Swal.fire({
      title: editando ? "Editar medicamento" : "Cadastrar medicamento",

      html: MedicamentoForm({
        nome: medicamento?.nome || "",
        dosagem: medicamento?.dosagem || "",
        unidade: medicamento?.unidade || "",
        frequencia: medicamento?.frequencia || "",
        horario: medicamento?.horario || "",
        lembrete: medicamento?.lembrete ?? true,
      }),

      focusConfirm: false,

      showCancelButton: true,

      reverseButtons: true,

      confirmButtonText: editando ? "Salvar alterações" : "Cadastrar",

      cancelButtonText: "Cancelar",

      preConfirm: () => {
        const nome = (document.getElementById("nome") as HTMLInputElement)
          .value;

        const dosagem = (document.getElementById("dosagem") as HTMLInputElement)
          .value;

        const unidade = (
          document.getElementById("unidade") as HTMLSelectElement
        ).value;

        const frequencia = (
          document.getElementById("frequencia") as HTMLSelectElement
        ).value;

        const horario = (document.getElementById("horario") as HTMLInputElement)
          .value;

        const lembrete = (
          document.getElementById("lembrete") as HTMLInputElement
        ).checked;

        if (!nome || !dosagem || !unidade || !frequencia || !horario) {
          Swal.showValidationMessage("Preencha todos os campos");

          return;
        }

        return {
          id: medicamento?.id,

          usuario_id: usuario.id,

          nome,
          dosagem,
          unidade,
          frequencia,
          horario,
          lembrete,
        };
      },
    });

    if (!formValues) return;

    try {
      const response = await fetch("/api/medicamentos", {
        method: editando ? "PUT" : "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formValues),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      if (editando) {
        setMedicamentos((prev) =>
          prev.map((item) =>
            item.id === medicamento.id ? data.medicamento : item,
          ),
        );
      } else {
        setMedicamentos((prev) => [data.medicamento, ...prev]);
      }

      Swal.fire({
        icon: "success",
        title: editando ? "Medicamento atualizado!" : "Medicamento cadastrado!",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Erro ao salvar medicamento",
      });
    }
  }

  async function excluirMedicamento(id: number) {
    const result = await Swal.fire({
      title: "Excluir medicamento?",
      text: "Essa ação não poderá ser desfeita.",

      icon: "warning",

      showCancelButton: true,

      confirmButtonText: "Excluir",

      cancelButtonText: "Cancelar",

      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    try {
      const response = await fetch(`/api/medicamentos?id=${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      setMedicamentos((prev) => prev.filter((med) => med.id !== id));

      Swal.fire({
        icon: "success",
        title: "Medicamento excluído!",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Erro ao excluir medicamento",
      });
    }
  }

  return (
    <main className="med-container">
      <header className="med-header">
        <h1>Meus Medicamentos</h1>

        <button onClick={() => abrirModal()}>
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
            <div className="med-card-top">
              <h2>{med.nome}</h2>

              <div className="med-actions">
                <button className="edit-btn" onClick={() => abrirModal(med)}>
                  <FaPen />
                </button>

                <button
                  className="delete-btn"
                  onClick={() => excluirMedicamento(med.id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>

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
