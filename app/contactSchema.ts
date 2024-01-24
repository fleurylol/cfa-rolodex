import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Vaild email is required"),
  phone: z.string().min(1, "A phone number is required"),
  address: z.string().min(1, "An address is required"),
  business: z.string().min(1, "A business name is required"),
  notes: z.string(),
});
