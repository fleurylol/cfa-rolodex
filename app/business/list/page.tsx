import React from "react";
import BusinessActionBar from "./BusinessActionBar";
import {
  TableRoot,
  TableHeader,
  TableRow,
  TableColumnHeaderCell,
  TableBody,
  TableCell,
} from "@radix-ui/themes";
import { Link } from "../../components";
import prisma from "@/prisma/client";

const BusinessesPage = async () => {
  const business = await prisma.business.findMany();
  return (
    <>
      <BusinessActionBar />
      <TableRoot variant="surface">
        <TableHeader>
          <TableRow>
            <TableColumnHeaderCell>Business</TableColumnHeaderCell>
            <TableColumnHeaderCell className="hidden md:table-cell">
              Address
            </TableColumnHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {business.map((business) => (
            <TableRow key={business.id}>
              <TableCell>
                <Link href={`/business/${business.id}`}>{business.name}</Link>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {business.address}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableRoot>
    </>
  );
};

export default BusinessesPage;