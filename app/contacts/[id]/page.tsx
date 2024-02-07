import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ContactDetails from "./ContactDetails";
import EditContactButton from "./EditContactButton";
import DeleteContactButton from "./DeleteContactButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import CommentSection from "./CommentSection";

interface Props {
  params: { id: string };
}

const ContactDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  const contact = await prisma.contact.findUnique({
    where: { id: parseInt(params.id) },
  });

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
            <EditContactButton contactId={contact.id} />
            <DeleteContactButton contact={contact} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export default ContactDetailPage;
