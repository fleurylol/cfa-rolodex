import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "../../components/ui/Button";
import Link from "next/link";

const EditContactButton = ({ contactId }: { contactId: number }) => {
  return (
    <Button variant="edit">
      <Pencil2Icon className="mr-2 h-4 w-4" />
      <Link href={`/contacts/edit/${contactId}`}>Edit Contact</Link>
    </Button>
  );
};

export default EditContactButton;
