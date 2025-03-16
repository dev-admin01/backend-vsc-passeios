"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailUserController = void 0;
const detail_user_service_1 = require("../../services/users/detail_user_service");
class DetailUserController {
    async handle(req, res) {
        const user_id = req.id_user;
        const detailUSerService = new detail_user_service_1.DetailUserService();
        const user = await detailUSerService.execute(user_id);
        return res.json(user);
    }
}
exports.DetailUserController = DetailUserController;
