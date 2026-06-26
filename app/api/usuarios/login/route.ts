import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, senha } = await req.json();

    if (!email || !senha) {
      return NextResponse.json(
        { error: "Informe email e senha" },
        { status: 400 },
      );
    }

    const { data: usuario, error } = await supabase
      .from("usuarios")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !usuario) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 },
      );
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return NextResponse.json({ error: "Senha incorreta" }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
