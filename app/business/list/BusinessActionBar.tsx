import { Flex } from "@radix-ui/themes";
import SearchBar from "@/app/contacts/_components/searchBar/SearchBar";
import Link from "next/link";
import { Button } from "../../components/ui/Button";

const BusinessActionBar = () => {
  return (
    <Flex justify={"between"}>
      <Button variant={"default"}>
        <Link href="/business/new">New Business</Link>
      </Button>
      {/* <SearchBar /> */}
    </Flex>
  );
};

export default BusinessActionBar;
