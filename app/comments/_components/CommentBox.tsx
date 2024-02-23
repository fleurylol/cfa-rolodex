"use client";
import { Spinner } from "@/app/components";
import { Pencil2Icon } from "@radix-ui/react-icons";
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
  Grid,
  Text,
  TextArea,
  TextFieldInput,
  TextFieldRoot,
} from "@radix-ui/themes";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import DeleteCommentButton from "./DeleteCommentButton";

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
      <Box className="mb-3 rounded-md border p-3">
        <Grid>
          <Flex
            direction={{ initial: "column", sm: "row" }}
            justify="between"
            className="mb-4"
          >
            <Text size="4" className="sm:self-start lg:self-end">
              {userEmail}
            </Text>
            <Flex direction="column">
              <Text size="2">
                Updated at: {new Date(updatedTime).toLocaleDateString()}
                {" | "}
                {new Date(updatedTime).toLocaleTimeString(undefined, {
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </Text>
              <Text size="2">
                Created at: {new Date(createdAt).toLocaleDateString()}
                {" | "}
                {new Date(createdAt).toLocaleTimeString(undefined, {
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </Text>
            </Flex>
          </Flex>
        </Grid>
        <Box className="rounded-md border p-3">
          <Text size="2">{commentData}</Text>
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
              <AlertDialogContent size={"4"}>
                <AlertDialogTitle>Editing</AlertDialogTitle>
                <form onSubmit={onSubmit}>
                  <TextFieldRoot>
                    <TextArea
                      defaultValue={comment}
                      size={"3"}
                      style={{ width: "100%", height: "150px" }}
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
            <DeleteCommentButton commentId={commentId} />
          </Flex>
        )}
      </Box>
    </>
  );
};

export default CommentBox;
