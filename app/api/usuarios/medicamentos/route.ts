import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {

    const body = await req.json();

    const {
      usuario_id,
      nome,
      tipo,
      dosagem,
      unidade,
      quantidade_uso,
      frequencia,
      horario,
      data_inicio,
      data_fim,
      uso_continuo,
      estoque,
      observacao,
      lembrete
    } = body;

    if (
      !usuario_id ||
      !nome ||
      !tipo ||
      !dosagem ||
      !unidade ||
      !quantidade_uso ||
      !frequencia ||
      !horario ||
      !data_inicio
    ) {
      return NextResponse.json(
        {
          error: "Preencha todos os campos obrigatórios"
        },
        {
          status: 400
        }
      );
    }

    const { data, error } = await supabase
      .from("medicamentos")
      .insert([
        {
          usuario_id,
          nome,
          tipo,
          dosagem,
          unidade,
          quantidade_uso,
          frequencia,
          horario,
          data_inicio,
          data_fim,
          uso_continuo,
          estoque,
          observacao,
          lembrete
        }
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        {
          error: error.message
        },
        {
          status: 500
        }
      );
    }

    return NextResponse.json({
      success: true,
      medicamento: data
    });

  } catch (error: any) {

    return NextResponse.json(
      {
        error: error.message
      },
      {
        status: 500
      }
    );

  }
}