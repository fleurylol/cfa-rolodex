import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";

const ContactForm = dynamic(
  () => import("@/app/contacts/_components/ContactForm"),
  { ssr: false }
);

interface Props {
  params: { id: string };
}

const EditContact = async ({ params }: Props) => {
  const contact = await prisma.contact.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!contact) notFound();
  return <ContactForm contact={contact} />;
};

export default EditContact;
