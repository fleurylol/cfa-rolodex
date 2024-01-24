import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const ContactActionBar = () => {
  return (
    <div className="mb-5">
      <Button>
        <Link href="/contacts/new">New Contact</Link>
      </Button>
    </div>
  );
};

export default ContactActionBar;
