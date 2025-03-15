"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TesteController = void 0;
class TesteController {
    async handle(req, res, next) {
        res.json({ teste: true });
    }
}
exports.TesteController = TesteController;
