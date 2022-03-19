<script context='module' lang='ts'>
  export const prerender = true;
</script>

<script lang='ts'>
  import { RDFEntityViewer } from '$components/organisms/viewer';
  import type { RDFEntity } from '$types/entity';

  export let entity: RDFEntity;
</script>

<RDFEntityViewer entity={ entity }/>
