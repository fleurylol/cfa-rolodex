import { contactSchema } from "@/app/contactSchema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const validation = contactSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });
  const contact = await prisma.contact.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!contact)
    return NextResponse.json({ error: "Invaild contact" }, { status: 404 });
  const updatedContact = await prisma.contact.update({
    where: { id: contact.id },
    data: {
      name: body.name,
      business: body.business,
      address: body.address,
      phone: body.phone,
      email: body.email,
      notes: body.notes,
    },
  });
  return NextResponse.json(updatedContact);
}
