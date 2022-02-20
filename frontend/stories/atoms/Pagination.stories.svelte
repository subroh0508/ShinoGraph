<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import { Pagination } from '$components/atoms/button';
</script>

<!-- More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export -->
<!-- More on argTypes: https://storybook.js.org/docs/svelte/api/argtypes -->
<Meta
  title='Components/Atoms/Pagination'
  component={ Pagination }
  argTypes={{
    totalPage: { type: 'number' },
    onClick: { action: 'onClick' },
  }}
/>

<!-- More on component templates: https://storybook.js.org/docs/svelte/writing-stories/introduction#using-args -->
<Template let:args>
  <Pagination { ...args }/>
</Template>

<!-- More on args: https://storybook.js.org/docs/svelte/writing-stories/args -->
<Story
  name='Normal'
  args={{
    totalPage: 3,
  }}
/>
