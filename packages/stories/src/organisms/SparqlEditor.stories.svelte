<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import { DEFAULT_QUERY } from '$lib/constants';
  import { SparqlEditor } from '@shinograph/components/organisms';
</script>

<!-- More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export -->
<!-- More on argTypes: https://storybook.js.org/docs/svelte/api/argtypes -->
<Meta
  title='Components/Organisms/SparqlEditor'
  component={ SparqlEditor }
  argTypes={{
    query: { control: 'text' },
  }}
/>

<!-- More on component templates: https://storybook.js.org/docs/svelte/writing-stories/introduction#using-args -->
<Template let:args>
  <SparqlEditor { ...args }/>
</Template>

<!-- More on args: https://storybook.js.org/docs/svelte/writing-stories/args -->
<Story
  name='Normal'
  args={{
    query: DEFAULT_QUERY,
  }}
/>
