"use client";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogRoot,
  AlertDialogTitle,
  AlertDialogTrigger,
  Box,
  Button,
  Flex,
  Text,
  TextFieldInput,
  TextFieldRoot,
} from "@radix-ui/themes";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { Pencil2Icon } from "@radix-ui/react-icons";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Spinner } from "@/app/components";
import DeleteCommentButton from "./DeleteCommentButton";
import { set } from "zod";

type CommentBoxProps = {
  key: number;
  commentId: number;
  comment: string;
  userEmail: string;
  createdAt: Date;
  updatedAt: Date;
};

const CommentBox: React.FC<CommentBoxProps> = ({
  comment,
  commentId,
  userEmail,
  createdAt,
  updatedAt,
}) => {
  const { data: session } = useSession();
  const isOwner = session?.user?.email === userEmail;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isSumbitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [commentData, setCommentData] = useState(comment);
  const [updatedTime, setUpdatedTime] = useState(updatedAt);

  const onSubmit = handleSubmit(async (data) => {
    setSubmitting(true);
    try {
      await axios.patch(`/api/comments/`, { ...data, commentId });
      const response = await axios.get(`/api/comments/${commentId}`);
      const { comment: updatedComment, updatedAt: UpdatedTime } = response.data;
      setCommentData(updatedComment);
      setUpdatedTime(UpdatedTime);
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
      setError(true);
    }
  });
  return (
    <>
      <Box className="border rounded-md p-3 mb-3">
        <Flex justify="between" className="mb-4">
          <Text size="4" className="self-end">
            {userEmail}
          </Text>
          <Flex direction="column">
            <Text size="3">
              Updated at: {new Date(updatedTime).toLocaleDateString()}
              {" | "}
              {new Date(updatedTime).toLocaleTimeString(undefined, {
                hour: "numeric",
                minute: "2-digit",
              })}
            </Text>
            <Text size="3">
              Created at: {new Date(createdAt).toLocaleDateString()}
              {" | "}
              {new Date(createdAt).toLocaleTimeString(undefined, {
                hour: "numeric",
                minute: "2-digit",
              })}
            </Text>
          </Flex>
        </Flex>
        <Box className="border rounded-md p-3">
          <Text size="1">{commentData}</Text>
        </Box>
        {isOwner && (
          <Flex mt="4" gap={"3"}>
            <AlertDialogRoot>
              <AlertDialogTrigger>
                <Button color="green" disabled={isSumbitting}>
                  <Pencil2Icon />
                  Edit {isSumbitting && <Spinner />}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogTitle>Editing {commentId}</AlertDialogTitle>
                <form onSubmit={onSubmit}>
                  <TextFieldRoot>
                    <TextFieldInput
                      defaultValue={comment}
                      {...register("comment")}
                    />
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
            <DeleteCommentButton
              commentId={commentId}
            />
          </Flex>
        )}
      </Box>
    </>
  );
};

export default CommentBox;
