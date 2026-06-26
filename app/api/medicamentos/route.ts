import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const usuario_id = searchParams.get("usuario_id");
    const id = searchParams.get("id");

    if (id) {
      const { data, error } = await supabase
        .from("medicamentos")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({
        medicamento: data,
      });
    }

    if (!usuario_id) {
      return NextResponse.json(
        { error: "usuario_id é obrigatório" },
        { status: 400 },
      );
    }

    const { data, error } = await supabase
      .from("medicamentos")
      .select("*")
      .eq("usuario_id", usuario_id)
      .order("id", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      medicamentos: data,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
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

    if (
      !usuario_id ||
      !nome ||
      !dosagem ||
      !unidade ||
      !frequencia ||
      !horario
    ) {
      return NextResponse.json(
        { error: "Preencha todos os campos" },
        { status: 400 },
      );
    }

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
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      {
        medicamento: data,
      },
      {
        status: 201,
      },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const { id, nome, dosagem, unidade, frequencia, horario, lembrete } = body;

    if (!id) {
      return NextResponse.json({ error: "ID é obrigatório" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("medicamentos")
      .update({
        nome,
        dosagem,
        unidade,
        frequencia,
        horario,
        lembrete,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      medicamento: data,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID é obrigatório" }, { status: 400 });
    }

    const { error } = await supabase.from("medicamentos").delete().eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
