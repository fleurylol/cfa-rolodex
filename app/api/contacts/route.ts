import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { contactSchema } from "../../contactSchema";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = contactSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });
  const newContact = await prisma.contact.create({
    data: {
      name: body.name,
      email: body.email,
      phone: body.phone,
      address: body.address,
      business: body.business,
      notes: body.notes,
    },
  });
  return NextResponse.json(newContact, { status: 201 });
}
