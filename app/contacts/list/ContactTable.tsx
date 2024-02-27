import { Contact } from "@prisma/client";
import { ArrowUpIcon, ArrowDownIcon } from "@radix-ui/react-icons";
import {
  TableRoot,
  TableHeader,
  TableRow,
  TableColumnHeaderCell,
  TableBody,
  TableCell,
} from "@radix-ui/themes";
import NextLink from "next/link";
import React from "react";
import { Link } from "../../components";


export interface ContactQuery {
  orderBy: keyof Contact;
  sortDirection: "asc" | "desc";
  page: string;
}

interface Props {
  searchParams: ContactQuery;
  contacts: Contact[];
}
const ContactTable = ({ searchParams, contacts }: Props) => {
  return (
    <TableRoot variant="surface">
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableColumnHeaderCell
              key={column.value}
              className={column.className}
            >
              <NextLink
                href={`/contacts/list?orderBy=${column.value}&sortDirection=${
                  column.value === searchParams.orderBy &&
                  searchParams.sortDirection === "asc"
                    ? "desc"
                    : "asc"
                }`}
              >
                {column.label}
              </NextLink>
              {column.value === searchParams.orderBy &&
                (searchParams.sortDirection === "asc" ? (
                  <ArrowUpIcon className="inline" />
                ) : (
                  <ArrowDownIcon className="inline" />
                ))}
            </TableColumnHeaderCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {contacts.map((contact) => (
          <TableRow key={contact.id}>
            <TableCell>
              <Link href={`/contacts/${contact.id}`}>{contact.name}</Link>
            </TableCell>
            <TableCell>{contact.businessName}</TableCell>
            <TableCell className="hidden md:table-cell">
              {contact.address}
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {contact.phone}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </TableRoot>
  );
};

const columns: { label: string; value: keyof Contact; className?: string }[] = [
  { label: "Name", value: "name" },
  { label: "Business", value: "businessName" },
  { label: "Address", value: "address", className: "hidden md:table-cell" },
  { label: "Phone", value: "phone", className: "hidden md:table-cell" },
];

export const columnNames = columns.map((column) => column.value);

export default ContactTable;
