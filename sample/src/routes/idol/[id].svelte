<script context='module' lang='ts'>
  export const prerender = true;
</script>

<script lang='ts'>
  import { RDFEntityViewer } from '@shinograph/components/package/organisms';
  import type { RDFEntity } from 'shinograph';

  export let entity: RDFEntity;
</script>

<RDFEntityViewer entity={ entity }/>
