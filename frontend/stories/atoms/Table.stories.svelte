<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import { Table } from '$components/atoms/table';
  import table from '../json/table.json';

  const headers = table.headers;
  const data = table.data;

  const props = (args) => ({
    ...args,
    headers: headers[args.headers],
    data: data[args.data],
  });
</script>

<!-- More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export -->
<!-- More on argTypes: https://storybook.js.org/docs/svelte/api/argtypes -->
<Meta
  title='Components/Atoms/Table'
  component={ Table }
  argTypes={{
    headers: {
      options: Object.keys(headers),
      control: 'select',
    },
    data: {
      options: Object.keys(data),
      control: 'select',
    },
    striped: {
      control: 'boolean',
    },
  }}
/>

<!-- More on component templates: https://storybook.js.org/docs/svelte/writing-stories/introduction#using-args -->
<Template let:args>
  <Table { ...props(args) }/>
</Template>

<!-- More on args: https://storybook.js.org/docs/svelte/writing-stories/args -->
<Story
  name='Normal'
  args={{
    headers: 'Idols',
    data: 'Idols',
    striped: false,
  }}
/>
