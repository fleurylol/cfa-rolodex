"use client";
import { Spinner } from "@/app/components";
import { Business } from "@prisma/client";
import { TrashIcon } from "@radix-ui/react-icons";
import {
  AlertDialogRoot,
  AlertDialogTrigger,
  Button,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  Flex,
  AlertDialogCancel,
  AlertDialogAction,
} from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const DeleteBusinessButton = ({ business }: { business: Business }) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const deleteContact = async () => {
    try {
      setDeleting(true);
      await axios.delete("/api/business/" + business.id);
      router.push("/business/list");
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
            <TrashIcon /> Delete Business {isDeleting && <Spinner />}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this business? This cannot be
            undone!
          </AlertDialogDescription>
          <Flex mt="4" gap={"3"}>
            <AlertDialogCancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialogCancel>
            <AlertDialogAction>
              <Button onClick={deleteContact}>Delete Business</Button>
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

export default DeleteBusinessButton;
