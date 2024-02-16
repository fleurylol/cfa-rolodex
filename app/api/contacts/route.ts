import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { contactSchema } from "../../contactSchema";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  const body = await request.json();
  const { name, email, phone, address, businessName, image, userEmail } = body;
  const validation = contactSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });
  const newContact = await prisma.contact.create({
    data: {
      name: name,
      email: email,
      phone: phone,
      address: address,
      businessName: businessName,
      image: image,
      userEmail: userEmail,
    },
  });
  return NextResponse.json(newContact, { status: 201 });
}
