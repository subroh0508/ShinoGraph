import { PRERENDER_BASE_URL, BASE_URL } from '$lib/constants';

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
  ): Promise<any> {
    const res = await fetch(
      `${this.baseUrl}/spql/query?query=${encodeURIComponent(query)}`,
      option,
    );

    return await res.json();
  }
}

export const client = new SparqlClient(BASE_URL);
export const prerender = new SparqlClient(PRERENDER_BASE_URL);
