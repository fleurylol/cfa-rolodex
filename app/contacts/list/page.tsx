import prisma from "@/prisma/client";
import { Contact } from "@prisma/client";
import Pagination from "../_components/Pagination";
import ContactActionBar from "./ContactActionBar";
import ContactTable, { ContactQuery, columnNames } from "./ContactTable";
import { Flex } from "@radix-ui/themes";

interface Props {
  searchParams: ContactQuery;
  contacts: Contact[];
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
export default ContactsPage;
