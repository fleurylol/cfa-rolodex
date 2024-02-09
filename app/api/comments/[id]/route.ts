import authOptions from "@/app/auth/authOptions";
import { commentSchema } from "@/app/comments/commentSchema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  const comment = await prisma.comment.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!comment)
    return NextResponse.json({ error: "Invaild comment" }, { status: 404 });
  return NextResponse.json(comment);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  const comment = await prisma.comment.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!comment)
    return NextResponse.json({ error: "Invaild comment" }, { status: 404 });
  await prisma.comment.delete({ where: { id: parseInt(params.id) } });
  return NextResponse.json({ message: "Comment deleted" });
}