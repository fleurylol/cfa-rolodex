import CommentForm from "@/app/comments/CommentForm";
import { Contact } from "@prisma/client";
import { Box, Card, Text } from "@radix-ui/themes";
import React from "react";

const CommentSection = ({ contact }: { contact: Contact }) => {
  return (
    <>
      <Box>
        <Card>
          <Text>Add comments for {contact.name}</Text>
        </Card>
      </Box>
      <Box>
        <CommentForm contact={contact} />
      </Box>
      <Box>
        <Card>
          <Text>Comments</Text>
        </Card>
      </Box>
    </>
  );
};

export default CommentSection;
