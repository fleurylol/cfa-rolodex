import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // const session = await getServerSession(authOptions);
  // if (!session) return NextResponse.json({}, { status: 401 });
  const contact = await prisma.contact.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!contact)
    return NextResponse.json({ error: "Invaild contact" }, { status: 404 });
  const comments = await prisma.comment.findMany({
    where: {
      contactId: contact.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return NextResponse.json(comments);
}
