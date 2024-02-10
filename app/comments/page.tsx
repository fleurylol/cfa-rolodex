import {
  TextFieldRoot,
  TextFieldInput,
  Button,
  Flex,
  Box,
  Card,
} from "@radix-ui/themes";
import React from "react";

const CommentPage = () => {
  return (
    <>
      <form>
        <Box>
          <Card>
            <TextFieldRoot className="mb-3">
              <TextFieldInput />
            </TextFieldRoot>
            <Button>Submit</Button>
          </Card>
        </Box>
      </form>
    </>
  );
};

export default CommentPage;
