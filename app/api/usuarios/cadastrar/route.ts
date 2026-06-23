import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
   
    const body = await req.json();
    const { nome, email, senha } = body;
    const senhaHash = await bcrypt.hash(senha, 10);
    
    const { data, error } = await supabase
      .from("usuarios")
      .insert([
        {
          nome,
          email,
          senha: senhaHash,
        },
      ])
      .select();

    if (error) {
      return NextResponse.json(
        {
          error: error.message,
          details: error,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        usuario: data,
      },
      {
        status: 201,
      }
    );

  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
        stack: error.stack,
      },
      {
        status: 500,
      }
    );
  }
}