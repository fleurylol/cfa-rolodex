import authOptions from "@/app/auth/authOptions";
import { commentSchema } from "@/app/comments/commentSchema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
