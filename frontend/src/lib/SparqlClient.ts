import { PRERENDER_BASE_URL, BASE_URL } from '$lib/constants';
import SparqlResult from '$lib/SparqlResult';
// @ts-ignore
import alias from './alias.yml';

class SparqlClient {
  private readonly baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async execute(
    query: string,
    option: RequestInit = {
      method: 'GET',
      headers: { 'Accept': 'application/sparql-results+json' },
    },
  ): Promise<SparqlResult> {
    const res = await fetch(
      `${this.baseUrl}/spql/query?query=${encodeURIComponent(query)}`,
      option,
    );

    return await SparqlResult.build(res, alias);
  }
}

export const client = new SparqlClient(BASE_URL);
export const prerender = new SparqlClient(PRERENDER_BASE_URL);
