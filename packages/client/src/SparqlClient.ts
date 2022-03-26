import { SparqlQueryExecutionResult } from './SparqlQueryExecutionResult';
import type { SparqlResult } from 'shinograph';

export class SparqlClient {
  private readonly baseUrl: string;
  private readonly alias: { [key: string]: string };

  constructor(baseUrl: string, alias: { [key: string]: string }) {
    this.baseUrl = baseUrl;
    this.alias = alias;
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

    return await SparqlQueryExecutionResult.build(res, this.alias);
  }
}
