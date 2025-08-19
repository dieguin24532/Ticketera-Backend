import { Eventos } from "../models/db/index.js";
import PostsMeta from "../models/db_wordpress/Post-meta.js";
import Posts from "../models/db_wordpress/Posts.js";
import { Op } from "sequelize";

export class eventoService {
  static async obtenerEventoDetalleById(eventoId) {
    return await PostsMeta.findAll({
      where: {
        post_id: eventoId,
        meta_key: {
          [Op.or]: ["event_date_time", "event_end_date_time"],
        },
      },
    });
  }

  static async obtenerEventoById(idEvento) {
    return await Posts.findByPk(idEvento);
  }

  static async armarEvento(eventoId) {
    const evento = await this.obtenerEventoById(eventoId);
    const eventoDetalle = await this.obtenerEventoDetalleById(eventoId);

    return {
      id: eventoId,
      nombre_evento: evento.get("post_title"),
      fecha_inicio: eventoDetalle[0]?.get("meta_value"),
      fecha_fin: eventoDetalle[1]?.get("meta_value"),
    };
  }

  static async crearOBuscarEvento(evento, transaction) {
    return await Eventos.findOrCreate({
      where: { ID: evento.id },
      defaults: evento,
      transaction : transaction
    })
  }
}
