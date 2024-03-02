import { Spinner } from "@/app/components";
import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "../../components/ui/Button";
import {
  AlertDialogRoot,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  Flex,
  AlertDialogCancel,
  AlertDialogAction,
} from "@radix-ui/themes";
import axios from "axios";
import React, { useState } from "react";
type DeleteCommentButtonProps = {
  commentId: number;
};

const DeleteCommentButton: React.FC<DeleteCommentButtonProps> = ({
  commentId,
}) => {
  const [error, setError] = useState(false);
  const [isDeleting, setDeleting] = useState(false);

  const deleteComment = async () => {
    setDeleting(true);
    try {
      await axios.delete(`/api/comments/${commentId}`);
      window.location.reload();
      setDeleting(false);
    } catch (error) {
      setDeleting(false);
      setError(true);
    }
  };
  return (
    <>
      <AlertDialogRoot>
        <AlertDialogTrigger>
          <Button disabled={isDeleting} variant={"delete"}>
            <TrashIcon /> Delete {isDeleting && <Spinner />}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this comment? This cannot be undone!
          </AlertDialogDescription>
          <Flex mt="4" gap={"3"}>
            <AlertDialogCancel>
              <Button variant="outline">Cancel</Button>
            </AlertDialogCancel>
            <AlertDialogAction>
              <Button onClick={deleteComment} variant={"delete"}>
                Delete Comment
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
          <Button variant="outline" onClick={() => setError(false)}>
            OK
          </Button>
        </AlertDialogContent>
      </AlertDialogRoot>
    </>
  );
};

export default DeleteCommentButton;
