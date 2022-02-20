<script context='module' lang='ts'>
  export interface Datum {
    type: string
    datatype: string | null
    value: string
  }

  const text = (datum: Datum) => !!datum ? datum.value : '';
  const isUri = (datum: Datum) => datum && datum.type === 'uri';
</script>

<script lang='ts'>
  export let i: number;
  export let data: Datum[];
</script>

<tr>
  <td>{ i }</td>
  {#each data as datum}
    <td>
      {#if isUri(datum)}
        <a href={ text(datum) } target='_blank' rel='noopener noreferrer'>
          { text(datum) }
        </a>
      {:else}
        { text(datum) }
      {/if}
    </td>
  {/each}
</tr>
