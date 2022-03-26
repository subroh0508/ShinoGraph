<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import Icon from 'svelte-awesome';
  import { ResponseStatus } from '@shinograph/components/atoms';
</script>

<!-- More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export -->
<!-- More on argTypes: https://storybook.js.org/docs/svelte/api/argtypes -->
<Meta
  title='Components/Atoms/ResponseStatus'
  component={ ResponseStatus }
  argTypes={{
    httpStatusMessage: { type: 'string', control: 'text' },
    errorMessage: { type: 'string', control: 'text' },
    statusCode: {
      options: [200, 300, 400, 500],
      control: 'select',
    }
  }}
/>

<!-- More on component templates: https://storybook.js.org/docs/svelte/writing-stories/introduction#using-args -->
<Template let:args>
  <ResponseStatus
    statusCode={ args.statusCode }
    message={ [args.httpStatusMessage, args.errorMessage].filter(v => v) }
  />
</Template>

<!-- More on args: https://storybook.js.org/docs/svelte/writing-stories/args -->
<Story
  name='Status 200'
  args={{
    statusCode: 200,
    httpStatusMessage: 'OK',
    errorMessage: null,
  }}
/>

<Story
  name='Status 300'
  args={{
    statusCode: 300,
    httpStatusMessage: 'Multiple Choice',
    errorMessage: null,
  }}
/>

<Story
  name='Status 400'
  args={{
    statusCode: 400,
    httpStatusMessage: 'Bad Request',
    errorMessage: 'Parse Error: Something Wrong',
  }}
/>

<Story
  name='Status 500'
  args={{
    statusCode: 500,
    httpStatusMessage: 'Internal Server Error',
    errorMessage: 'Parse Error: Something Wrong',
  }}
/>
