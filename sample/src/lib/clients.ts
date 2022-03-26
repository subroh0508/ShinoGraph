import { SparqlClient } from '@shinograph/client';
import { BASE_URL, PRERENDER_BASE_URL } from "./constants";

export const client = new SparqlClient(BASE_URL);
export const prerender = new SparqlClient(PRERENDER_BASE_URL);
