import dynamic from "next/dynamic";
import ContactFormSkelly from "./loading";
import { Box } from "@radix-ui/themes";

const ContactForm = dynamic(
  () => import("@/app/contacts/_components/ContactForm"),
  { ssr: false, loading: () => <ContactFormSkelly /> },
);

const NewContactPage = () => {
  return (
    <Box className="ml-auto mr-auto sm:w-full md:w-7/12">
      <ContactForm />
    </Box>
  );
};

export default NewContactPage;
