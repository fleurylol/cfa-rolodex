import { Spinner } from "@/app/components";
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
          <Button
            disabled={isDeleting}
            style={{ backgroundColor: "#e5484d", color: "white" }}
          >
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
              <Button
                variant="soft"
                style={{ backgroundColor: "#B4B4B4", color: "black" }}
              >
                Cancel
              </Button>
            </AlertDialogCancel>
            <AlertDialogAction>
              <Button
                onClick={deleteComment}
                style={{ backgroundColor: "#e5484d", color: "white" }}
              >
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

export default DeleteCommentButton;
