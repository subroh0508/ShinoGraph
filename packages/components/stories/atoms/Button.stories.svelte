<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import Icon from 'svelte-awesome';
  import { faPlay, faPen, faUser } from '@fortawesome/free-solid-svg-icons';
  import { Button } from '$atoms/button';

  const icons = { 'fa-play': faPlay, 'fa-pen': faPen, 'fa-user': faUser }
</script>

<!-- More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export -->
<!-- More on argTypes: https://storybook.js.org/docs/svelte/api/argtypes -->
<Meta
  title='Components/Atoms/Button'
  component={ Button }
  argTypes={{
    label: { type: 'string', control: 'text' },
    onClick: { action: 'onClick' },
    icon: {
      options: ['None', ...Object.keys(icons)],
      control: 'select',
    }
  }}
/>

<!-- More on component templates: https://storybook.js.org/docs/svelte/writing-stories/introduction#using-args -->
<Template let:args>
  <Button { ...args }>
    {#if args.icon !== 'None'}
      <Icon data={ icons[args.icon] }/>
    {/if}
  </Button>
</Template>

<!-- More on args: https://storybook.js.org/docs/svelte/writing-stories/args -->
<Story
  name='Without Icon'
  args={{
    label: 'Label Text',
    icon: 'None',
  }}
/>

<Story
  name='With Icon'
  args={{
    label: 'Label Text',
    icon: 'fa-play',
  }}
/>
