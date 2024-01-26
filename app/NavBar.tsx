"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { BsPersonRolodex } from "react-icons/bs";
import classnames from "classnames";

const NavBar = () => {
  const currentPath = usePathname();
  const links = [
    { label: "Home", href: "/" },
    { label: "Contacts", href: "/contacts/list" },
  ];
  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center bg-red-600">
      <Link href="/">
        <BsPersonRolodex color="white" />
      </Link>
      <ul className="flex space-x-6 ">
        {links.map((link) => (
          <Link
            key={link.href}
            className={classnames({
              underline: link.href === currentPath,
              "no-underline": link.href !== currentPath,
              "hover:text-red-300 text-white transition-colors": true,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
