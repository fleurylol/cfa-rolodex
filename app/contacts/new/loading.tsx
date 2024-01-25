import { Skeleton } from "@/app/components";
import { Box, Grid } from "@radix-ui/themes";

const NewContactLoadingPage = () => {
  return (
    <>
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
        <Skeleton height={"20rem"} />
      </div>
    </>
  );
};

export default NewContactLoadingPage;
