import { Box } from "@radix-ui/themes";
import ContactForm from "../_components/ContactForm";
import { Metadata } from "next";

const NewContactPage = () => {
  return (
    <Box className="ml-auto mr-auto sm:w-full md:w-7/12">
      <ContactForm />
    </Box>
  );
};

export const metadata: Metadata = {
  title: "New Contact",
  description: "Page for new contact creation.",
};
export default NewContactPage;
