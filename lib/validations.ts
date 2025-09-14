import { z } from 'zod';

// Domain validation schema
export const domainSchema = z.object({
  domain: z
    .string()
    .min(1, 'Domain is required')
    .min(3, 'Domain must be at least 3 characters')
    .max(253, 'Domain must be less than 253 characters')
    .regex(
      /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      'Please enter a valid domain name (e.g., example.com)'
    )
});

// Email validation schema
export const emailSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(254, 'Email must be less than 254 characters')
});

export type DomainFormData = z.infer<typeof domainSchema>;
export type EmailFormData = z.infer<typeof emailSchema>;
