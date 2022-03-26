<script context='module' lang='ts'>
  import { DEFAULT_QUERY } from '$lib/constants';

  export const prerender = false;
</script>

<script lang='ts'>
  import { SparqlEditor } from '@shinograph/components/organisms';
  import { client } from '$lib/clients';
  import alias from '$lib/alias.yml';
  import type { SparqlResult } from 'shinograph';

  let result: SparqlResult | null = null

  async function onExecuteQuery(query: string) {
    result = null;
    result = await client.execute(query, alias)
  }
</script>

<SparqlEditor
  query={ DEFAULT_QUERY }
  result={ result }
  onExecuteQuery={ onExecuteQuery }
/>
