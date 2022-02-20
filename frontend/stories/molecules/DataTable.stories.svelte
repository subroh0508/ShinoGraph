<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import { DataTable } from '$components/molecules/datatable';

  const buildTableData = (count) => new Array(count).fill(null)
    .map(() => (
      {
        RandomNumber: {
          type: 'literal',
          value: new Array(10).fill(null).map(() => Math.floor(Math.random() * 16).toString(16)).join(''),
        },
      }
    ));
</script>

<!-- More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export -->
<!-- More on argTypes: https://storybook.js.org/docs/svelte/api/argtypes -->
<Meta
  title='Components/Molecules/DataTable'
  component={ DataTable }
  argTypes={{
    dataCount: {
      control: 'number',
    },
  }}
/>

<!-- More on component templates: https://storybook.js.org/docs/svelte/writing-stories/introduction#using-args -->
<Template let:args>
  <DataTable
    headers={ ['RandomNumber'] }
    data={ buildTableData(args.dataCount) }
  />
</Template>

<!-- More on args: https://storybook.js.org/docs/svelte/writing-stories/args -->
<Story
  name='Normal'
  args={{
    dataCount: 50,
  }}
/>
