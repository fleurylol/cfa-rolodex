import React from "react";
import { Box, Flex, Text } from "@radix-ui/themes";
import { Link } from "@/app/components";

type ContactBoxProps = {
  key: number;
  contactId: number;
  name: string;
  image: string;
};

const ContactBox: React.FC<ContactBoxProps> = ({ contactId, name, image }) => {
  return (
    <>
      <Flex direction={"column"}>
        <Text>{name}</Text>
        <Link href={`/contacts/${contactId}`}>View Contact</Link>
      </Flex>
    </>
  );
};

export default ContactBox;
