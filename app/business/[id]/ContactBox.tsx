import React from "react";
import { Text } from "@radix-ui/themes";

type ContactBoxProps = {
  key: number;
  contactId: number;
  name: string;
  image: string;
};

const ContactBox: React.FC<ContactBoxProps> = ({ contactId, name, image }) => {
  return <Text>{name}</Text>;
};

export default ContactBox;
