"use client";
import {
  TextFieldInput,
  TextFieldRoot,
  Button,
  Box,
  Grid,
  Callout,
  Text,
} from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema } from "@/app/contactSchema";
import { z } from "zod";
import { ErrorMessage, Spinner } from "@/app/components";

type ContactForm = z.infer<typeof contactSchema>;

const NewContactPage = () => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });
  const [error, setError] = useState("");
  const [isSumbitting, setSubmitting] = useState(false);
  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      await axios.post("/api/contacts", data);
      router.push("/contacts");
    } catch (error) {
      setSubmitting(false);
      setError("An unexpected error occured.");
    }
  });
  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Icon>
            <ExclamationTriangleIcon />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form className="space-y-3" onSubmit={onSubmit}>
        <Box>
          <TextFieldRoot>
            <TextFieldInput placeholder="Name" {...register("name")} />
          </TextFieldRoot>
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
        </Box>
        <Grid columns="2" gap="3">
          <Box>
            <TextFieldRoot>
              <TextFieldInput placeholder="Email" {...register("email")} />
            </TextFieldRoot>
            <ErrorMessage>{errors.email?.message}</ErrorMessage>
          </Box>
          <Box>
            <TextFieldRoot>
              <TextFieldInput placeholder="Phone" {...register("phone")} />
            </TextFieldRoot>
            <ErrorMessage>{errors.phone?.message}</ErrorMessage>
          </Box>
        </Grid>
        <Grid columns="2" gap="3">
          <Box>
            <TextFieldRoot>
              <TextFieldInput
                placeholder="Business"
                {...register("business")}
              />
            </TextFieldRoot>
            <ErrorMessage>{errors.business?.message}</ErrorMessage>
          </Box>
          <Box>
            <TextFieldRoot>
              <TextFieldInput placeholder="Address" {...register("address")} />
            </TextFieldRoot>
            <ErrorMessage>{errors.address?.message}</ErrorMessage>
          </Box>
        </Grid>
        <Controller
          name="notes"
          control={control}
          render={({ field }) => <SimpleMDE placeholder="Notes" {...field} />}
        />
        <Button disabled={isSumbitting}>
          Create Contact
          {isSumbitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default NewContactPage;
