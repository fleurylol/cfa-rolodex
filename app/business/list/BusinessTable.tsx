import { Business } from "@prisma/client";
import {
    TableBody,
    TableCell,
    TableColumnHeaderCell,
    TableHeader,
    TableRoot,
    TableRow,
    Text,
} from "@radix-ui/themes";
import { Link } from "../../components";

export interface BusinessQuery {
  orderBy: keyof Business;
  sortDirection: "asc";
  page: string;
}

interface Props {
  searchParams: BusinessQuery;
  businesses: Business[];
}

const BusinessTable = ({ searchParams, businesses }: Props) => {
  return (
    <TableRoot variant="surface">
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableColumnHeaderCell
              key={column.value}
              className={column.className}
            >
              <Text>{column.label}</Text>
            </TableColumnHeaderCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {businesses.map((business) => (
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
  );
};

const columns: { label: string; value: keyof Business; className?: string }[] =
  [
    { label: "Business", value: "name" },
    { label: "Address", value: "address", className: "hidden md:table-cell" },
  ];

export const columnNames = columns.map((column) => column.value);

export default BusinessTable;
