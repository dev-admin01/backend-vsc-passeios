export interface OrderDocs {
  id_order: string;
  cpf_cnpj?: string;
  passaporte?: string;
  razao_social?: string;
  nome_fantasia?: string;
  indicacao?: string;
  nome: string;
  email?: string;
  ddi?: string;
  ddd?: string;
  telefone?: string;
  compPag?: string; // Base64 do comprovante
  cnh?: string; // Base64 da CNH
}
