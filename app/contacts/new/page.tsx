"use client";
import { Box } from "@radix-ui/themes";
import delay from "delay";
import ContactForm from "../_components/ContactForm";

const NewContactPage = async () => {
  await delay(2000);
  return (
    <Box className="ml-auto mr-auto sm:w-full md:w-7/12">
      <ContactForm />
    </Box>
  );
};

export default NewContactPage;
