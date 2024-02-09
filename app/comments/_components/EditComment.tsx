import { Pencil2Icon } from "@radix-ui/react-icons";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogRoot,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Flex,
} from "@radix-ui/themes";

const EditComment = () => {
  return (
    <AlertDialogRoot>
      <AlertDialogTrigger>
        <Button color="green">
          <Pencil2Icon />
          Edit
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Editing</AlertDialogTitle>
        words
        <Flex mt="4" gap={"3"}>
          <AlertDialogAction>
            <Button color="blue">Save</Button>
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

export default EditComment;
