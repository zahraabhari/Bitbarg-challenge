import {
  LivePriceInput,
  LivePriceType,
  PaginateHelper,
  Prices,
} from "../../api/currencies";

export interface LivePricePropsType {
  initialData?: {
    items?: LivePriceType[];
    paginateHelper?: PaginateHelper;
    prices?: Prices;
  };

  hasError?: boolean;
}

export interface ToolbarPropsType {
  onSortSearch: (params: LivePriceInput) => void;
  params: LivePriceInput;
  showPriceInToman: boolean;
  setShowPriceInToman: (value: boolean) => void;
}
export interface SearchBoxPropsType {
  search: string;
  onSearch: (search: string) => void;
}
export interface SortBoxPropsType {
  sort?: number;
  onSort: (sort: number) => void;
}
export interface PriceTableRowPropsType {
  data: LivePriceType;
  loadMore: () => void;
  showPriceInToman: boolean;
  prices?: Prices;
  index: number;
}
export interface LivePriceTablePropsType {
  items: LivePriceType[];
  loadMore: () => void;
  showPriceInToman: boolean;
  prices?: Prices;
  loading: boolean;
}
