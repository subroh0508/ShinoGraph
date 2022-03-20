<script lang='ts'>
  import { TableData } from '$components/molecules/table';
  import type { QuerySolution, NullableRDF } from '$types/sparql';

  export let vars: string[] = [];
  export let rows: QuerySolution[] = [];
  export let offset: number = 0;

  function href(object: NullableRDF): string | null {
    return object?.type === 'uri' ? object.value : null;
  }
</script>

<tbody>
  {#if !!vars.length}
    {#each rows as row, i}
      <tr>
        <TableData label={ i + offset + 1 }/>
        {#each vars as v}
          <TableData
            label={ (row[v] || null)?.value }
            href={ href(row[v] || null) }
          />
        {/each}
      </tr>
    {/each}
  {/if}
</tbody>
