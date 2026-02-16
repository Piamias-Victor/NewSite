import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { z } from "zod"
import { contactFormSchema } from "@/lib/validations/contact"
import { rateLimit, getClientIp } from "@/lib/rate-limit"
import { getContactEmailHtml, getContactEmailText } from "@/lib/email-template"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    // 1. Rate limiting
    const clientIp = getClientIp(request)
    if (!rateLimit(clientIp)) {
      return NextResponse.json(
        { error: "Trop de requêtes. Veuillez réessayer dans 1 heure." },
        { status: 429 }
      )
    }

    // 2. Parse et valider le body
    const body = await request.json()
    const validatedData = contactFormSchema.parse(body)

    // 3. Envoyer l'email via Resend
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: process.env.RESEND_TO_EMAIL!,
      subject: `Nouveau contact : ${validatedData.prenom} - ${validatedData.pharmacie || 'Pharmacie'}`,
      html: getContactEmailHtml(validatedData),
      text: getContactEmailText(validatedData),
      replyTo: validatedData.email,
    })

    if (error) {
      console.error("Erreur Resend:", error)
      return NextResponse.json(
        { error: "Erreur lors de l'envoi de l'email" },
        { status: 500 }
      )
    }

    // 4. Log de succès
    console.log(`✅ Email envoyé à ${process.env.RESEND_TO_EMAIL} (ID: ${data?.id})`, {
      from: validatedData.prenom,
      email: validatedData.email,
    })

    // 5. Réponse de succès
    return NextResponse.json(
      { success: true, message: "Email envoyé avec succès" },
      { status: 200 }
    )

  } catch (error: unknown) {
    // Erreur de validation Zod
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Données invalides", details: error.issues },
        { status: 400 }
      )
    }

    // Erreur serveur
    console.error("Erreur API contact:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}
