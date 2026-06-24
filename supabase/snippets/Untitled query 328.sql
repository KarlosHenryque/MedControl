CREATE TABLE medicamentos (
id SERIAL PRIMARY KEY,

usuario_id INT NOT NULL,

nome VARCHAR(150) NOT NULL,

tipo VARCHAR(50) NOT NULL,

dosagem VARCHAR(50) NOT NULL,

unidade VARCHAR(30) NOT NULL,

quantidade_uso VARCHAR(50) NOT NULL,

frequencia VARCHAR(50) NOT NULL,

horario TIME NOT NULL,

data_inicio DATE NOT NULL,

data_fim DATE,

uso_continuo BOOLEAN DEFAULT FALSE,

estoque INT DEFAULT 0,

observacao TEXT,

lembrete BOOLEAN DEFAULT TRUE,

criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

CONSTRAINT fk_usuario
    FOREIGN KEY (usuario_id)
    REFERENCES usuarios(id)
    ON DELETE CASCADE


);

ALTER TABLE medicamentos DISABLE ROW LEVEL SECURITY;

GRANT ALL ON TABLE medicamentos TO anon;
GRANT ALL ON TABLE medicamentos TO authenticated;

GRANT USAGE, SELECT ON SEQUENCE medicamentos_id_seq TO anon;
GRANT USAGE, SELECT ON SEQUENCE medicamentos_id_seq TO authenticated;

CREATE TABLE historico_medicamentos (
id SERIAL PRIMARY KEY,

medicamento_id INT NOT NULL,

data_hora TIMESTAMP NOT NULL,

status VARCHAR(20) DEFAULT 'tomado',

observacao TEXT,

criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

CONSTRAINT fk_medicamento
    FOREIGN KEY (medicamento_id)
    REFERENCES medicamentos(id)
    ON DELETE CASCADE


);

ALTER TABLE historico_medicamentos DISABLE ROW LEVEL SECURITY;

GRANT ALL ON TABLE historico_medicamentos TO anon;
GRANT ALL ON TABLE historico_medicamentos TO authenticated;

GRANT USAGE, SELECT ON SEQUENCE historico_medicamentos_id_seq TO anon;
GRANT USAGE, SELECT ON SEQUENCE historico_medicamentos_id_seq TO authenticated;
