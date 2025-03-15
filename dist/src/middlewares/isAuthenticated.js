"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = isAuthenticated;
const jsonwebtoken_1 = require("jsonwebtoken");
const erros_1 = require("../shared/erros");
function isAuthenticated(req, res, next) {
    const authToken = req.headers.authorization;
    if (!authToken) {
        return res
            .status(401)
            .json({
            message: "Autenticação necessária.",
            status_code: 401,
        })
            .end();
    }
    const [, token] = authToken.split(" ");
    try {
        const { sub } = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        req.id_user = sub;
        return next();
    }
    catch (error) {
        const publicErrorObject = new erros_1.InternalServerError({
            message: "Erro na conexão com Banco ou na Query.",
            cause: error,
        });
        console.error(publicErrorObject);
        res.status(publicErrorObject.statusCode).json(publicErrorObject);
    }
}
