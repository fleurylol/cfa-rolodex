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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEdgeStore } from "@/app/libs/edgestore";
import DeleteImageButton from "./DeleteImageButton";
type ContactFormData = z.infer<typeof contactSchema>;

const ContactForm = ({ contact }: { contact?: Contact }) => {
  const { edgestore } = useEdgeStore();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });
  const [error, setError] = useState("");
  const [isSumbitting, setSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const onSubmit = handleSubmit(async (data, e) => {
    e?.preventDefault();
    setSubmitting(true);
    if (file && contact?.image) {
      const uploadedImage = await edgestore.publicFiles.upload({
        file,
        options: {
          replaceTargetUrl: contact!.image as string,
        },
      });
      data.image = uploadedImage.url;
    }
    if (file && !contact?.image) {
      const uploadedImage = await edgestore.publicFiles.upload({
        file,
      });
      data.image = uploadedImage.url;
    }
    try {
      if (contact) {
        await axios.patch("/api/contacts/" + contact.id, data);
        router.push("/contacts/" + contact.id);
        router.refresh();
      } else {
        await axios.post("/api/contacts", data);
        router.push("/contacts/list");
        router.refresh();
      }
    } catch (error) {
      setSubmitting(false);
      setError("An unexpected error occured.");
    }
  });
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setFile(file);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

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
          <input
            type="file"
            accept="image/jpeg,image/png"
            onChange={handleFileChange}
          />
        </Grid>
        {previewUrl && file && (
          <>
            <p>Preview</p>
            <div className="mt-4">
              <img
                src={previewUrl}
                alt="Selected file"
                width={200}
                height={200}
              />
            </div>
          </>
        )}
        <Button type="submit" disabled={isSumbitting}>
          {contact ? "Update contact" : "Create New Contact"}{" "}
          {isSumbitting && <Spinner />}
        </Button>
      </form>
      {!file && !previewUrl && contact?.image && (
        <>
          <div className="flex">
            <img
              src={contact?.image}
              alt={contact?.name}
              width={200}
              height={200}
            />
            <div className="align place-self-center">
              <DeleteImageButton contact={contact} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ContactForm;
