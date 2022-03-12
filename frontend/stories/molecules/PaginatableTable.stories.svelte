<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import { PaginatableTable } from '$components/molecules/table';
  import table from '../json/data-list-table.json';
  import { buildRandomNumbers, buildRowsFromJson } from './buildTableData';

  const rowList = Object.fromEntries([
    ...[0, 5, 15, 80, 100].map(count => [`Random Numbers: ${count}`, buildRandomNumbers(count)]),
    ...Object.keys(table.headers).map(header => [header, buildRowsFromJson(header)]),
  ]);
</script>

<!-- More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export -->
<!-- More on argTypes: https://storybook.js.org/docs/svelte/api/argtypes -->
<Meta
  title='Components/Molecules/PaginatableTable'
  component={ PaginatableTable }
  argTypes={{
    data: {
      options: Object.keys(rowList),
      control: 'select',
    },
    striped: {
      control: 'boolean',
    },
  }}
/>

<!-- More on component templates: https://storybook.js.org/docs/svelte/writing-stories/introduction#using-args -->
<Template let:args>
  <PaginatableTable
    rows={ rowList[args.data] }
    striped={ args.striped }
  />
</Template>

<!-- More on args: https://storybook.js.org/docs/svelte/writing-stories/args -->
<Story
  name='Empty Header'
  args={{ data: 'EmptyHeader', striped: false }}
/>

<Story
  name='Data Count: 0'
  args={{ data: 'Random Numbers: 0', striped: false }}
/>

<Story
  name='Data Count: 5'
  args={{ data: 'Random Numbers: 5', striped: false }}
/>

<Story
  name='Data Count: 15'
  args={{ data: 'Random Numbers: 15', striped: false }}
/>

<Story
  name='Data Count: 80'
  args={{ data: 'Random Numbers: 80', striped: false }}
/>

<Story
  name='Data Count: 100'
  args={{ data: 'Random Numbers: 100', striped: false }}
/>

<Story
  name='Literal Values: Idol'
  args={{ data: 'Idols', striped: false }}
/>

<Story
  name='Uri Values: Place'
  args={{ data: 'Places', striped: false }}
/>

<Story
  name='Uri Values: Movie'
  args={{ data: 'Movies', striped: false }}
/>
