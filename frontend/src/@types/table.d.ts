export interface Item {
  type: string
  datatype: string | null
  value: string
}

export interface TableDatum {
  [key: string]: Item
}
