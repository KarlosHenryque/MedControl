import "../style/MedicamentoForm.css";

export function MedicamentoForm() {
  return `
    <div class="med-form">

      <h2 class="med-title">
        Novo medicamento
      </h2>

      <div class="med-section">

        <input 
          id="nome" 
          class="swal2-input" 
          placeholder="Nome do medicamento"
        />

        <div class="form-row">

          <input 
            id="dosagem" 
            class="swal2-input" 
            placeholder="Dosagem"
          />

          <select id="unidade" class="swal2-select">
            <option value="">Unidade</option>
            <option>mg</option>
            <option>ml</option>
            <option>gotas</option>
            <option>comprimido</option>
          </select>

        </div>

        <select id="frequencia" class="swal2-select">
          <option value="">Frequência</option>
          <option>1x ao dia</option>
          <option>2x ao dia</option>
          <option>3x ao dia</option>
          <option>A cada 6 horas</option>
          <option>A cada 8 horas</option>
          <option>A cada 12 horas</option>
        </select>

        <label class="med-label">
          Horário
        </label>

        <input 
          id="horario" 
          type="time" 
          class="swal2-input" 
        />

      </div>

      <label class="med-checkbox">
        <span>Ativar lembrete</span>

        <div class="switch">
          <input type="checkbox" id="lembrete" checked />

          <span class="slider"></span>
        </div>
      </label>

    </div>
  `;
}