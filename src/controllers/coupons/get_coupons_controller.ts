import { Request, Response } from "express";
import { GetCouponsService } from "../../services/coupons";
import { ServiceError } from "../../shared/erros";

class GetCouponsController {
  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const getCouponsService = new GetCouponsService();
      const coupons = await getCouponsService.execute(id);

      return res.status(200).json({
        message: "Cupom encontrado com sucesso",
        coupons: coupons,
        status_code: 200,
      });
    } catch (error) {
      const publicErrorObject = new ServiceError({
        message: "Erro ao buscar cupom.",
        cause: error,
      });
      console.error(publicErrorObject);
      return res.status(publicErrorObject.statusCode).json(publicErrorObject);
    }
  }
}

export { GetCouponsController };
