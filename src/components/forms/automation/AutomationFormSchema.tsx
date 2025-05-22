
import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  triggerSource: z.string({
    required_error: "Please select a trigger source.",
  }),
  actionType: z.string({
    required_error: "Please select an action type.",
  }),
  isActive: z.boolean().default(true),
  triggerMethod: z.enum(["onChange", "onInterval"]).default("onChange"),
  triggerInterval: z.string().optional(),
  conditionOperator: z.string().optional(),
  conditionValue: z.string().optional(),
  contractAction: z.string().optional(),
  contractMethods: z.array(z.string()).default([]),
  selectedContract: z.string().optional(),
  contractCode: z.string().optional(),
  contractAbi: z.string().optional(),
  authToken: z.string().optional(),
  contractParams: z.string().optional(),
  paymentAmount: z.string().optional(),
  paymentRecipient: z.string().optional(),
  paymentReason: z.string().optional(),
});

export type FormValues = z.infer<typeof formSchema>;
