import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { businessSchema } from "../businessSchema";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  const body = await request.json();
  const validation = businessSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });
  const { name, address } = body;
  const business = await prisma.business.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!business)
    return NextResponse.json({ error: "Invalid business" }, { status: 404 });
  const updatedBusiness = await prisma.business.update({
    where: { id: business.id },
    data: {
      name,
      address,
    },
  });
  return NextResponse.json(updatedBusiness);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  const business = await prisma.business.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!business)
    return NextResponse.json({ error: "Invalid business" }, { status: 404 });
  await prisma.business.delete({ where: { id: business.id } });
  return NextResponse.json({ success: true });
}
