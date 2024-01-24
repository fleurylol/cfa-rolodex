import { Button } from "@radix-ui/themes";
import Link from "next/link";

const ContactsPage = () => {
  return (
    <div>
      <Button>
        <Link href="/contacts/new">New Contact</Link>
      </Button>
    </div>
  );
};

export default ContactsPage;
