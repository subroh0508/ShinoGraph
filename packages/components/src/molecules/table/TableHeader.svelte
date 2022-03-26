<script lang='ts'>
  import { Link } from '$atoms/link';
  import { Meta } from '$atoms/text';

  export let label: string;
  export let href: string | null = null;
  export let meta: string | null = null;
  export let rowspan: number | null = null;
  export let colspan: number | null = null;
</script>

<th
  rowspan={ rowspan || 1 }
  colspan={ colspan || 1 }
>
  <Link href={ href }>
    { label }
    <Meta text={ meta }/>
  </Link>
</th>
