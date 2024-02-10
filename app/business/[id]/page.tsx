import React from "react";
import { Heading } from "@radix-ui/themes";
import prisma from "@/prisma/client";
interface Props {
  params: { id: string };
}

const BusinessDetailPage = async ({ params }: Props) => {
  const business = await prisma.business.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!business) {
    return <div>Business not found</div>;
  }
  const { name, address } = business;
  return (
    <>
      <Heading>{name}</Heading>
      <Heading>{address}</Heading>
    </>
  );
};

export default BusinessDetailPage;
