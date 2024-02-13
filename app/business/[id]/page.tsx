import React from "react";
import { Heading, Text, Box } from "@radix-ui/themes";
import prisma from "@/prisma/client";
import ContactList from "./ContactList";
interface Props {
  params: { id: string };
}

const BusinessDetailPage = async ({ params }: Props) => {
  const business = await prisma.business.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!business) {
    return <div>Business not found</div>;
  }
  const { name, address } = business;
  return (
    <>
      <Box>
        <Heading>{name}</Heading>
        <Text>{address}</Text>
      </Box>
      <Text>Contacts: </Text>
      <ContactList business={business}/>
    </>
  );
};

export default BusinessDetailPage;
