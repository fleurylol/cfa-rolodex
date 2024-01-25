import {
  TableRoot,
  TableHeader,
  TableRow,
  TableColumnHeaderCell,
  TableBody,
  TableCell,
} from "@radix-ui/themes";
import React from "react";
import ContactActionBar from "./ContactActionBar";
import { Skeleton } from "@/app/components";

const ContactLoadingSkeleton = () => {
  const contacts = [1, 2, 3, 4, 5];
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
            <TableRow key={contact}>
              <TableCell>
                <Skeleton />
              </TableCell>
              <TableCell>
                <Skeleton />
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Skeleton />
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Skeleton />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableRoot>
    </div>
  );
};
export default ContactLoadingSkeleton;
