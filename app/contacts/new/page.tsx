"use client";
import {
  TextFieldInput,
  TextFieldRoot,
  Button,
  Box,
  Grid,
  Callout,
} from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ExclamationTriangleIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  business: string;
  address: string;
  notes: string;
}

const NewContactPage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<ContactForm>();
  const [error, setError] = useState("");
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

      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/contacts", data);
            router.push("/contacts");
          } catch (error) {
            setError("An unexpected error occured.");
          }
        })}
      >
        <Box>
          <TextFieldRoot>
            <TextFieldInput placeholder="Name" {...register("name")} />
          </TextFieldRoot>
        </Box>
        <Grid columns="2" gap="3">
          <Box>
            <TextFieldRoot>
              <TextFieldInput placeholder="Email" {...register("email")} />
            </TextFieldRoot>
          </Box>
          <Box>
            <TextFieldRoot>
              <TextFieldInput placeholder="Phone" {...register("phone")} />
            </TextFieldRoot>
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
          </Box>
          <Box>
            <TextFieldRoot>
              <TextFieldInput placeholder="Address" {...register("address")} />
            </TextFieldRoot>
          </Box>
        </Grid>
        <Controller
          name="notes"
          control={control}
          render={({ field }) => <SimpleMDE placeholder="Notes" {...field} />}
        />
        <Button>Create Contact</Button>
      </form>
    </div>
  );
};

export default NewContactPage;
