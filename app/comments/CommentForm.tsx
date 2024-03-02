"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Contact } from "@prisma/client";
import { Button, Card } from "@radix-ui/themes";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ErrorMessage, Spinner } from "../components";
import { Textarea } from "../components/ui/TextArea";
import { commentSchema } from "./commentSchema";
type CommentFormData = z.infer<typeof commentSchema>;

const CommentForm = ({ contact }: { contact: Contact }) => {
  const [error, setError] = useState("");
  const [isSumbitting, setSubmitting] = useState(false);
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
      window.location.reload();
    } catch (error) {
      setSubmitting(false);
      setError("An unexpected error occured.");
    }
  });

  return (
    <>
      <form onSubmit={onSubmit}>
        <Card className="mb-3">
          <Textarea {...register("comment")} className="mb-3" />
          <ErrorMessage>{errors.comment?.message}</ErrorMessage>
          <Button
            type="submit"
            disabled={isSumbitting}
            style={{ backgroundColor: "#e5484d", color: "white" }}
          >
            Add Note {isSumbitting && <Spinner />}
          </Button>
        </Card>
      </form>
    </>
  );
};

export default CommentForm;
