import { z } from "zod";

export const commentSchema = z.object({
  comment: z.string().min(1, "A comment is required"),
});
