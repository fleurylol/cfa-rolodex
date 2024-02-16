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
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const BusinessSelect = ({ contact }: { contact: Contact }) => {
  const router = useRouter();
  const { data: businesses, error, isLoading } = useBusiness();

  if (isLoading) return <Skeleton />;

  if (error) return null;
  const assignBusiness = (businessId: string) => {
    const businessIdInt = parseInt(businessId);
    axios
      .patch(`/api/contacts/${contact.id}`, {
        businessId: businessIdInt || null,
      }) 
      .catch(() => {
        toast.error("Changes could not be saved.");
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
      <Toaster />
    </>
  );
};

const useBusiness = () =>
  useQuery<Business[]>({
    queryKey: ["name"],
    queryFn: () => axios.get("/api/business").then((res) => res.data),
  });

export default BusinessSelect;
