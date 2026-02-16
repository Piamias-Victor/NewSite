export function getContactEmailHtml(data: {
  prenom: string
  email: string
  telephone: string
  lgo?: string | undefined
  pharmacie?: string | undefined
  ville?: string | undefined
  message?: string | undefined
}): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #c87941 0%, #d4956d 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #c87941; }
    .value { margin-top: 5px; }
    .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2 style="margin: 0;">📧 Nouvelle demande de contact - Phardev</h2>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Prénom :</div>
        <div class="value">${data.prenom}</div>
      </div>
      <div class="field">
        <div class="label">Email :</div>
        <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
      </div>
      <div class="field">
        <div class="label">Téléphone :</div>
        <div class="value"><a href="tel:${data.telephone.replace(/\s/g, '')}">${data.telephone}</a></div>
      </div>
      ${data.lgo ? `
      <div class="field">
        <div class="label">LGO utilisé :</div>
        <div class="value">${data.lgo}</div>
      </div>
      ` : ''}
      ${data.pharmacie ? `
      <div class="field">
        <div class="label">Nom de la pharmacie :</div>
        <div class="value">${data.pharmacie}</div>
      </div>
      ` : ''}
      ${data.ville ? `
      <div class="field">
        <div class="label">Ville :</div>
        <div class="value">${data.ville}</div>
      </div>
      ` : ''}
      ${data.message ? `
      <div class="field">
        <div class="label">Message :</div>
        <div class="value">${data.message.replace(/\n/g, '<br>')}</div>
      </div>
      ` : ''}
      <div class="footer">
        Reçu le ${new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })}
      </div>
    </div>
  </div>
</body>
</html>
  `
}

export function getContactEmailText(data: {
  prenom: string
  email: string
  telephone: string
  lgo?: string | undefined
  pharmacie?: string | undefined
  ville?: string | undefined
  message?: string | undefined
}): string {
  return `
Nouvelle demande de contact - Phardev

Prénom : ${data.prenom}
Email : ${data.email}
Téléphone : ${data.telephone}
${data.lgo ? `LGO utilisé : ${data.lgo}` : ''}
${data.pharmacie ? `Nom de la pharmacie : ${data.pharmacie}` : ''}
${data.ville ? `Ville : ${data.ville}` : ''}
${data.message ? `Message : ${data.message}` : ''}

Reçu le ${new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })}
  `.trim()
}
