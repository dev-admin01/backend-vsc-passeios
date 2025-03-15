"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceError = exports.InternalServerError = void 0;
class InternalServerError extends Error {
    constructor({ cause, statusCode }) {
        super("Um erro interno não esperado aconteceu.");
        this.cause = cause;
        this.name = "InternalServerError";
        this.action = "Entre em contato com o suporte.";
        this.statusCode = statusCode || 500;
        Object.setPrototypeOf(this, InternalServerError.prototype);
    }
    toJSON() {
        return {
            name: this.name,
            message: this.message,
            action: this.action,
            status_code: this.statusCode,
        };
    }
}
exports.InternalServerError = InternalServerError;
class ServiceError extends Error {
    constructor({ cause, message }) {
        super(message || "Serviço indisponível no momento.");
        this.cause = cause;
        this.name = "ServiceError";
        this.action = "Verifique se o serviço está disponível.";
        this.statusCode = 503;
        Object.setPrototypeOf(this, ServiceError.prototype);
    }
    toJSON() {
        return {
            name: this.name,
            message: this.message,
            action: this.action,
            status_code: this.statusCode,
        };
    }
}
exports.ServiceError = ServiceError;
