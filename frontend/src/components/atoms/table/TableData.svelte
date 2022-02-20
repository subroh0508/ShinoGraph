<script context='module' lang='ts'>
  export interface Item {
    type: string
    datatype: string | null
    value: string
  }

  const text = (item: Item) => !!item ? item.value : '';
  const isUri = (item: Item) => item && item.type === 'uri';
</script>

<script lang='ts'>
  export let i: number;
  export let items: Item[];
</script>

<tr>
  <td>{ i }</td>
  {#each items as item}
    <td>
      {#if isUri(item)}
        <a href={ text(item) } target='_blank' rel='noopener noreferrer'>
          { text(item) }
        </a>
      {:else}
        { text(item) }
      {/if}
    </td>
  {/each}
</tr>
