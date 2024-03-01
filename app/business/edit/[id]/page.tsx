import { Box } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import prisma from "@/prisma/client";

const BusinessForm = dynamic(
  () => import("@/app/business/_components/BusinessForm"),
  { ssr: false },
);

interface Props {
  params: { id: string };
}

const EditBusinessPage = async ({ params }: Props) => {
  const business = await prisma.business.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!business) notFound();
  return (
    <Box className="ml-auto mr-auto sm:w-full md:w-7/12">
      <BusinessForm business={business} />
    </Box>
  );
};

export default EditBusinessPage;
