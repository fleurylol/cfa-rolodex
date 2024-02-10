import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Vaild email is required"),
  phone: z.string().min(1, "A phone number is required"),
  address: z.string().min(1, "An address is required"),
  businessName: z.string().min(1, "A business name is required"),
  image: z.string().url("A valid image URL is required").optional(),
});
export const patchContactSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  email: z.string().email("Vaild email is required").optional(),
  phone: z.string().min(1, "A phone number is required").optional(),
  address: z.string().min(1, "An address is required").optional(),
  businessName: z.string().min(1, "A business name is required").optional(),
  image: z.string().url("A valid image URL is required").optional().nullable(),
});
