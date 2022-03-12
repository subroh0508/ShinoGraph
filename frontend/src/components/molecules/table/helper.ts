import type { QuerySolution, RDF } from '$types/sparql';

export function getRDFOrNull(key: string, datum: QuerySolution): RDF | null {
  return datum[key] || null;
}
