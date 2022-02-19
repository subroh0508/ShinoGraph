export default class SparqlClient {
  static get BASE_URL() { return 'http://localhost:3000/spql/query'; }

  static async execute(
    query: string,
    option: RequestInit = {
        method: 'GET',
        headers: { 'Accept': 'application/sparql-results+json' },
    },
  ): Promise<any> {
    const res = await fetch(
      `${SparqlClient.BASE_URL}?query=${encodeURIComponent(query)}`,
      option,
    );

    return await res.json();
  }
}
