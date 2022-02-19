import { PRERENDER_BASE_URL } from '$lib/constants';

export default class SparqlClient {
  private readonly baseUrl: string

  constructor(baseUrl: string = PRERENDER_BASE_URL) {
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
