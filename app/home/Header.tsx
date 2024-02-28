import { getServerSession } from "next-auth/next";
import React from "react";
import authOptions from "../auth/authOptions";
import { Flex, Text } from "@radix-ui/themes";

const Header = async () => {
  const session = await getServerSession(authOptions);
  const loggedUser = session ? `${session.user?.name}` : "Stranger";

  return (
    <>
      <Flex direction="column">
        <Text size="7">Hello!</Text>
        <Text>{loggedUser}</Text>
      </Flex>
    </>
  );
};

export default Header;
