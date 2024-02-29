"use client";
import React from "react";
import BusinessForm from "../_components/BusinessForm";
import { Box } from "@radix-ui/themes";

const NewBusinessPage = () => {
  return (
    <Box className="ml-auto mr-auto w-9/12">
      <BusinessForm />
    </Box>
  );
};

export default NewBusinessPage;
