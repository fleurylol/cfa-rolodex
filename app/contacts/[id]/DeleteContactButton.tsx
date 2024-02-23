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
import { useState } from "react";
import { Spinner } from "@/app/components";
import { useEdgeStore } from "@/app/libs/edgestore";
import { Contact } from "@prisma/client";

const DeleteContactButton = ({ contact }: { contact: Contact }) => {
  const { edgestore } = useEdgeStore();
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const deleteContact = async () => {
    try {
      setDeleting(true);
      if (contact.image !== null) {
        await edgestore.publicFiles.delete({
          url: contact.image as string,
        });
      }
      await axios.delete("/api/contacts/" + contact.id);
      router.push("/contacts/list");
      router.refresh();
    } catch (error) {
      setDeleting(false);
      setError(true);
    }
  };
  return (
    <>
      <AlertDialogRoot>
        <AlertDialogTrigger>
          <Button disabled={isDeleting} color="red">
            <TrashIcon /> Delete Contact {isDeleting && <Spinner />}
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
              <Button onClick={deleteContact} color="red">
                Delete Contact
              </Button>
            </AlertDialogAction>
          </Flex>
        </AlertDialogContent>
      </AlertDialogRoot>
      <AlertDialogRoot open={error}>
        <AlertDialogContent>
          <AlertDialogTitle>Error</AlertDialogTitle>
          <AlertDialogDescription>
            Aw man something isnt working
          </AlertDialogDescription>
          <Button
            variant="soft"
            color="gray"
            mt={"2"}
            onClick={() => setError(false)}
          >
            OK
          </Button>
        </AlertDialogContent>
      </AlertDialogRoot>
    </>
  );
};

export default DeleteContactButton;
