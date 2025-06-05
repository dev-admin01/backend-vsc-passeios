"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCouponsController = void 0;
const coupons_1 = require("../../services/coupons");
const erros_1 = require("../../shared/erros");
class DeleteCouponsController {
    async handle(req, res) {
        try {
            const { id } = req.params;
            const deleteCouponsService = new coupons_1.DeleteCouponsService();
            await deleteCouponsService.execute(id);
            return res.status(200).json({
                message: "Cupom excluído com sucesso",
                status_code: 200,
            });
        }
        catch (error) {
            const publicErrorObject = new erros_1.ServiceError({
                message: "Erro ao excluir cupom.",
                cause: error,
            });
            console.error(publicErrorObject);
            return res.status(publicErrorObject.statusCode).json(publicErrorObject);
        }
    }
}
exports.DeleteCouponsController = DeleteCouponsController;
