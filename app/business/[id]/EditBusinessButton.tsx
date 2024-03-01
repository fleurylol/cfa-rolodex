import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

const EditBusinessButton = ({ businessId }: { businessId: number }) => {
  return (
    <Button color="green">
      <Pencil2Icon />
      <Link href={`/business/edit/${businessId}`}>Edit Business</Link>
    </Button>
  );
};

export default EditBusinessButton;
