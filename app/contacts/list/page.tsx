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
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import Pagination from "../_components/Pagination";

export interface ContactQuery {
  orderBy: keyof Contact;
  sortDirection: "asc" | "desc";
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
    ? { [searchParams.orderBy]: searchParams.sortDirection || "asc" }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const contacts = await prisma.contact.findMany({
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const contactCount = await prisma.contact.count();

  return (
    <div>
      <ContactActionBar />
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
      <Pagination
        itemCount={contactCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </div>
  );
};
export default ContactsPage;
