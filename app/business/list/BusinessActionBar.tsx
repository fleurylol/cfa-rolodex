import { Flex } from "@radix-ui/themes";
import BusinessFormButton from "./BusinessFormButton";
import SearchBar from "@/app/components/SearchBar";

const BusinessActionBar = () => {
  return (
    <Flex justify={"between"}>
      <BusinessFormButton />
      {/* <SearchBar /> */}
    </Flex>
  );
};

export default BusinessActionBar;
