import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const business = await prisma.business.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!business)
    return NextResponse.json({ error: "Invaild business" }, { status: 404 });
  const contact = await prisma.contact.findMany({
    where: {
      businessId: business.id,
    },
  });
  return NextResponse.json(contact);
}
