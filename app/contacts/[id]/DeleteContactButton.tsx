import { Button } from "@radix-ui/themes";
import { TrashIcon } from "@radix-ui/react-icons";

const DeleteContactButton = ({ contactId }: { contactId: number }) => {
  return (
    <Button>
      <TrashIcon /> Delete Contact
    </Button>
  );
};

export default DeleteContactButton;
