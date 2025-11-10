import { z } from "zod";
import { packageStatusSchema } from "./schema";

export type packageStatusTypes = z.infer<typeof packageStatusSchema>;