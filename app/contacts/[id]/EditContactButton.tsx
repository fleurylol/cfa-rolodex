import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

const EditContactButton = ({ contactId }: { contactId: number }) => {
  return (
    <Button color="green">
      <Pencil2Icon />
      <Link href={`/contacts/${contactId}/edit`}>Edit Contact</Link>
    </Button>
  );
};

export default EditContactButton;
