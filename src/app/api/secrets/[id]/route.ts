import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { updateSecretSchema } from "@/lib/validations/secret";
import { headers } from "next/headers";

// PATCH - Editar secreto
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json(
        { success: false, error: "No autorizado" },
        { status: 401 },
      );
    }

    const { id } = await params;
    const body = await request.json();
    const parsed = updateSecretSchema.safeParse({ ...body, id });

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.flatten() },
        { status: 400 },
      );
    }

    // Verificar que el secreto pertenece al usuario
    const existing = await prisma.secret.findFirst({
      where: { id, userId: session.user.id },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Secreto no encontrado" },
        { status: 404 },
      );
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: _id, ...data } = parsed.data;

    const secret = await prisma.secret.update({
      where: { id },
      data,
    });

    return NextResponse.json({ success: true, data: secret });
  } catch {
    return NextResponse.json(
      { success: false, error: "Error del servidor" },
      { status: 500 },
    );
  }
}

// DELETE - Eliminar secreto
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json(
        { success: false, error: "No autorizado" },
        { status: 401 },
      );
    }

    const { id } = await params;

    // Verificar que el secreto pertenece al usuario
    const existing = await prisma.secret.findFirst({
      where: { id, userId: session.user.id },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Secreto no encontrado" },
        { status: 404 },
      );
    }

    await prisma.secret.delete({ where: { id } });

    return NextResponse.json({ success: true, data: null });
  } catch {
    return NextResponse.json(
      { success: false, error: "Error del servidor" },
      { status: 500 },
    );
  }
}
