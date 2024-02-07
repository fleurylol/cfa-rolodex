import { Box, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import React from "react";
import { MdLocalPhone, MdOutlineAlternateEmail } from "react-icons/md";
import { Contact } from "@prisma/client";
import Image from "next/image";
import CommentForm from "@/app/comments/CommentForm";

const ContactDetails = ({ contact }: { contact: Contact }) => {
  return (
    <>
      <Grid className="max-w-xl">
        <Heading>{contact.name}</Heading>
        <Text size="4">{contact.business}</Text>
        <Text>{contact.address}</Text>
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
            width={200}
            height={200}
          />
        )}
      </Box>
      <Box>
        <Card>
          <Text>Notes</Text>
        </Card>
      </Box>
      <Box>
        <CommentForm contact={contact} />
      </Box>
    </>
  );
};

export default ContactDetails;
