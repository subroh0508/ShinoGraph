<script lang='ts'>
  import { RDFItem } from '$components/atoms/text';
  import type { Item } from '$types/table';

  export let datum: Item;
  export let rowspan: number;
  export let colspan: number;
</script>

<td
  rowspan={ rowspan }
  colspan={ colspan }
>
  <RDFItem item={ datum }/>
</td>
