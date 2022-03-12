<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import { DataTable } from '$components/molecules/table';
  import table from '../json/data-table.json';
  import { buildDataFromJson } from './buildTableData';

  const headerKey = 'predicate';
  const valueKey = { primary: 'object', secondary: 'objectName' };
</script>

<!-- More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export -->
<!-- More on argTypes: https://storybook.js.org/docs/svelte/api/argtypes -->
<Meta
  title='Components/Molecules/DataTable'
  component={ DataTable }
  argTypes={{
    data: {
      options: Object.keys(table),
      control: 'select',
    },
  }}
/>

<!-- More on component templates: https://storybook.js.org/docs/svelte/writing-stories/introduction#using-args -->
<Template let:args>
  <DataTable rows={ buildDataFromJson(args.data, headerKey, valueKey) }/>
</Template>

<!-- More on args: https://storybook.js.org/docs/svelte/writing-stories/args -->
<Story
  name='Sakuragi Mano'
  args={{ data: 'Sakuragi Mano' }}
/>
