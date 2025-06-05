"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCouponsController = void 0;
const coupons_1 = require("../../services/coupons");
const erros_1 = require("../../shared/erros");
class GetCouponsController {
    async handle(req, res) {
        try {
            const { id } = req.params;
            const getCouponsService = new coupons_1.GetCouponsService();
            const coupons = await getCouponsService.execute(id);
            return res.status(200).json({
                message: "Cupom encontrado com sucesso",
                coupons: coupons,
                status_code: 200,
            });
        }
        catch (error) {
            const publicErrorObject = new erros_1.ServiceError({
                message: "Erro ao buscar cupom.",
                cause: error,
            });
            console.error(publicErrorObject);
            return res.status(publicErrorObject.statusCode).json(publicErrorObject);
        }
    }
}
exports.GetCouponsController = GetCouponsController;
