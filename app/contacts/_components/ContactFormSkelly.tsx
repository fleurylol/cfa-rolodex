import { Box, Grid, Heading } from "@radix-ui/themes";
import React from "react";
import { Skeleton } from "@/app/components";

const ContactFormSkelly = () => {
  return (
    <>
      <form className="space-y-3">
        <Heading>
          <Skeleton width={"20rem"} height={"30px"} />
        </Heading>
        <Box>
          <Skeleton height={"3rem"} />
        </Box>
        <Grid columns="2" gap="2">
          <Box>
            <Skeleton height={"3rem"} />
          </Box>
          <Box>
            <Skeleton height={"3rem"} />
          </Box>
        </Grid>
        <Grid columns="2" gap="2">
          <Box>
            <Skeleton height={"3rem"} />
          </Box>
          <Box>
            <Skeleton height={"3rem"} />
          </Box>
        </Grid>
        <Box>
          <Skeleton height={"2rem"} width={"160px"} />
          <Skeleton height={"2rem"} width={"80px"} />
        </Box>
      </form>
    </>
  );
};

export default ContactFormSkelly;
