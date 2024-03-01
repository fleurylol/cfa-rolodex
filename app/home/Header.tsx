import { getServerSession } from "next-auth/next";
import React from "react";
import authOptions from "../auth/authOptions";
import { Flex, Text } from "@radix-ui/themes";
import Link from "next/link";

const Header = async () => {
  const session = await getServerSession(authOptions);
  const loggedUser = session ? `${session.user?.name}` : "Stranger";

  return (
    <>
      <Flex className="pb-3">
        <Flex className="flex-col sm:flex-row">
          <Text size="8" color="red" className="pr-2">
            Hello!
          </Text>
          <Text size="7" className="self-end">
            {loggedUser}
          </Text>
        </Flex>
        <Link
          className="ml-auto self-end underline"
          href="https://docs.google.com/forms/d/e/1FAIpQLSeFImfvQieyhgCrj63KBx-AwgoylRME3K6hUA4S_TYKHchNhw/viewform"
        >
          Submit Feedback
        </Link>
      </Flex>
    </>
  );
};

export default Header;
