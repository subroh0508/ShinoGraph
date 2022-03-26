<script lang='ts'>
  import { TableData } from '$molecules/table';
  import type { QuerySolution, RDF } from '$types/sparql';

  export let vars: string[] = [];
  export let rows: QuerySolution[] = [];
  export let offset: number = 0;

  function href(object: RDF): string | null {
    return object.type === 'uri' ? object.value : null;
  }

  function lang(object: RDF): string | null {
    return object.type === 'literal' ? (object.lang || null) : null;
  }

  function datatype(object: RDF): string | null {
    return object.type === 'literal' ? (object.datatype?.label || null) : null;
  }
</script>

<tbody>
  {#if !!vars.length}
    {#each rows as row, i}
      <tr>
        <TableData label={ i + offset + 1 }/>
        {#each vars as v}
          <TableData
            label={ row[v]?.value || '' }
            href={ row[v] && href(row[v]) }
            meta={ row[v] && (lang(row[v]) || datatype(row[v])) }
          />
        {/each}
      </tr>
    {/each}
  {/if}
</tbody>
