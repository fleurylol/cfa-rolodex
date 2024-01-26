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
import ContactActionBar from "./ContactActionBar";

const ContactsPage = async () => {
  const contacts = await prisma.contact.findMany();
  return (
    <div>
      <ContactActionBar />
      <TableRoot variant="surface">
        <TableHeader>
          <TableRow>
            <TableColumnHeaderCell>Name</TableColumnHeaderCell>
            <TableColumnHeaderCell>Business</TableColumnHeaderCell>
            <TableColumnHeaderCell className="hidden md:table-cell">
              Address
            </TableColumnHeaderCell>
            <TableColumnHeaderCell className="hidden md:table-cell">
              Phone
            </TableColumnHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contacts.map((contact) => (
            <TableRow key={contact.id}>
              <TableCell>
                <Link href={`/contacts/${contact.id}`}>{contact.name}</Link>
              </TableCell>
              <TableCell>{contact.business}</TableCell>
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
