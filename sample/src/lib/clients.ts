import { SparqlClient, RDFEntityBuilder } from '@shinograph/client';
import { BASE_URL, PRERENDER_BASE_URL } from "./constants";
// @ts-ignore
import alias from './alias.yml';
import type { Properties, RDFEntity, SparqlResult } from 'shinograph';

export const client = new SparqlClient(BASE_URL, alias);
export const prerender = new SparqlClient(PRERENDER_BASE_URL, alias);

export function buildEntity(
  properties: Properties,
  result: SparqlResult,
): RDFEntity {
  return new RDFEntityBuilder(
    { primary: 'label', secondary: 'description' },
    'predicate',
    { primary: 'object', secondary: 'objectName' },
    alias,
    properties,
  ).build(result.bindings);
}
