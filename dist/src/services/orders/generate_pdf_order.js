"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOrderPDFBuffer = generateOrderPDFBuffer;
const pdfkit_1 = __importDefault(require("pdfkit"));
const buffer_1 = require("buffer");
async function generateOrderPDFBuffer({ order, orderServices, }) {
    return new Promise((resolve, reject) => {
        const doc = new pdfkit_1.default();
        const buffers = [];
        // Captura os chunks de dados
        doc.on("data", chunk => buffers.push(chunk));
        // Troque 'end' por 'finish' se estiver usando doc como stream
        doc.on("finish", () => {
            const pdfBuffer = buffer_1.Buffer.concat(buffers);
            resolve(pdfBuffer);
        });
        doc.on("error", err => reject(err));
        // Conteúdo do PDF
        doc.fontSize(18).text("Detalhes da Order", { align: "center" });
        doc.moveDown();
        doc.fontSize(12).text(`ID Order: ${order.id_order}`);
        doc.text(`User: ${order.user?.name || "N/A"}`);
        doc.text(`Costumer: ${order.costumer?.nome || "N/A"}`);
        doc.text(`Price: ${order.price}`);
        doc.text(`Created At: ${new Date(order.created_at).toLocaleString()}`);
        doc.text(`Status: ${order.status?.description || "N/A"}`);
        doc.moveDown();
        doc.text("Serviços:", { underline: true });
        orderServices.forEach((srv, idx) => {
            doc.moveDown(0.5);
            doc.text(`${idx + 1}. Serviço ID: ${srv.id_service} - Preço: ${srv.price}`);
        });
        // Finaliza a escrita do PDF
        doc.end();
    });
}
