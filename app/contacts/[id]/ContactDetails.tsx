import { Box, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import React from "react";
import { MdLocalPhone, MdOutlineAlternateEmail } from "react-icons/md";
import { Contact } from "@prisma/client";
import Image from "next/image";
import { Link } from "@/app/components";

const ContactDetails = ({ contact }: { contact: Contact }) => {
  return (
    <>
      <Grid className="max-w-xl">
        <Heading>{contact.name}</Heading>
        <Text size="4">{contact.businessName}</Text>
        <Text>{contact.address}</Text>
        {contact.businessId && (
          <Link href={`/business/${contact.businessId}`}>View Business</Link>
        )}
        <Flex gap={"3"}>
          <MdLocalPhone size={"24"} /> <Text>{contact.phone}</Text>
          <MdOutlineAlternateEmail size={"24"} /> <Text>{contact.email}</Text>
        </Flex>
      </Grid>
      <Box>
        {contact.image && (
          <Image
            src={contact.image}
            alt={contact.name}
            width={400}
            height={400}
          />
        )}
      </Box>
    </>
  );
};

export default ContactDetails;
