import {
  AlertDialogContent,
  AlertDialogRoot,
  AlertDialogTrigger,
  Button,
  Grid,
  TextFieldInput,
  TextFieldRoot,
  Text,
  AlertDialogAction,
  AlertDialogCancel,
  Flex,
} from "@radix-ui/themes";
import React from "react";

const CreateBusinessButton = () => {
  return (
    <AlertDialogRoot>
      <AlertDialogTrigger>
        <Button>Create Business</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <form>
          <Text>Create New Business</Text>
          <Grid gap="3" mb="2">
            <TextFieldRoot>
              <TextFieldInput placeholder="Business Name" />
            </TextFieldRoot>
            <TextFieldRoot>
              <TextFieldInput placeholder="Business Address" />
            </TextFieldRoot>
            <TextFieldRoot>
              <TextFieldInput placeholder="Business Phone" />
            </TextFieldRoot>
          </Grid>
        </form>
        <Flex mt="4" gap={"3"}>
          <AlertDialogAction>
            <Button color="blue">Create</Button>
          </AlertDialogAction>
          <AlertDialogCancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialogCancel>
        </Flex>
      </AlertDialogContent>
    </AlertDialogRoot>
  );
};

export default CreateBusinessButton;
