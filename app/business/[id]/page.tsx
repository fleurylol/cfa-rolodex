import React, { cache } from "react";
import { Heading, Text, Box, Flex, Grid } from "@radix-ui/themes";
import prisma from "@/prisma/client";
import ContactList from "./ContactList";
import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";
import EditBusinessButton from "./EditBusinessButton";
import DeleteBusinessButton from "./DeleteBusinessButton";
interface Props {
  params: { id: string };
}

const fetchBusiness = cache((businessId: number) =>
  prisma.business.findUnique({
    where: { id: businessId },
  }),
);

const BusinessDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  const business = await fetchBusiness(parseInt(params.id));
  const isOwner = session?.user?.email === business?.userEmail;
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
        {isOwner && (
          <Box>
            <Flex direction="column" gap="4">
              <EditBusinessButton businessId={business.id} />
              <DeleteBusinessButton business={business} />
            </Flex>
          </Box>
        )}
      </Grid>
    </>
  );
};

export async function generateMetadata({ params }: Props) {
  const business = await fetchBusiness(parseInt(params.id));

  return {
    title: business?.name,
    description: "Details for " + business?.name,
  };
}

export default BusinessDetailPage;
