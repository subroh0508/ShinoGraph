<script context='module' lang='ts'>
  export interface Datum {
    type: string
    value: string
  }
</script>

<script lang='ts'>
  export let i: number;
  export let data: Datum[];
</script>

<tr>
  <td>{ i }</td>
  {#each data as datum}
    <td>{ !!datum ? datum.value : '' }</td>
  {/each}
</tr>
