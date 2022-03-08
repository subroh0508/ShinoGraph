export interface Item {
  type: string;
  value: string;
  lang?: string;
  datatype?: string;
}

export interface TableRowItem {
  item: Item | string;
  header: boolean;
  rowspan?: number;
  colspan?: number;
}

export interface TableDatum {
  [key: string]: Item;
}
