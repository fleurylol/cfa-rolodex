"use client";
import { ErrorMessage, Spinner } from "@/app/components";
import { contactSchema } from "@/app/contactSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Contact } from "@prisma/client";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Box, Button, Callout, Grid } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEdgeStore } from "@/app/libs/edgestore";
import DeleteImageButton from "./DeleteImageButton";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Input } from "@nextui-org/react";

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

  const { data: session } = useSession();
  const userEmail = session?.user?.email as string;

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
        await axios.post("/api/contacts", { ...data, userEmail });
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
          <Input
            defaultValue={contact?.name}
            placeholder="Name"
            color="danger"
            variant="underlined"
            {...register("name")}
          />
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
        </Box>
        <Grid columns="2" gap="3">
          <Box>
            <Input
              defaultValue={contact?.email}
              placeholder="Email"
              color="danger"
              variant="underlined"
              {...register("email")}
            />
            <ErrorMessage>{errors.email?.message}</ErrorMessage>
          </Box>
          <Box>
            <Input
              defaultValue={contact?.phone}
              placeholder="Phone"
              color="danger"
              variant="underlined"
              {...register("phone")}
            />
            <ErrorMessage>{errors.phone?.message}</ErrorMessage>
          </Box>
        </Grid>
        <Grid columns="2" gap="3">
          <Box>
            <Input
              defaultValue={contact?.businessName}
              placeholder="Business"
              color="danger"
              variant="underlined"
              {...register("businessName")}
            />
            <ErrorMessage>{errors.businessName?.message}</ErrorMessage>
          </Box>
          <Box>
            <Input
              defaultValue={contact?.address}
              placeholder="Address"
              color="danger"
              variant="underlined"
              {...register("address")}
            />
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
              <Image
                src={previewUrl}
                alt="Selected file"
                width={200}
                height={200}
              />
            </div>
          </>
        )}
        <Button
          type="submit"
          disabled={isSumbitting}
          style={{ backgroundColor: "#e5484d", color: "white" }}
        >
          {contact ? "Update contact" : "Create New Contact"}{" "}
          {isSumbitting && <Spinner />}
        </Button>
      </form>
      {!file && !previewUrl && contact?.image && (
        <>
          <div className="mt-2 flex">
            <Image
              src={contact?.image}
              alt={contact?.name}
              width={200}
              height={200}
            />
            <div className="align ml-2 place-self-center">
              <DeleteImageButton contact={contact} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ContactForm;
