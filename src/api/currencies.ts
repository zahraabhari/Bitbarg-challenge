import API from "./_config";

export interface LivePriceType {
  id: number;
  icon: string;
  faName: string;
  enName: string;
  coin: string;
  price: number;
  quote: number;
  percent: number;
  decimal: number;
  isFavorite: boolean;
  chart: string[];
}

export interface PaginateHelper {
  currentPage: number;
  currentCount: number;
  requestId: string;
  total: number;
  pageSize: number;
  lastPage: number;
}

export interface Prices {
  buy: number;
  sell: number;
}

export interface Meta {
  paginateHelper: PaginateHelper;
  favoriteCurrencies?: any;
  prices: Prices;
}

export interface Result {
  items: LivePriceType[];
  meta: Meta;
}

export interface LivePriceResponse {
  apiVersion: string;
  success: boolean;
  result: Result;
  error?: any;
  paginate: boolean;
  message: string;
}

export interface LivePriceInput {
  q?: string;
  sort?: number;
  page?: number;
}

export function fetchLivePrice(params: LivePriceInput) {
  return API.get<LivePriceResponse>(`currencies`, { params });
}
