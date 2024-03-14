import { Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import SearchBar from "../_components/searchBar/SearchBar";
import { Button } from "../../components/ui/Button";
import { Contact } from "@prisma/client";

interface ContactActionBarProps {
  contacts: Contact[];
}

const ContactActionBar: React.FC<ContactActionBarProps> = ({ contacts }) => {
  return (
    <div>
      <Flex justify={"between"}>
        <Button className="mr-2">
          <Link href="/contacts/new">New Contact</Link>
        </Button>
        <SearchBar contacts={contacts} />
      </Flex>
    </div>
  );
};

export default ContactActionBar;
