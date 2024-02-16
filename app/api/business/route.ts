import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { businessSchema } from "./businessSchema";
import prisma from "@/prisma/client";

export async function GET() {
  const businesses = await prisma.business.findMany();
  return NextResponse.json(businesses);
}

export async function POST(resquest: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  const body = await resquest.json();
  const { name, address, userEmail } = body;
  const validation = businessSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });
  const newBusiness = await prisma.business.create({
    data: {
      name,
      address,
      userEmail,
    },
  });
  return NextResponse.json(newBusiness, { status: 201 });
}
