import React from "react";
import { Heading, Text, Box, Button, Flex, Grid } from "@radix-ui/themes";
import prisma from "@/prisma/client";
import ContactList from "./ContactList";
import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";
interface Props {
  params: { id: string };
}

const BusinessDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);

  const business = await prisma.business.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!business) {
    return <div>Business not found</div>;
  }
  const { name, address } = business;
  return (
    <>
      <Grid columns={{ initial: "1", sm: "5" }}>
        <Box className="md:col-span-4">
          <Flex direction={"column"} className="mb-3">
            <Heading>{name}</Heading>
            <Text>{address}</Text>
          </Flex>

          <Text>Contacts: </Text>
          <ContactList business={business} />
        </Box>
        {session && (
          <Box>
            <Flex direction="column" gap="4">
              <Button></Button>
              <Button></Button>
            </Flex>
          </Box>
        )}
      </Grid>
    </>
  );
};

export default BusinessDetailPage;
