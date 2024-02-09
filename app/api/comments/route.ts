import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import { commentSchema } from "@/app/comments/commentSchema";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  const body = await request.json();
  const { comment, contactId, userEmail } = body;
  const validation = commentSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const newComment = await prisma.comment.create({
    data: {
      comment,
      contactId,
      userEmail,
    },
  });
  return NextResponse.json(newComment, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  const body = await request.json();
  const validation = commentSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });
  const { comment, commentId } = body;
  const updatedComment = await prisma.comment.update({
    where: { id: commentId },
    data: {
      comment,
      updatedAt: new Date(),
    },
  });
  return NextResponse.json(updatedComment);
}
