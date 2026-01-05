import { z } from "zod";
import { VerificationStatus } from "@prisma/client";

const createSpecialistZodSchema = z.object({
    body: z.object({
        title: z.string().min(1, "Title is required"),
        slug: z.string().min(1, "Slug is required"),
        description: z.string().optional(),
        base_price: z.number(),
        platform_fee: z.number(),
        final_price: z.number(),
        verification_status: z
            .nativeEnum(VerificationStatus)
            .optional(),
        is_verified: z.boolean().optional(),
        is_draft: z.boolean().optional(),
        duration_days: z.number().optional(),
        service_offerings: z.array(z.object({
            name: z.string().optional(),
            category: z.string().optional(),
        })).optional(),
        media: z.array(z.string()).optional(),
    }),
});

const updateSpecialistZodSchema = z.object({
    body: z.object({
        title: z.string().optional(),
        slug: z.string().optional(),
        description: z.string().optional(),
        base_price: z.number().optional(),
        platform_fee: z.number().optional(),
        final_price: z.number().optional(),
        verification_status: z
            .nativeEnum(VerificationStatus)
            .optional(),
        is_verified: z.boolean().optional(),
        is_draft: z.boolean().optional(),
        duration_days: z.number().optional(),
    }),
});

export const SpecialistValidation = {
    createSpecialistZodSchema,
    updateSpecialistZodSchema,
};
