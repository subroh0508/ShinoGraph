import { RDFEntityBuilder } from '$lib/RDFEntityBuilder';
import { prerender } from '$lib/SparqlClient';
// @ts-ignore
import properties from './properties.yml';

const buildQuery = (id: string) => `
  PREFIX scdb: <https://283db.org/schema#>
  PREFIX : <http://schema.org/>
  PREFIX dbo: <http://dbpedia.org/ontology/>
  PREFIX dbp: <http://ja.dbpedia.org/resource/>
  PREFIX foaf: <http://xmlns.com/foaf/0.1/>
  PREFIX owl: <http://www.w3.org/2002/07/owl#>
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

  SELECT ?predicate ?object ?objectName
  WHERE {
    <https://283db.org/resource/character/idol/${id}> ?predicate ?object;
      OPTIONAL { ?object :name ?objectName }
  }
`;

export async function get({ params }) {
  const result = await prerender.execute(buildQuery(params.id));

  if (result.isOk) {
    const entity = new RDFEntityBuilder(
      { primary: 'label', secondary: 'description' },
       'predicate',
      { primary: 'object', secondary: 'objectLabel' },
      properties,
    ).build(result.bindings);

    return {
      body: { entity },
    };
  }

  return {
    status: result.status,
    body: { error: result.error },
  };
}
