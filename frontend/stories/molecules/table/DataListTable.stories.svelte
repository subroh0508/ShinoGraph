<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import DataListTable from '$components/molecules/table/DataListTable.svelte';
  import table from '../../json/data-list-table.json';

  const headers = table.headers;
  const data = table.data;

  const props = (args) => ({
    ...args,
    header: headers[args.header],
    data: data[args.data],
  });
</script>

<!-- More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export -->
<!-- More on argTypes: https://storybook.js.org/docs/svelte/api/argtypes -->
<Meta
  title='Components/Molecules/table/DataListTable'
  component={ DataListTable }
  argTypes={{
    header: {
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
  <DataListTable { ...props(args) }/>
</Template>

<!-- More on args: https://storybook.js.org/docs/svelte/writing-stories/args -->
<Story
  name='Empty Header'
  args={{
    header: 'EmptyHeader',
    data: 'EmptyHeader',
    striped: false,
  }}
/>

<Story
  name='Empty Data'
  args={{
    header: 'EmptyData',
    data: 'EmptyData',
    striped: false,
  }}
/>

<Story
  name='Literal Values: Idol'
  args={{
    header: 'Idols',
    data: 'Idols',
    striped: false,
  }}
/>

<Story
  name='Uri Values: Place'
  args={{
    header: 'Places',
    data: 'Places',
    striped: false,
  }}
/>

<Story
  name='Uri Values: Movie'
  args={{
    header: 'Movies',
    data: 'Movies',
    striped: false,
  }}
/>
