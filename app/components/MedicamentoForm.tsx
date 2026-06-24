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

        <select id="tipo" class="swal2-select">
          <option value="">Tipo do medicamento</option>
          <option>Comprimido</option>
          <option>Cápsula</option>
          <option>Xarope</option>
          <option>Gotas</option>
          <option>Pomada</option>
          <option>Injeção</option>
        </select>

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

        <input 
          id="quantidadeUso" 
          class="swal2-input" 
          placeholder="Quantidade por uso"
        />

      </div>

      <div class="med-section">

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
          Horário principal
        </label>

        <input 
          id="horario" 
          type="time" 
          class="swal2-input" 
        />

      </div>

      <div class="med-section">

        <div class="label-group">
          <label>Início</label>

          <input 
            id="inicio" 
            type="date" 
            class="swal2-input" 
          />
        </div>

        <div class="label-group">
          <label>Fim</label>

          <input 
            id="fim" 
            type="date" 
            class="swal2-input" 
          />
        </div>

      </div>

      <label class="med-checkbox">
        <span>Uso contínuo</span>

        <div class="switch">
          <input type="checkbox" id="usoContinuo" />

          <span class="slider"></span>
        </div>
      </label>

      <div class="med-section">

        <input 
          id="estoque" 
          type="number"
          class="swal2-input" 
          placeholder="Quantidade disponível"
        />

      </div>

      <div class="med-section">

        <textarea
          id="observacao"
          class="swal2-textarea"
          placeholder="Observações (ex: tomar após refeições)"
        ></textarea>

      </div>

      <label class="med-checkbox">
        <span>Ativar lembrete</span>

        <div class="switch">
          <input type="checkbox" id="lembrete" />

          <span class="slider"></span>
        </div>
      </label>

    </div>
  `;
}