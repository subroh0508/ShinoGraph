export const DEFAULT_QUERY = `PREFIX scdb: <https://283db.org/schema#>
PREFIX : <http://schema.org/>
PREFIX dbo: <http://dbpedia.org/ontology/>
PREFIX dbp: <http://ja.dbpedia.org/resource/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

SELECT ?subject ?predicate ?object
WHERE {
  ?subject ?predicate ?object
}
LIMIT 25`;
