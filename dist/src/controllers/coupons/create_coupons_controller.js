"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCouponsController = void 0;
const coupons_1 = require("../../services/coupons");
const erros_1 = require("../../shared/erros");
class CreateCouponsController {
    async handle(req, res) {
        try {
            const { coupon, discount, id_midia } = req.body;
            const createCouponsService = new coupons_1.CreateCouponsService();
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
        }
        catch (error) {
            const publicErrorObject = new erros_1.ServiceError({
                message: "Erro ao criar cupom.",
                cause: error,
            });
            console.error(publicErrorObject);
            return res.status(publicErrorObject.statusCode).json(publicErrorObject);
        }
    }
}
exports.CreateCouponsController = CreateCouponsController;
