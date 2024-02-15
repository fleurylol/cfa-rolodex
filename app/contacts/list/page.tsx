import prisma from "@/prisma/client";
import {
  TableBody,
  TableCell,
  TableColumnHeaderCell,
  TableHeader,
  TableRoot,
  TableRow,
} from "@radix-ui/themes";
import { Link } from "../../components";
import NextLink from "next/link";
import ContactActionBar from "./ContactActionBar";
import { Contact } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";

export interface ContactQuery {
  orderBy: keyof Contact;
  page: string;
}

interface Props {
  searchParams: ContactQuery;
  contacts: Contact[];
}

const columns: { label: string; value: keyof Contact; className?: string }[] = [
  { label: "Name", value: "name" },
  { label: "Business", value: "businessName" },
  { label: "Address", value: "address", className: "hidden md:table-cell" },
  { label: "Phone", value: "phone", className: "hidden md:table-cell" },
];

const ContactsPage = async ({ searchParams }: Props) => {
  const orderBy = columns
    .map((coloumn) => coloumn.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const contacts = await prisma.contact.findMany({
    orderBy,
  });

  return (
    <div>
      <ContactActionBar />
      <TableRoot variant="surface">
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableColumnHeaderCell key={column.value}>
                <NextLink href={`/contacts/list?orderBy=${column.value}`}>
                  {column.label}
                </NextLink>
                {column.value === searchParams.orderBy && (
                  <ArrowUpIcon className="inline" />
                )}
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
    </div>
  );
};
export default ContactsPage;
