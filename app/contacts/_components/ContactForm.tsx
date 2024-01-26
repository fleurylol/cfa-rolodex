"use client";
import { ErrorMessage, Spinner } from "@/app/components";
import { contactSchema } from "@/app/contactSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Contact } from "@prisma/client";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Callout,
  Grid,
  TextFieldInput,
  TextFieldRoot,
} from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";
type ContactFormData = z.infer<typeof contactSchema>;

const ContactForm = ({ contact }: { contact?: Contact }) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });
  const [error, setError] = useState("");
  const [isSumbitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      if (contact) await axios.patch("/api/contacts/" + contact.id, data);
      else await axios.post("/api/contacts", data);
      router.push("/contacts");
      router.refresh();
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
            <TextFieldInput
              defaultValue={contact?.name}
              placeholder="Name"
              {...register("name")}
            />
          </TextFieldRoot>
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
        </Box>
        <Grid columns="2" gap="3">
          <Box>
            <TextFieldRoot>
              <TextFieldInput
                defaultValue={contact?.email}
                placeholder="Email"
                {...register("email")}
              />
            </TextFieldRoot>
            <ErrorMessage>{errors.email?.message}</ErrorMessage>
          </Box>
          <Box>
            <TextFieldRoot>
              <TextFieldInput
                defaultValue={contact?.phone}
                placeholder="Phone"
                {...register("phone")}
              />
            </TextFieldRoot>
            <ErrorMessage>{errors.phone?.message}</ErrorMessage>
          </Box>
        </Grid>
        <Grid columns="2" gap="3">
          <Box>
            <TextFieldRoot>
              <TextFieldInput
                defaultValue={contact?.business}
                placeholder="Business"
                {...register("business")}
              />
            </TextFieldRoot>
            <ErrorMessage>{errors.business?.message}</ErrorMessage>
          </Box>
          <Box>
            <TextFieldRoot>
              <TextFieldInput
                defaultValue={contact?.address}
                placeholder="Address"
                {...register("address")}
              />
            </TextFieldRoot>
            <ErrorMessage>{errors.address?.message}</ErrorMessage>
          </Box>
        </Grid>
        <Controller
          name="notes"
          control={control}
          defaultValue={contact?.notes}
          render={({ field }) => <SimpleMDE placeholder="Notes" {...field} />}
        />
        <Button disabled={isSumbitting}>
          {contact ? "Update contact" : "Create New Contact"}{" "}
          {isSumbitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;