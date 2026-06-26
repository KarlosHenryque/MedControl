import "../style/MedicamentoForm.css";

interface MedicamentoFormProps {
  nome?: string;
  dosagem?: string;
  unidade?: string;
  frequencia?: string;
  horario?: string;
  lembrete?: boolean;
}

export function MedicamentoForm({
  nome = "",
  dosagem = "",
  unidade = "",
  frequencia = "",
  horario = "",
  lembrete = true,
}: MedicamentoFormProps = {}) {
  return `
    <div class="med-form">

      <div class="med-section">

        <input 
          id="nome" 
          class="swal2-input" 
          placeholder="Nome do medicamento"
          value="${nome}"
        />

        <div class="form-row">

          <input 
            id="dosagem" 
            class="swal2-input" 
            placeholder="Dosagem"
            value="${dosagem}"
          />

          <select id="unidade" class="swal2-select">

            <option value="">Unidade</option>

            <option value="mg"
              ${unidade === "mg" ? "selected" : ""}
            >
              mg
            </option>

            <option value="ml"
              ${unidade === "ml" ? "selected" : ""}
            >
              ml
            </option>

            <option value="gotas"
              ${unidade === "gotas" ? "selected" : ""}
            >
              gotas
            </option>

          </select>

        </div>

        <select id="frequencia" class="swal2-select">

          <option value="">Frequência</option>

          <option value="1x ao dia"
            ${frequencia === "1x ao dia" ? "selected" : ""}
          >
            1x ao dia
          </option>

          <option value="2x ao dia"
            ${frequencia === "2x ao dia" ? "selected" : ""}
          >
            2x ao dia
          </option>

          <option value="3x ao dia"
            ${frequencia === "3x ao dia" ? "selected" : ""}
          >
            3x ao dia
          </option>

          <option value="4x ao dia"
            ${frequencia === "4x ao dia" ? "selected" : ""}
          >
            4x ao dia
          </option>

          <option value="De hora em hora"
            ${frequencia === "De hora em hora" ? "selected" : ""}
          >
            De hora em hora
          </option>

          <option value="A cada 2 horas"
            ${frequencia === "A cada 2 horas" ? "selected" : ""}
          >
            A cada 2 horas
          </option>

          <option value="A cada 4 horas"
            ${frequencia === "A cada 4 horas" ? "selected" : ""}
          >
            A cada 4 horas
          </option>

          <option value="A cada 6 horas"
            ${frequencia === "A cada 6 horas" ? "selected" : ""}
          >
            A cada 6 horas
          </option>

          <option value="A cada 8 horas"
            ${frequencia === "A cada 8 horas" ? "selected" : ""}
          >
            A cada 8 horas
          </option>

          <option value="A cada 12 horas"
            ${frequencia === "A cada 12 horas" ? "selected" : ""}
          >
            A cada 12 horas
          </option>

        </select>

        <input 
          id="horario" 
          type="time" 
          class="swal2-input"
          value="${horario}"
        />

      </div>

      <label class="med-checkbox">

        <span>Ativar lembrete</span>

        <div class="switch">

          <input
            type="checkbox"
            id="lembrete"
            ${lembrete ? "checked" : ""}
          />

          <span class="slider"></span>

        </div>

      </label>

    </div>
  `;
}
