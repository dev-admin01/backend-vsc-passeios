import { Request, Response } from "express";
import { UpdateCouponsService } from "../../services/coupons";
import { ServiceError } from "../../shared/erros";

class UpdateCouponsController {
  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { coupon, discount, id_midia } = req.body;

      const updateCouponsService = new UpdateCouponsService();
      const coupons = await updateCouponsService.execute(id, {
        coupon,
        discount,
        id_midia,
      });

      return res.status(200).json({
        message: "Cupom atualizado com sucesso",
        coupons: coupons,
        status_code: 200,
      });
    } catch (error) {
      const publicErrorObject = new ServiceError({
        message: "Erro ao atualizar cupom.",
        cause: error,
      });
      console.error(publicErrorObject);
      return res.status(publicErrorObject.statusCode).json(publicErrorObject);
    }
  }
}

export { UpdateCouponsController };
