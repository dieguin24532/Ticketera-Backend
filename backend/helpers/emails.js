import sgMail from "@sendgrid/mail";

const enviarEmail = async (archivo, ticket) => {
  const pedido = ticket.pedido;
  const evento = ticket.evento;
  
  const adjunto = preparaArchivoPDF(archivo);

  sgMail.setApiKey(process.env.SENDGRID_HOST_EMAIL);

  const msg = {
    to: "dieguin24532tc@gmail.com",
    from: process.env.SENDGRID_HOST_EMAIL,
    subject: `Entrada a ${evento.nombre_evento}`,
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    attachments: [
      adjunto
    ]
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email enviado");
    })
    .catch((error) => {
      console.error(error);
    });
};

const preparaArchivoPDF = () => {
    const PDF = Buffer.from(archivo).toString('base64')
    return {
    content: archivoBase64,
    filename: `${ticket.etiqueta}.pdf`,
    type: 'application/pdf',
    disposition: 'attachment'
  }
}

export { enviarEmail };
