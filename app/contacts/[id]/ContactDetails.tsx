import { Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import React from "react";
import { MdLocalPhone, MdOutlineAlternateEmail } from "react-icons/md";
import ReactMarkdown from "react-markdown";
import { Contact } from "@prisma/client";

const ContactDetails = ({ contact }: { contact: Contact }) => {
  return (
    <>
      <Grid>
        <Heading>{contact.name}</Heading>
        <Text size="4">{contact.business}</Text>
        <Text>{contact.address}</Text>
        <Flex gap={"3"}>
          <MdLocalPhone size={"24"} /> <Text>{contact.phone}</Text>
          <MdOutlineAlternateEmail size={"24"} /> <Text>{contact.email}</Text>
        </Flex>
      </Grid>
      <Card className="prose" mt="4">
        <ReactMarkdown>{contact.notes}</ReactMarkdown>
      </Card>
    </>
  );
};

export default ContactDetails;
