ALTER TABLE medicamentos DISABLE ROW LEVEL SECURITY;

GRANT ALL ON TABLE medicamentos TO anon;
GRANT ALL ON TABLE medicamentos TO authenticated;

GRANT USAGE, SELECT ON SEQUENCE medicamentos_id_seq TO anon;
GRANT USAGE, SELECT ON SEQUENCE medicamentos_id_seq TO authenticated;