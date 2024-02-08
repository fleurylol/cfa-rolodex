"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Contact } from "@prisma/client";
import CommentBox from "@/app/comments/_components/CommentBox";
import { Text } from "@radix-ui/themes";

type Comment = {
  id: number;
  comment: string;
  userEmail: string;
  createdAt: Date;
  updatedAt: Date;
};

const CommentList = ({ contact }: { contact: Contact }) => {
  const {
    data: comments,
    error,
    isLoading,
  } = useQuery<Comment[]>({
    queryKey: ["comments", contact.id],
    queryFn: () =>
      axios.get(`/api/comments/${contact.id}`).then((res) => res.data),
    staleTime: 60 * 1000,
  });
  return (
    <>
      {isLoading && <p>Loading comments...</p>}
      {error && <p>Error loading comments: {error.message}</p>}
      {comments &&
        comments?.map((comment: Comment) => (
          <CommentBox
            key={comment.id}
            comment={comment.comment}
            userEmail={comment.userEmail}
            createdAt={comment.createdAt}
            updatedAt={comment.updatedAt}
          />
        ))}
    </>
  );
};

export default CommentList;
