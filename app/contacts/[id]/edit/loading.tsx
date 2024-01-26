import { Skeleton } from "@/app/components";
import { Box, Card, Flex, Grid } from "@radix-ui/themes";

const EditContactDetailsLoading = () => {
  return (
    <Box>
      <Grid className="max-w-xl">
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Flex gap={"3"}>
          <Skeleton width={"20rem"} />
          <Skeleton width={"20rem"} />
        </Flex>
      </Grid>
      <Card className="prose" mt="4">
        <Skeleton count={3} />
      </Card>
    </Box>
  );
};

export default EditContactDetailsLoading;
