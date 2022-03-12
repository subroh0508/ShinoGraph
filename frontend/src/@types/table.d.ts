import { RDF } from '$types/sparql';

export type Item = RDF | string | null;

export interface TableRowItem {
  item: Item;
  header: boolean;
  rowspan?: number;
  colspan?: number;
}
