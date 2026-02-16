import { z } from "zod"

export const contactFormSchema = z.object({
  prenom: z.string().min(2, "Le prénom doit contenir au moins 2 caractères").max(50),
  email: z.string().email("Email invalide"),
  telephone: z.string().regex(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/, "Numéro de téléphone invalide"),
  lgo: z.string().max(100).optional(),
  pharmacie: z.string().max(100).optional(),
  ville: z.string().max(100).optional(),
  message: z.string().max(1000).optional(),
})

export type ContactFormData = z.infer<typeof contactFormSchema>
