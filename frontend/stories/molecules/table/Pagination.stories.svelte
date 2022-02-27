<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import Pagination from '$components/molecules/table/Pagination.svelte';
</script>

<!-- More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export -->
<!-- More on argTypes: https://storybook.js.org/docs/svelte/api/argtypes -->
<Meta
  title='Components/Molecules/table/Pagination'
  component={ Pagination }
  argTypes={{
    totalPage: { type: 'number' },
    page: { type: 'number' },
    onClick: { action: 'onClick' },
  }}
/>

<!-- More on component templates: https://storybook.js.org/docs/svelte/writing-stories/introduction#using-args -->
<Template let:args>
  <Pagination { ...args }/>
</Template>

<!-- More on args: https://storybook.js.org/docs/svelte/writing-stories/args -->
<Story
  name='Total Page: 0'
  args={{
    totalPage: 0,
    page: 0,
  }}
/>

<Story
  name='Total Page: 2'
  args={{
    totalPage: 2,
    page: 0,
  }}
/>

<Story
  name='Total Page: 3'
  args={{
    totalPage: 3,
    page: 0,
  }}
/>

<Story
  name='Total Page: 8'
  args={{
    totalPage: 8,
    page: 4,
  }}
/>

<Story
  name='Total Page: 9'
  args={{
    totalPage: 9,
    page: 4,
  }}
/>
