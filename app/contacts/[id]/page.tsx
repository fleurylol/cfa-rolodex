import prisma from "@/prisma/client";
import { Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ContactDetails from "./ContactDetails";
import EditContactButton from "./edit/EditContactButton";

interface Props {
  params: { id: string };
}

const ContactDetailPage = async ({ params }: Props) => {
  const contact = await prisma.contact.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!contact) notFound();

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box>
        <ContactDetails contact={contact} />
      </Box>
      <Box>
        <EditContactButton contactId={contact.id} />
      </Box>
    </Grid>
  );
};

export default ContactDetailPage;
