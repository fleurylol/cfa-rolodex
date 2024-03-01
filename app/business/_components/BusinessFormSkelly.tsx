import { Box, Heading } from "@radix-ui/themes";
import React from "react";
import { Skeleton } from "@/app/components";

const BusinessFormSkelly = () => {
  return (
    <>
      <Box className="ml-auto mr-auto sm:w-full md:w-7/12">
        <Heading>
          <Skeleton width={"20rem"} height={"30px"} />
        </Heading>
        <form>
          <Skeleton height={"50px"} />
          <Skeleton height={"50px"} />
        </form>
      </Box>
    </>
  );
};

export default BusinessFormSkelly;
