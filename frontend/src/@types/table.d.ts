export interface Item {
  type: string
  datatype: string | null
  value: string
}

export interface TableRowItem {
  item: Item | string
  header: boolean
}

export interface TableDatum {
  [key: string]: Item
}
