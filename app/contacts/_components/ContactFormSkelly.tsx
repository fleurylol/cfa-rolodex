import { Box, Grid } from "@radix-ui/themes";
import React from "react";
import { Skeleton } from "@/app/components";

const ContactFormSkelly = () => {
  return (
    <div className="max-w-xl">
      <Box>
        <Skeleton height={"2rem"} />
      </Box>
      <Grid columns="2" gap="3">
        <Box>
          <Skeleton height={"2rem"} />
        </Box>
        <Box>
          <Skeleton height={"2rem"} />
        </Box>
      </Grid>
      <Grid columns="2" gap="3">
        <Box>
          <Skeleton height={"2rem"} />
        </Box>
        <Box>
          <Skeleton height={"2rem"} />
        </Box>
      </Grid>
    </div>
  );
};

export default ContactFormSkelly;
