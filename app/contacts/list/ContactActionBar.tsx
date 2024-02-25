import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import SearchBar from "../../components/SearchBar";

const ContactActionBar = () => {
  return (
    <div>
      <Flex justify={"between"}>
        <Button className="blue-btn">
          <Link href="/contacts/new">New Contact</Link>
        </Button>
        {/* <SearchBar /> */}
      </Flex>
    </div>
  );
};

export default ContactActionBar;
