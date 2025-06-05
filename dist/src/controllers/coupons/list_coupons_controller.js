"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListCouponsController = void 0;
const coupons_1 = require("../../services/coupons");
const erros_1 = require("../../shared/erros");
class ListCouponsController {
    async handle(req, res) {
        try {
            const listCouponsService = new coupons_1.ListCouponsService();
            const coupons = await listCouponsService.execute();
            return res.status(200).json({
                message: "Cupons listados com sucesso",
                coupons: coupons,
                status_code: 200,
            });
        }
        catch (error) {
            const publicErrorObject = new erros_1.ServiceError({
                message: "Erro ao listar cupons.",
                cause: error,
            });
            console.error(publicErrorObject);
            return res.status(publicErrorObject.statusCode).json(publicErrorObject);
        }
    }
}
exports.ListCouponsController = ListCouponsController;
