import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "../../components/ui/Button";
import Link from "next/link";

const EditBusinessButton = ({ businessId }: { businessId: number }) => {
  return (
    <Button variant="edit">
      <Pencil2Icon className="mr-2 h-4 w-4" />
      <Link href={`/business/edit/${businessId}`}>Edit Business</Link>
    </Button>
  );
};

export default EditBusinessButton;
