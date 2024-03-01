import {
  TableRoot,
  TableHeader,
  TableRow,
  TableColumnHeaderCell,
  TableBody,
  TableCell,
} from "@radix-ui/themes";
import React from "react";
import { Skeleton } from "@/app/components";
import BusinessActionBar from "./BusinessActionBar";

const BusinessLoadingSkelly = () => {
  const business = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div>
      <BusinessActionBar />
      <TableRoot variant="surface">
        <TableHeader>
          <TableRow>
            <TableColumnHeaderCell>Business</TableColumnHeaderCell>
            <TableColumnHeaderCell>Address</TableColumnHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {business.map((business) => (
            <TableRow key={business}>
              <TableCell>
                <Skeleton />
              </TableCell>
              <TableCell>
                <Skeleton />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableRoot>
    </div>
  );
};
export default BusinessLoadingSkelly;
