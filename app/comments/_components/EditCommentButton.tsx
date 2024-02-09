"use client";
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
  TextFieldInput,
  TextFieldRoot,
} from "@radix-ui/themes";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
type EditCommentButtonProps = {
  comment: string;
  commentId: number;
};

const EditCommentButton: React.FC<EditCommentButtonProps> = ({
  comment,
  commentId,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [isSumbitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      await axios.patch(`/api/comments/`, { ...data, commentId });
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      console.error("Failed to update comment", error);
    }
  });
  return (
    <AlertDialogRoot>
      <AlertDialogTrigger>
        <Button color="green" disabled={isSumbitting}>
          <Pencil2Icon />
          Edit
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Editing {commentId}</AlertDialogTitle>
        <form onSubmit={onSubmit}>
          <TextFieldRoot>
            <TextFieldInput defaultValue={comment} {...register("comment")} />
          </TextFieldRoot>
          <Flex mt="4" gap={"3"}>
            <AlertDialogAction>
              <Button color="blue" type="submit">
                Save
              </Button>
            </AlertDialogAction>
            <AlertDialogCancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialogCancel>
          </Flex>
        </form>
      </AlertDialogContent>
    </AlertDialogRoot>
  );
};

export default EditCommentButton;
