"use client";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
} from "@radix-ui/themes";
import React from "react";
import { Business, Contact } from "@prisma/client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/app/components";

const BusinessSelect = ({ contact }: { contact: Contact }) => {
  const { data: businesses, error, isLoading } = useBusiness();

  if (isLoading) return <Skeleton />;

  if (error) return null;
  const assignBusiness = (businessId: string) => {
    const businessIdInt = parseInt(businessId);
    axios.patch(`/api/contacts/${contact.id}`, {
      businessId: businessIdInt || null,
    });
  };
  return (
    <>
      <SelectRoot
        defaultValue={contact.businessId?.toString() || ""}
        onValueChange={assignBusiness}
      >
        <SelectTrigger placeholder="Assign..." />
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Business</SelectLabel>
            <SelectItem value="0">Unassaign</SelectItem>
            {businesses?.map((business) => (
              <SelectItem key={business.id} value={business.id.toString()}>
                {business.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </SelectRoot>
    </>
  );
};

const useBusiness = () =>
  useQuery<Business[]>({
    queryKey: ["name"],
    queryFn: () => axios.get("/api/business").then((res) => res.data),
    staleTime: 60 * 1000, //60s
    retry: 3,
  });

export default BusinessSelect;
