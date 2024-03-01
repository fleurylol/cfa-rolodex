"use client";
import { businessSchema } from "@/app/api/business/businessSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next13-progressbar";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@nextui-org/react";
import { ErrorMessage, Spinner } from "@/app/components";
import { Button, Heading } from "@radix-ui/themes";
import { Business } from "@prisma/client";

type BusinessFormData = z.infer<typeof businessSchema>;

const BusinessForm = ({ business }: { business?: Business }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [error, setError] = useState("");
  const [isSumbitting, setSubmitting] = useState(false);
  const userEmail = session?.user?.email as string;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BusinessFormData>({
    resolver: zodResolver(businessSchema),
  });
  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      if (business) {
        await axios.patch(`/api/business/${business.id}`, data);
        router.push(`/business/${business.id}`);
      } else {
        await axios.post("/api/business", { ...data, userEmail });
        router.push("/business/list");
        router.refresh();
      }
    } catch (error) {
      setSubmitting(false);
      setError("An unexpected error occured.");
    }
  });
  return (
    <>
      <Heading>
        {" "}
        {business ? `Updating ${business.name}` : "Creating New Business"}
      </Heading>
      <form onSubmit={onSubmit}>
        <Input
          defaultValue={business?.name}
          placeholder="Enter Business Name"
          label="Name"
          variant="underlined"
          color="danger"
          {...register("name")}
        />
        <ErrorMessage>{errors.name?.message}</ErrorMessage>
        <Input
          defaultValue={business?.address}
          placeholder="Enter Business Address"
          label="Address"
          variant="underlined"
          color="danger"
          {...register("address")}
          className="mb-5"
        />
        <ErrorMessage>{errors.address?.message}</ErrorMessage>
        <Button disabled={isSumbitting}>
          {business ? `Update ${business.name}` : "Create Business"}
          {""}
          {isSumbitting && <Spinner />}
        </Button>
      </form>
    </>
  );
};

export default BusinessForm;
