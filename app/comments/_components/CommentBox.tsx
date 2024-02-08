import { Box, Flex, Text } from "@radix-ui/themes";
import React from "react";

type CommentBoxProps = {
  key: number;
  comment: string;
  userEmail: string;
  createdAt: Date;
  updatedAt: Date;
};

const CommentBox: React.FC<CommentBoxProps> = ({
  comment,
  userEmail,
  createdAt,
  updatedAt,
}) => {
  return (
    <>
      <Box className="border rounded-md p-3 mb-3">
        <Flex justify="between" className="mb-4">
          <Text size="6" className="self-end">
            {userEmail}
          </Text>
          <Flex direction="column">
            <Text size="2">
              Updated at: {new Date(updatedAt).toLocaleDateString()}{" "}
              {new Date(updatedAt).toLocaleTimeString()}
            </Text>
            <Text size="2">
              Updated at: {new Date(createdAt).toLocaleDateString()}{" "}
              {new Date(createdAt).toLocaleTimeString()}
            </Text>
          </Flex>
        </Flex>
        <Box className="border rounded-md p-3">
          <Text size="1">{comment}</Text>
        </Box>
      </Box>
    </>
  );
};

export default CommentBox;
