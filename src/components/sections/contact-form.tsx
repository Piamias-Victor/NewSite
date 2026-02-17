"use client";

import { useState } from "react";
import { z } from "zod";
import { Container, Section } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FadeIn } from "@/components/animations";
import { CheckCircle2, Mail, Phone, Building2, MapPin, Server } from "lucide-react";
import { contactFormSchema } from "@/lib/validations/contact";

export function ContactForm() {
  const [formData, setFormData] = useState({
    prenom: "",
    email: "",
    telephone: "",
    lgo: "",
    pharmacie: "",
    ville: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setApiError(null);

    try {
      // Validation côté client avec Zod
      const validatedData = contactFormSchema.parse(formData);

      // Appel API
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validatedData),
      });

      const data = await response.json();

      if (!response.ok) {
        // Gestion des erreurs API
        if (response.status === 429) {
          setApiError("Trop de tentatives. Veuillez réessayer plus tard.");
        } else if (data.details) {
          // Erreurs de validation serveur
          const fieldErrors: Record<string, string> = {};
          data.details.forEach((err: { path: (string | number)[]; message: string }) => {
            const fieldName = err.path[0];
            if (typeof fieldName === "string") {
              fieldErrors[fieldName] = err.message;
            }
          });
          setErrors(fieldErrors);
        } else {
          setApiError(data.error || "Une erreur est survenue lors de l'envoi.");
        }
      } else {
        // Succès
        setIsSuccess(true);

        // Reset après 3 secondes
        setTimeout(() => {
          setIsSuccess(false);
          setFormData({
            prenom: "",
            email: "",
            telephone: "",
            lgo: "",
            pharmacie: "",
            ville: "",
            message: "",
          });
        }, 3000);
      }
    } catch (error: unknown) {
      // Erreur de validation Zod côté client
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.issues.forEach((err) => {
          if (err.path[0]) fieldErrors[err.path[0].toString()] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        setApiError("Une erreur est survenue lors de la validation.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Section id="contact" className="relative z-10 w-full py-24 border-t border-white/5 pt-8">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Motivational Content */}
          <FadeIn>
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold leading-tight mb-4">
                  <span className="adaptive-text-primary">Prêt à transformer</span>{" "}
                  <span className="text-gradient">votre officine ?</span>
                </h2>
                <p className="text-2xl adaptive-text-description font-light">
                  Audit / échange gratuit
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary mt-1 shrink-0" />
                  <div>
                    <h3 className="font-bold adaptive-text-primary mb-1">Réponse sous 24h</h3>
                    <p className="adaptive-text-description text-sm">
                      Notre équipe vous contacte rapidement pour échanger sur vos besoins.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary mt-1 shrink-0" />
                  <div>
                    <h3 className="font-bold adaptive-text-primary mb-1">Audit personnalisé</h3>
                    <p className="adaptive-text-description text-sm">
                      Analyse gratuite de votre potentiel d&apos;optimisation.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary mt-1 shrink-0" />
                  <div>
                    <h3 className="font-bold adaptive-text-primary mb-1">Sans engagement</h3>
                    <p className="adaptive-text-description text-sm">
                      Aucune obligation, juste un échange constructif sur votre projet.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5">
                <p className="adaptive-text-description text-sm italic">
                  &quot;J&apos;ai été contacté en 2h, l&apos;équipe a pris le temps de comprendre mes besoins. Très pro !&quot;
                  <br />
                  <span className="text-primary font-medium">— Sophie M., Pharmacienne</span>
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Right - Form */}
          <FadeIn delay={0.2}>
            <div className="bento-card-bg p-8 rounded-2xl">
              {isSuccess ? (
                <div className="text-center py-12">
                  <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold adaptive-text-primary mb-2">
                    Message envoyé !
                  </h3>
                  <p className="adaptive-text-description">
                    Nous vous recontactons très rapidement.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {apiError && (
                    <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded-lg">
                      {apiError}
                    </div>
                  )}

                  {/* Required Fields */}
                  <div>
                    <label htmlFor="prenom" className="block text-sm font-medium adaptive-text-primary mb-2">
                      Prénom <span className="text-primary">*</span>
                    </label>
                    <Input
                      id="prenom"
                      name="prenom"
                      type="text"
                      required
                      value={formData.prenom}
                      onChange={handleChange}
                      placeholder="Jean"
                      className="w-full"
                      error={errors.prenom}
                    />
                    {errors.prenom && (
                      <p className="text-sm text-destructive mt-1">{errors.prenom}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium adaptive-text-primary mb-2">
                      Email <span className="text-primary">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="jean@pharmacie.fr"
                        className="w-full pl-10"
                        error={errors.email}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-sm text-destructive mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="telephone" className="block text-sm font-medium adaptive-text-primary mb-2">
                      Téléphone <span className="text-primary">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="telephone"
                        name="telephone"
                        type="tel"
                        required
                        value={formData.telephone}
                        onChange={handleChange}
                        placeholder="06 12 34 56 78"
                        className="w-full pl-10"
                        error={errors.telephone}
                      />
                    </div>
                    {errors.telephone && (
                      <p className="text-sm text-destructive mt-1">{errors.telephone}</p>
                    )}
                  </div>

                  {/* Optional Fields */}
                  <div className="pt-4 border-t border-white/5">
                    <p className="text-sm adaptive-text-description mb-4">Informations complémentaires (optionnel)</p>

                    <div className="space-y-4">
                      <div>
                        <label htmlFor="lgo" className="block text-sm font-medium adaptive-text-primary mb-2">
                          LGO utilisé
                        </label>
                        <div className="relative">
                          <Server className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <Input
                            id="lgo"
                            name="lgo"
                            type="text"
                            value={formData.lgo}
                            onChange={handleChange}
                            placeholder="Winpharma, LGPI..."
                            className="w-full pl-10"
                            error={errors.lgo}
                          />
                        </div>
                        {errors.lgo && (
                          <p className="text-sm text-destructive mt-1">{errors.lgo}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="pharmacie" className="block text-sm font-medium adaptive-text-primary mb-2">
                          Nom de la pharmacie
                        </label>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <Input
                            id="pharmacie"
                            name="pharmacie"
                            type="text"
                            value={formData.pharmacie}
                            onChange={handleChange}
                            placeholder="Pharmacie du Centre"
                            className="w-full pl-10"
                            error={errors.pharmacie}
                          />
                        </div>
                        {errors.pharmacie && (
                          <p className="text-sm text-destructive mt-1">{errors.pharmacie}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="ville" className="block text-sm font-medium adaptive-text-primary mb-2">
                          Ville
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <Input
                            id="ville"
                            name="ville"
                            type="text"
                            value={formData.ville}
                            onChange={handleChange}
                            placeholder="Paris"
                            className="w-full pl-10"
                            error={errors.ville}
                          />
                        </div>
                        {errors.ville && (
                          <p className="text-sm text-destructive mt-1">{errors.ville}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium adaptive-text-primary mb-2">
                          Message
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Décrivez brièvement votre besoin..."
                          rows={4}
                          className="w-full"
                          error={errors.message}
                        />
                        {errors.message && (
                          <p className="text-sm text-destructive mt-1">{errors.message}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full rounded-full"
                  >
                    {isSubmitting ? "Envoi en cours..." : "Réserver mon audit gratuit"}
                  </Button>

                  <p className="text-xs adaptive-text-description text-center">
                    En soumettant ce formulaire, vous acceptez d&apos;être contacté par Phardev.
                  </p>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
}
