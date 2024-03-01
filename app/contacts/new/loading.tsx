import { Box } from "@radix-ui/themes";
import ContactFormSkelly from "../_components/ContactFormSkelly";

const loading = () => {
  return (
    <Box className="ml-auto mr-auto sm:w-full md:w-7/12">
      <ContactFormSkelly />
    </Box>
  );
};

export default loading;
