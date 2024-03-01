import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { Box } from "@radix-ui/themes";

const ContactForm = dynamic(
  () => import("@/app/contacts/_components/ContactForm"),
  { ssr: false },
);

interface Props {
  params: { id: string };
}

const EditContact = async ({ params }: Props) => {
  const contact = await prisma.contact.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!contact) notFound();
  return (
    <Box className="ml-auto mr-auto sm:w-full md:w-7/12">
      <ContactForm contact={contact} />
    </Box>
  );
};

export default EditContact;
