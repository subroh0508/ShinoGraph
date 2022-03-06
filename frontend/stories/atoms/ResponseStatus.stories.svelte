<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import Icon from 'svelte-awesome';
  import { ResponseStatus } from '$components/atoms/text';
</script>

<!-- More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export -->
<!-- More on argTypes: https://storybook.js.org/docs/svelte/api/argtypes -->
<Meta
  title='Components/Atoms/ResponseStatus'
  component={ ResponseStatus }
  argTypes={{
    message: { type: 'string', control: 'text' },
    status: {
      options: [200, 300, 400, 500],
      control: 'select',
    }
  }}
/>

<!-- More on component templates: https://storybook.js.org/docs/svelte/writing-stories/introduction#using-args -->
<Template let:args>
  <ResponseStatus { ...args }/>
</Template>

<!-- More on args: https://storybook.js.org/docs/svelte/writing-stories/args -->
<Story
  name='Status 200'
  args={{
    status: 200,
    message: 'OK',
  }}
/>

<Story
  name='Status 300'
  args={{
    status: 300,
    message: 'Multiple Choice',
  }}
/>

<Story
  name='Status 400'
  args={{
    status: 400,
    message: 'Bad Request: Something Wrong',
  }}
/>

<Story
  name='Status 500'
  args={{
    status: 500,
    message: 'Internal Server Error: Something Wrong',
  }}
/>
