import prisma from "@/prisma/client";
import Pagination from "../../components/Pagination";
import ContactActionBar from "./ContactActionBar";
import ContactTable, { ContactQuery, columnNames } from "./ContactTable";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";

interface Props {
  searchParams: ContactQuery;
}

const ContactsPage = async ({ searchParams }: Props) => {
  const orderBy = columnNames.includes(searchParams.orderBy)
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
    <Flex direction="column" gap="3">
      <ContactActionBar />
      <ContactTable searchParams={searchParams} contacts={contacts} />
      <Pagination
        itemCount={contactCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </Flex>
  );
};

export const metadata: Metadata = {
  title: "CFA Rolodex - Contacts",
  description:
    "A rolodex of our catering guests contact information as as well as other important details.",
};
export default ContactsPage;
