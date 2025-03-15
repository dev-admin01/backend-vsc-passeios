"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestController = void 0;
class TestController {
    async handle(req, res) {
        return res.json({ teste: true });
    }
}
exports.TestController = TestController;
