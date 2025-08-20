import { ApiResponse } from "../dtos/ApiResponseDTO.js";
import { enviarEmail } from "../helpers/emails.js";
import { ticketService } from "../serviceLayer/ticketsService.js";
import { generarEntradaPDF } from "../helpers/pdf.js";

async function obtenerTickets(req, res) {
  try {
      const pedidos = await ticketService.obtenerTickets();

      if (pedidos.length != 0) {
          
          res.status(200).json(ApiResponse.getResponse(200,'Tickets encontrados', pedidos));
          return;
      }

      res.status(200).json(ApiResponse.getResponse(200,'No existen tickets', pedidos));

  } catch (error) {
    res.status(500).json(ApiResponse.getResponse(500,'Error interno del servidor', null));
  }
}

async function generarEntrada(req, res) {
    const ticketId = req.params.id;
    const {PDF, ticket} = await generarEntradaPDF(ticketId);
    res.setHeader(
        'Content-Disposition',
        'inline; filename =archivo.pdf'
    );
    res.setHeader("Content-Type", "application/pdf");
    res.send(PDF);
    await enviarEmail(PDF , ticket)
}

export { obtenerTickets, generarEntrada };
