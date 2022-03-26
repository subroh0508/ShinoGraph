import { SparqlClient } from '@shinograph/client';
import { BASE_URL, PRERENDER_BASE_URL } from "./constants";
// @ts-ignore
import alias from './alias.yml';

export const client = new SparqlClient(BASE_URL, alias);
export const prerender = new SparqlClient(PRERENDER_BASE_URL, alias);
