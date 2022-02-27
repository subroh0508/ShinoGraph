<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import { DataTable } from '$components/molecules/table';

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
  name='Data Count: 0'
  args={{
    dataCount: 0,
  }}
/>

<Story
  name='Data Count: 5'
  args={{
    dataCount: 5,
  }}
/>

<Story
  name='Data Count: 15'
  args={{
    dataCount: 15,
  }}
/>

<Story
  name='Data Count: 80'
  args={{
    dataCount: 80,
  }}
/>

<Story
  name='Data Count: 100'
  args={{
    dataCount: 100,
  }}
/>
