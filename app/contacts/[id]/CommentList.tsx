"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Contact } from "@prisma/client";
import CommentBox from "@/app/comments/_components/CommentBox";
import { Spinner } from "@/app/components";

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
      axios.get(`/api/comments/contact/${contact.id}`).then((res) => res.data),
    staleTime: 60 * 1000,
  });
  return (
    <>
      {isLoading && (
        <>
          <p>Loading comments... </p>
          <Spinner />
        </>
      )}
      {error && <p>Error loading comments: {error.message}</p>}
      {comments &&
        comments?.map((comment: Comment) => (
          <CommentBox
            key={comment.id}
            commentId={comment.id}
            comment={comment.comment}
            userEmail={comment.userEmail}
            createdAt={comment.createdAt}
            updatedAt={comment.updatedAt}
          />
        ))}
      {comments && comments.length === 0 && <p>No comments yet</p>}
    </>
  );
};

export default CommentList;
