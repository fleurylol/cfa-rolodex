"use client";
import { businessSchema } from "@/app/api/business/businessSchema";
import {
  AlertDialogContent,
  AlertDialogRoot,
  AlertDialogTrigger,
  Button,
  Grid,
  TextFieldInput,
  TextFieldRoot,
  Text,
  AlertDialogAction,
  AlertDialogCancel,
  Flex,
} from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ErrorMessage } from "@/app/components";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Business } from "@prisma/client";
type BusinessFormData = z.infer<typeof businessSchema>;

const EditBusinessButton = ({ business }: { business: Business }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BusinessFormData>({
    resolver: zodResolver(businessSchema),
  });
  const onSubmit = handleSubmit(async (data) => {
    try {
      await axios.patch(`/api/business/${business.id}`, data);
      router.push(`/business/${business.id}`);
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  });
  return (
    <AlertDialogRoot>
      <AlertDialogTrigger>
        <Button color="green">
          <Pencil2Icon />
          Edit Business
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <form onSubmit={onSubmit}>
          <Text>Edit Business</Text>
          <Grid gap="3" mb="2">
            <TextFieldRoot>
              <TextFieldInput
                placeholder="Business Name"
                defaultValue={business.name}
                {...register("name")}
              />
            </TextFieldRoot>
            <ErrorMessage>{errors.name?.message}</ErrorMessage>
            <TextFieldRoot>
              <TextFieldInput
                placeholder="Business Address"
                defaultValue={business.address}
                {...register("address")}
              />
            </TextFieldRoot>
            <ErrorMessage>{errors.address?.message}</ErrorMessage>
          </Grid>

          <Flex mt="4" gap={"3"}>
            <AlertDialogAction>
              <Button color="blue" type="submit">
                Update
              </Button>
            </AlertDialogAction>
            <AlertDialogCancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialogCancel>
          </Flex>
        </form>
      </AlertDialogContent>
    </AlertDialogRoot>
  );
};

export default EditBusinessButton;
