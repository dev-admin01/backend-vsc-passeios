"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCouponsController = void 0;
const coupons_1 = require("../../services/coupons");
const erros_1 = require("../../shared/erros");
class UpdateCouponsController {
    async handle(req, res) {
        try {
            const { id } = req.params;
            const { coupon, discount, id_midia } = req.body;
            const updateCouponsService = new coupons_1.UpdateCouponsService();
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
        }
        catch (error) {
            const publicErrorObject = new erros_1.ServiceError({
                message: "Erro ao atualizar cupom.",
                cause: error,
            });
            console.error(publicErrorObject);
            return res.status(publicErrorObject.statusCode).json(publicErrorObject);
        }
    }
}
exports.UpdateCouponsController = UpdateCouponsController;
