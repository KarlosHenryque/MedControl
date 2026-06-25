import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const usuario_id = searchParams.get("usuario_id");

    const { data, error } = await supabase
      .from("medicamentos")
      .select("*")
      .eq("usuario_id", usuario_id);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      medicamentos: data,
    });

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      usuario_id,
      nome,
      dosagem,
      unidade,
      frequencia,
      horario,
      lembrete,
    } = body;

    const { data, error } = await supabase
      .from("medicamentos")
      .insert([
        {
          usuario_id,
          nome,
          dosagem,
          unidade,
          frequencia,
          horario,
          lembrete,
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      medicamento: data,
    });

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}