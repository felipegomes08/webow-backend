import {z} from "zod";

export const UpdateConfigurationDto = z.object({
    pixel: z.string().optional(),
    system: z.record(z.any()).optional(),
    interface: z.record(z.any()).optional()
})