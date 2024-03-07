import Pagination from "@/app/components/Pagination";
import prisma from "@/prisma/client";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";
import BusinessTable, { BusinessQuery } from "./BusinessTable";

interface Props {
  searchParams: BusinessQuery;
}

const BusinessesPage = async ({ searchParams }: Props) => {
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;
  const business = await prisma.business.findMany({
    orderBy: { name: "asc" },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });
  const businessCount = await prisma.business.count();

  return (
    <>
      <Flex direction="column" gap="3">
        <BusinessTable searchParams={searchParams} businesses={business} />
        <Pagination
          itemCount={businessCount}
          pageSize={pageSize}
          currentPage={page}
        />
      </Flex>
    </>
  );
};

export const metadata: Metadata = {
  title: "CFA Rolodex - Businesses",
  description: "A list of businesses that we and their contacts.",
};

export default BusinessesPage;
