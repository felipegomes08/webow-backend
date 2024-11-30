import {z} from "zod";

export const RefreshTokenDto = z.object({
    token: z.string(),
})