import { Spinner } from "@/app/components";
import { TrashIcon } from "@radix-ui/react-icons";
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
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useEdgeStore } from "@/app/libs/edgestore";
import axios from "axios";
import { Contact } from "@prisma/client";

const DeleteImageButton = ({ contact }: { contact: Contact }) => {
  const { edgestore } = useEdgeStore();
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const deleteImage = async (contactId: number) => {
    try {
      setDeleting(true);
      await edgestore.publicFiles.delete({
        url: contact.image as string,
      });
      await axios.patch("/api/contacts/" + contact.id, { image: null });
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
          <Button
            disabled={isDeleting}
            style={{ backgroundColor: "#e5484d", color: "white" }}
          >
            <TrashIcon />
            {isDeleting && <Spinner />}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to remove this contact? This cannot be undone!
          </AlertDialogDescription>
          <Flex mt="4" gap={"3"}>
            <AlertDialogCancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialogCancel>
            <AlertDialogAction>
              <Button onClick={() => deleteImage(contact.id)}>
                Delete Image
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

export default DeleteImageButton;
