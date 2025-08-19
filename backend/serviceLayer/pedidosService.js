import { Pedidos } from "../models/db/index.js";

export class pedidoService {

  /**
   * Llama al método del modelo oara insertar un pedido
   * @param pedido 
   * @returns
   */
  static async crearPedido(pedido, transaction ) {
    return await Pedidos.create({
      id: pedido.id,
      cliente: `${pedido.first_name} ${pedido.last_name}`,
      email: pedido.email,
      telefono: pedido.phone,
      ruc_cedula: pedido.ruc_cedula,
      cantidad: 15,
    },
    {
      transaction: transaction
    });
  }

  static async obtenerPedidos() {
    return await Pedidos.findAll();
  }

  static async eliminarPedido(pedido) {
    return await Pedidos.destroy({
      where: {
        id: pedido.id
      }
    })
  }

}