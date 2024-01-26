import dynamic from "next/dynamic";
import ContactFormSkelly from "./loading";

const ContactForm = dynamic(
  () => import("@/app/contacts/_components/ContactForm"),
  { ssr: false, loading: () => <ContactFormSkelly /> }
);

const NewContactPage = () => {
  return <ContactForm />;
};

export default NewContactPage;
