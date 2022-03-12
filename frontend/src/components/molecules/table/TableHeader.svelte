<script lang='ts'>
  import { RDFItem } from '$components/atoms/text';
  import type { Item } from '$types/table';

  export let header: Item;
  export let rowspan: number;
  export let colspan: number;
</script>

<th
  rowspan={ rowspan }
  colspan={ colspan }
>
  <RDFItem item={ header }/>
</th>
