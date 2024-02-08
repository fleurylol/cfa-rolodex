"use client";
import CommentForm from "@/app/comments/CommentForm";
import { Contact } from "@prisma/client";
import { Box, Card, Link, Skeleton, Text } from "@radix-ui/themes";
import React from "react";
import CommentList from "./CommentList";
import { useSession } from "next-auth/react";

const CommentSection = ({ contact }: { contact: Contact }) => {
  const { data: session } = useSession();
  return (
    <>
      <Box>
        <Text>Notes for {contact.name}</Text>
      </Box>
      {session && (
        <Box>
          <CommentForm contact={contact} />
        </Box>
      )}
      <Box>
        <Card>
          <CommentList contact={contact} />
        </Card>
      </Box>
    </>
  );
};

export default CommentSection;
