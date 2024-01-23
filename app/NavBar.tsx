import Link from "next/link";
import React from "react";
import { BsPersonRolodex } from "react-icons/bs";

const NavBar = () => {
  const links = [
    { label: "Home", href: "/" },
    { label: "Contacts", href: "/contacts" },
  ];
  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center bg-red-600 text-white">
      <Link href="/">
        <BsPersonRolodex />
      </Link>
      <ul className="flex space-x-6 ">
        {links.map((link) => (
          <Link
            key={link.href}
            className="hover:text-zinc-400 transition-colors"
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
