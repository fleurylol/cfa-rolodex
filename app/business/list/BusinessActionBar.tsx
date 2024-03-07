import { Flex } from "@radix-ui/themes";
import SearchBar from "@/app/business/_components/searchBar/SearchBar";
import Link from "next/link";
import { Button } from "../../components/ui/Button";
import { Business } from "@prisma/client";

interface BusinessActionBarProps {
  businesses: Business[];
}

const BusinessActionBar: React.FC<BusinessActionBarProps> = ({
  businesses,
}) => {
  return (
    <Flex justify={"between"}>
      <Button variant={"default"}>
        <Link href="/business/new">New Business</Link>
      </Button>
      <SearchBar businesses={businesses} />
    </Flex>
  );
};

export default BusinessActionBar;
