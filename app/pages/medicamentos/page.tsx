"use client";

import Swal from "sweetalert2";

import { MedicamentoForm } from "../../components/MedicamentoForm";

export default function MedicamentosPage() {
  async function handleNovoMedicamento() {
    const { value: formValues } = await Swal.fire({
      title: "Cadastrar medicamento",

      html: MedicamentoForm(),

      focusConfirm: false,
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonText: "Salvar",
      cancelButtonText: "Excluir",

    });

    if (formValues) {
      Swal.fire({
        icon: "success",
        title: "Medicamento cadastrado!",
        text: `${formValues.nome} foi salvo com sucesso.`,
      });

      console.log(formValues);
    }
  }

  return (
    <main className="med-container">
      <header className="med-header">
        <h1>Meus Medicamentos</h1>

        <button onClick={handleNovoMedicamento}>
          + Novo medicamento
        </button>
      </header>
    </main>
  );
}