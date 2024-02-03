import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Vaild email is required"),
  phone: z.string().min(1, "A phone number is required"),
  address: z.string().min(1, "An address is required"),
  business: z.string().min(1, "A business name is required"),
  notes: z.string(),
  image: z.string().url("A valid image URL is required").optional(),
});
export const patchContactSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  email: z.string().email("Vaild email is required").optional(),
  phone: z.string().min(1, "A phone number is required").optional(),
  address: z.string().min(1, "An address is required").optional(),
  business: z.string().min(1, "A business name is required").optional(),
  notes: z.string().optional(),
  image: z.string().url("A valid image URL is required").optional().nullable(),
});
