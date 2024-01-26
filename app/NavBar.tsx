"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { BsPersonRolodex } from "react-icons/bs";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";

const NavBar = () => {
  const currentPath = usePathname();
  const { status, data: session } = useSession();
  const links = [
    { label: "Home", href: "/" },
    { label: "Contacts", href: "/contacts/list" },
  ];
  return (
    <nav className="border-b mb-5 px-5 py-3 bg-red-600">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap={"5"}>
            <Link href="/">
              <BsPersonRolodex color="white" />
            </Link>
            <ul className="flex space-x-6 ">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    className={classnames({
                      underline: link.href === currentPath,
                      "no-underline": link.href !== currentPath,
                      "hover:text-red-300 text-white transition-colors": true,
                    })}
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>
          <Box>
            {status === "authenticated" && (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Avatar
                    src={session.user!.image!}
                    fallback="?"
                    variant="solid"
                    size="2"
                    radius="full"
                    highContrast
                    className="cursor-pointer"
                  />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Label>
                    <Text size="2">{session.user!.email}</Text>
                  </DropdownMenu.Label>
                  <DropdownMenu.Item>
                    <Link href="/api/auth/signout">Log out</Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}
            {status === "unauthenticated" && (
              <Link href="/api/auth/signin">Login</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
