"use client";
import { Button, Text, TextFieldRoot, TextFieldInput } from "@radix-ui/themes";
import React, { useState } from "react";
import { User, Contact } from "@prisma/client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { commentSchema } from "./commentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { ErrorMessage, Spinner } from "../components";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
type CommentFormData = z.infer<typeof commentSchema>;

const CommentForm = ({ contact }: { contact: Contact }) => {
  const [error, setError] = useState("");
  const [isSumbitting, setSubmitting] = useState(false);
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
  });
  const { data: session } = useSession();
  const userEmail = session?.user?.email;
  const contactId = contact.id;
  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      await axios.post("/api/comments", { ...data, contactId, userEmail });
      router.push("/contacts/list");
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      setError("An unexpected error occured.");
    }
  });

  return (
    <>
      <form onSubmit={onSubmit}>
        <Text>{userEmail}</Text>
        <TextFieldRoot>
          <TextFieldInput {...register("comment")} />
        </TextFieldRoot>
        <ErrorMessage>{errors.comment?.message}</ErrorMessage>
        <Button type="submit" disabled={isSumbitting}>
          Submit {isSumbitting && <Spinner />}
        </Button>
      </form>
    </>
  );
};

export default CommentForm;