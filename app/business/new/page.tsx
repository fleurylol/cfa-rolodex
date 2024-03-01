"use client";
import BusinessForm from "../_components/BusinessForm";
import { Box } from "@radix-ui/themes";
import delay from "delay";

const NewBusinessPage = async () => {
  await delay(2000);
  return (
    <Box className="ml-auto mr-auto sm:w-full md:w-7/12">
      <BusinessForm />
    </Box>
  );
};

export default NewBusinessPage;
