import { Request, Response } from "express";
import { DeleteCouponsService } from "../../services/coupons";
import { ServiceError } from "../../shared/erros";

class DeleteCouponsController {
  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const deleteCouponsService = new DeleteCouponsService();
      await deleteCouponsService.execute(id);

      return res.status(200).json({
        message: "Cupom excluído com sucesso",
        status_code: 200,
      });
    } catch (error) {
      const publicErrorObject = new ServiceError({
        message: "Erro ao excluir cupom.",
        cause: error,
      });
      console.error(publicErrorObject);
      return res.status(publicErrorObject.statusCode).json(publicErrorObject);
    }
  }
}

export { DeleteCouponsController };
