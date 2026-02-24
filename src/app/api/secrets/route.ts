import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createSecretSchema } from "@/lib/validations/secret";
import { headers } from "next/headers";
import { SecretType } from "@/types";

// GET - Obtener secretos con filtros y paginación
export async function GET(request: NextRequest) {
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

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") ?? "";
    const type = searchParams.get("type") ?? "all";
    const favorite = searchParams.get("favorite");
    const orderBy = searchParams.get("orderBy") ?? "createdAt";
    const order = searchParams.get("order") ?? "desc";
    const page = parseInt(searchParams.get("page") ?? "1");
    const perPage = parseInt(searchParams.get("perPage") ?? "6");

    const where = {
      userId: session.user.id,
      ...(search && {
        OR: [
          { title: { contains: search, mode: "insensitive" as const } },
          { secret: { contains: search, mode: "insensitive" as const } },
        ],
      }),
      ...(type !== "all" && { type: type as SecretType }),
      ...(favorite !== null &&
        favorite !== "" && { favorite: favorite === "true" }),
    };

    const [secrets, total] = await Promise.all([
      prisma.secret.findMany({
        where,
        orderBy: { [orderBy]: order },
        skip: (page - 1) * perPage,
        take: perPage,
      }),
      prisma.secret.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: secrets,
      meta: {
        total,
        page,
        perPage,
        totalPages: Math.ceil(total / perPage),
      },
    });
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { success: false, error: "Error del servidor" },
      { status: 500 },
    );
  }
}

// POST - Crear secreto
export async function POST(request: NextRequest) {
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

    const body = await request.json();
    const parsed = createSecretSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const secret = await prisma.secret.create({
      data: {
        ...parsed.data,
        userId: session.user.id,
      },
    });

    return NextResponse.json({ success: true, data: secret }, { status: 201 });
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { success: false, error: "Error del servidor" },
      { status: 500 },
    );
  }
}
