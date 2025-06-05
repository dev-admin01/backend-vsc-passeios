export interface IListCondicaoPagamentoRequest {
  search?: string;
  page: number;
  perpage: number;
}

export interface IListCondicaoPagamentoResponse {
  condicoesPagamento: any[];
  page: number;
  perpage: number;
  lastPage: number;
  totalCount: number;
}
