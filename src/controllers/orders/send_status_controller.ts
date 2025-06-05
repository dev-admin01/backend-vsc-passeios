import { Request, Response } from "express";
import { SendStatusService } from "../../services/orders/send_status_service";
import { ServiceError } from "../../shared/erros";

class SendStatusOrderController {
  async handle(req: Request, res: Response) {
    try {
      const { id_order, id_status_order } = req.body;
      const id_user = req.id_user;

      const updateOrderService = new SendStatusService();
      await updateOrderService.execute({
        id_order,
        id_user,
        id_status_order,
      });

      return res.status(200).json({
        message: "Status atualizado com sucesso",
        status_code: 200,
      });
    } catch (error) {
      const publicErrorObject = new ServiceError({
        message: "Erro ao atualizar status.",
        cause: error,
      });
      console.error(publicErrorObject);
      return res.status(publicErrorObject.statusCode).json(publicErrorObject);
    }
  }
}

export { SendStatusOrderController };
