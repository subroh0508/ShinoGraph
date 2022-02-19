<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import { BorderTable } from '$lib/components/atoms/table';
  import table from '../json/table.json';

  const headers = table.headers;
  const data = table.data;
</script>

<!-- More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export -->
<!-- More on argTypes: https://storybook.js.org/docs/svelte/api/argtypes -->
<Meta
  title='Components/Atoms/BorderTable'
  component={ BorderTable }
  argTypes={{
    headers: {
      options: Object.keys(headers),
      control: 'select',
    },
    data: {
      options: Object.keys(data),
      control: 'select',
    },
  }}
/>

<!-- More on component templates: https://storybook.js.org/docs/svelte/writing-stories/introduction#using-args -->
<Template let:args>
  <BorderTable headers={ headers[args.headers] } data={ data[args.data] }/>
</Template>

<!-- More on args: https://storybook.js.org/docs/svelte/writing-stories/args -->
<Story
  name='Normal'
  args={{
    headers: 'Idols',
    data: 'Idols',
  }}
/>
