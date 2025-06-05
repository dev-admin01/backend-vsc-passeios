import { Request, Response } from "express";
import { ListCouponsService } from "../../services/coupons";
import { ServiceError } from "../../shared/erros";

class ListCouponsController {
  async handle(req: Request, res: Response) {
    try {
      const listCouponsService = new ListCouponsService();
      const coupons = await listCouponsService.execute();

      return res.status(200).json({
        message: "Cupons listados com sucesso",
        coupons: coupons,
        status_code: 200,
      });
    } catch (error) {
      const publicErrorObject = new ServiceError({
        message: "Erro ao listar cupons.",
        cause: error,
      });
      console.error(publicErrorObject);
      return res.status(publicErrorObject.statusCode).json(publicErrorObject);
    }
  }
}

export { ListCouponsController };
