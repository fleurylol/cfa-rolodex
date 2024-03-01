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
import { BackpackIcon } from "@radix-ui/react-icons";
import { Business } from "@prisma/client";
import { Map } from "lucide-react";
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
          label="Name"
          variant="underlined"
          color="danger"
          {...register("name")}
          startContent={
            <BackpackIcon className="pointer-events-none flex-shrink-0 text-2xl text-default-400" />
          }
        />
        <ErrorMessage>{errors.name?.message}</ErrorMessage>
        <Input
          defaultValue={business?.address}
          label="Address"
          variant="underlined"
          startContent={<Map size={16} color="#a1a1aa" strokeWidth={1} />}
          color="danger"
          {...register("address")}
        />
        <ErrorMessage>{errors.address?.message}</ErrorMessage>
        <br></br>
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
