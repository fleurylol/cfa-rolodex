import { Metadata } from "next";
import BusinessForm from "../_components/BusinessForm";
import { Box } from "@radix-ui/themes";

const NewBusinessPage = () => {
  return (
    <Box className="ml-auto mr-auto sm:w-full md:w-7/12">
      <BusinessForm />
    </Box>
  );
};

export const metadata: Metadata = {
  title: "New Business",
  description: "Page for new business creation.",
};

export default NewBusinessPage;
