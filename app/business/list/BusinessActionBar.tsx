import { Button, Flex } from "@radix-ui/themes";
import BusinessFormButton from "./BusinessFormButton";
import SearchBar from "@/app/components/SearchBar";
import Link from "next/link";

const BusinessActionBar = () => {
  return (
    <Flex justify={"between"}>
      <Button>
        <Link href="/business/new">New Business</Link>
      </Button>
      {/* <SearchBar /> */}
    </Flex>
  );
};

export default BusinessActionBar;
