import authOptions from "@/app/auth/authOptions";
import { patchContactSchema } from "@/app/contactSchema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  const body = await request.json();
  const validation = patchContactSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });
  const { name, businessName, address, phone, email, image } = body;
  const contact = await prisma.contact.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!contact)
    return NextResponse.json({ error: "Invaild contact" }, { status: 404 });
  if (body.image) {
  }
  const updatedContact = await prisma.contact.update({
    where: { id: contact.id },
    data: {
      name,
      businessName,
      address,
      phone,
      email,
      image,
    },
  });

  return NextResponse.json(updatedContact);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  const contact = await prisma.contact.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!contact)
    return NextResponse.json({ error: "Invaild contact" }, { status: 404 });

  await prisma.contact.delete({
    where: { id: contact.id },
  });
  return NextResponse.json({});
}
