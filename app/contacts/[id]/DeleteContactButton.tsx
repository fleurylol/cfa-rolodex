"use client";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogRoot,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Flex,
} from "@radix-ui/themes";
import { TrashIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { useRouter } from "next/navigation";

const DeleteContactButton = ({ contactId }: { contactId: number }) => {
  const router = useRouter();
  return (
    <AlertDialogRoot>
      <AlertDialogTrigger>
        <Button>
          <TrashIcon /> Delete Contact
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to delete this contact? This cannot be undone!
        </AlertDialogDescription>
        <Flex mt="4" gap={"3"}>
          <AlertDialogCancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction>
            <Button
              onClick={async () => {
                await axios.delete("/api/contacts/" + contactId);
                router.push("/contacts");
                router.refresh();
              }}
            >
              Delete Contact
            </Button>
          </AlertDialogAction>
        </Flex>
      </AlertDialogContent>
    </AlertDialogRoot>
  );
};

export default DeleteContactButton;
