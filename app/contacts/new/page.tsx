"use client";
import {
  TextFieldInput,
  TextFieldRoot,
  Button,
  Box,
  Grid,
} from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const NewContactPage = () => {
  return (
    <div className="max-w-xl space-y-3">
      <Box>
        <TextFieldRoot>
          <TextFieldInput placeholder="Name" />
        </TextFieldRoot>
      </Box>
      <Grid columns="2" gap="3">
        <Box>
          <TextFieldRoot>
            <TextFieldInput placeholder="Email" />
          </TextFieldRoot>
        </Box>
        <Box>
          <TextFieldRoot>
            <TextFieldInput placeholder="Phone" />
          </TextFieldRoot>
        </Box>
      </Grid>
      <Grid columns="2" gap="3">
        <Box>
          <TextFieldRoot>
            <TextFieldInput placeholder="Business" />
          </TextFieldRoot>
        </Box>
        <Box>
          <TextFieldRoot>
            <TextFieldInput placeholder="Address" />
          </TextFieldRoot>
        </Box>
      </Grid>
      <SimpleMDE placeholder="Notes" />
      <Button>Create Contact</Button>
    </div>
  );
};

export default NewContactPage;
