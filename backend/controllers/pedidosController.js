import { ApiResponse } from "../dtos/ApiResponseDTO.js";
import { ordenService } from "../serviceLayer/ordenService.js";
import { pedidoService } from "../serviceLayer/pedidosService.js";

async function recibirActualizaciónPedido(req, res) {
  try {
    
    const data = req.body;
    const ruc_cedula = data.meta_data.find(meta => meta.key === '_billing_ruc_o_cedula')
    
    let pedido = {
      id          : data.id,
      ruc_cedula  : ruc_cedula.value,
      ...data.billing
    };
    
    if (data.status == "completed") {

      //Crea el pedido
      pedido = await ordenService.generarOrden(pedido);
      console.log('Insertado');
      return res.status(200).json(ApiResponse.getResponse(200, 'Pedido ingresado correctamente', pedido ));
    } else {
      
      //Borra el pedido
      pedido = await ordenService.eliminarOrden(pedido);
      console.log('Eliminado');
      return res.status(200).json(ApiResponse.getResponse(200, 'Pedido eliminado correctamente', pedido ));
    }
    

  } catch (error) {
    console.log(error);
    res.staus(500).json(ApiResponse.getResponse(500, 'Error interno del servidor', null));
  }
}

async function obtenerPedidos( req, res) {
  try{
    const pedidos = await pedidoService.obtenerPedidos();
    res.status(200).json( {data : pedidos});
  } catch( error ) {
    res.status(500).json(ApiResponse.getResponse(500, 'Error interno del servidor' ,null))
  }
}

export { recibirActualizaciónPedido, obtenerPedidos };
