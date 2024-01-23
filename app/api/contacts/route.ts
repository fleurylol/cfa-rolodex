import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string(),
  address: z.string(),
  business: z.string(),
  notes: z.string(),
});

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
