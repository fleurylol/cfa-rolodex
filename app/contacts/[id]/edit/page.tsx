import prisma from "@/prisma/client";
import ContactForm from "../../_components/ContactForm";
import { notFound } from "next/navigation";

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
