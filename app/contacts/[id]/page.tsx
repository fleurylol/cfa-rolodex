import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ContactDetails from "./ContactDetails";
import EditContactButton from "./EditContactButton";
import DeleteContactButton from "./DeleteContactButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import CommentSection from "./CommentSection";
import BusinessSelect from "./BusinessSelect";
import { cache } from "react";

interface Props {
  params: { id: string };
}

const fetchContact = cache((contactId: number) =>
  prisma.contact.findUnique({
    where: { id: contactId },
  })
);

const ContactDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  const contact = await fetchContact(parseInt(params.id));

  if (!contact) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4 ">
        <ContactDetails contact={contact} />
        <CommentSection contact={contact} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <BusinessSelect contact={contact} />
            <EditContactButton contactId={contact.id} />
            <DeleteContactButton contact={contact} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export async function generateMetadata({ params }: Props) {
  const contact = await fetchContact(parseInt(params.id));

  return {
    title: contact?.name,
    description: "Details for " + contact?.name,
  };
}

export default ContactDetailPage;
