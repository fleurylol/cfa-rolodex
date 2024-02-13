"use client";
import { Spinner } from "@/app/components";
import { Business, Contact } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import ContactBox from "./ContactBox";

const ContactList = ({ business }: { business: Business }) => {
  const {
    data: contacts,
    error,
    isLoading,
  } = useQuery<Contact[]>({
    queryKey: ["contacts", business.id],
    queryFn: () =>
      axios
        .get(`/api/business/contacts/${business.id}`)
        .then((res) => res.data),
  });
  return (
    <>
      {isLoading && (
        <>
          <p>Loading contacts... </p>
          <Spinner />
        </>
      )}
      {error && <p>Error loading contacts: {error.message}</p>}
      {contacts &&
        contacts?.map((contact: Contact) => (
          <ContactBox
            key={contact.id}
            contactId={contact.id}
            name={contact.name}
            image={contact.image!}
          />
        ))}
      {contacts && contacts.length === 0 && <p>No contacts yet</p>}
    </>
  );
};

export default ContactList;
