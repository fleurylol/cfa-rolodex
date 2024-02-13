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
type BusinessFormData = z.infer<typeof businessSchema>;

const BusinessFormButton = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BusinessFormData>({
    resolver: zodResolver(businessSchema),
  });
  const name = watch("name");
  const address = watch("address");
  const isSubmitable = !name || !address;
  const onSubmit = handleSubmit(async (data) => {
    try {
      await axios.post("/api/business", data);
      router.push("/business/list");
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  });
  return (
    <AlertDialogRoot>
      <AlertDialogTrigger>
        <Button>Create Business</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <form onSubmit={onSubmit}>
          <Text>Create New Business</Text>
          <Grid gap="3" mb="2">
            <TextFieldRoot>
              <TextFieldInput
                placeholder="Business Name"
                {...register("name")}
              />
            </TextFieldRoot>
            <ErrorMessage>{errors.name?.message}</ErrorMessage>
            <TextFieldRoot>
              <TextFieldInput
                placeholder="Business Address"
                {...register("address")}
              />
            </TextFieldRoot>
            <ErrorMessage>{errors.address?.message}</ErrorMessage>
          </Grid>

          <Flex mt="4" gap={"3"}>
            <AlertDialogAction>
              <Button color="blue" type="submit" disabled={isSubmitable}>
                Create
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

export default BusinessFormButton;
