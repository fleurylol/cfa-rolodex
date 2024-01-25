import { Skeleton } from "@/app/components";
import { Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { MdLocalPhone, MdOutlineAlternateEmail } from "react-icons/md";

const loading = () => {
  return (
    <>
      <Grid className="max-w-xl">
        <Heading></Heading>
        <Text size="4">
          <Skeleton />
        </Text>
        <Text>
          <Skeleton />
        </Text>
        <Flex gap={"3"}>
          <MdLocalPhone size={"24"} />{" "}
          <Text>
            <Skeleton />
          </Text>
          <MdOutlineAlternateEmail size={"24"} />{" "}
          <Text>
            <Skeleton />
          </Text>
        </Flex>
      </Grid>
      <Card className="prose" mt="4">
        <Skeleton count={3} />
      </Card>
    </>
  );
};

export default loading;
