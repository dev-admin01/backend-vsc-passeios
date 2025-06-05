import { Request, Response } from "express";
import { CreateCouponsService } from "../../services/coupons";
import { ServiceError } from "../../shared/erros";

class CreateCouponsController {
  async handle(req: Request, res: Response) {
    try {
      const { coupon, discount, id_midia } = req.body;

      const createCouponsService = new CreateCouponsService();
      const coupons = await createCouponsService.execute({
        coupon,
        discount,
        id_midia,
      });

      return res.status(201).json({
        message: "Cupom criado com sucesso",
        coupons: coupons,
        status_code: 201,
      });
    } catch (error) {
      const publicErrorObject = new ServiceError({
        message: "Erro ao criar cupom.",
        cause: error,
      });
      console.error(publicErrorObject);
      return res.status(publicErrorObject.statusCode).json(publicErrorObject);
    }
  }
}

export { CreateCouponsController };
