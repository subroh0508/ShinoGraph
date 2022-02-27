<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import { SideMenu } from '$components/organisms/sidemenu';

  const menus = [
    {
      label: 'Label 1',
      children: [
        { label: 'Child Label 11', href: '/child_11' },
        { label: 'Child Label 12', href: '/child_12' },
        { label: 'Child Label 13', href: '/child_13' },
      ],
    },
    {
      label: 'Label 2',
      children: [
        {
          label: 'Child Label 21',
          children: [
            { label: 'Grand Child Label 211', href: '/child_211' },
            { label: 'Grand Child Label 212', href: '/child_212' },
            { label: 'Grand Child Label 213', href: '/child_213' },
          ],
        },
        {
          label: 'Child Label 22',
          children: [
            { label: 'Grand Child Label 221', href: '/child_221' },
            { label: 'Grand Child Label 222', href: '/child_222' },
            { label: 'Grand Child Label 223', href: '/child_223' },
          ],
        },
        { label: 'Child Label 23', href: '/child_23' },
        { label: 'Child Label 24', href: '/child_24' },
      ],
    },
    {
      label: 'Label 3',
      children: [
        { label: 'Child Label 31', href: '/child_31' },
        { label: 'Child Label 32', href: '/child_32' },
        { label: 'Child Label 33' },
      ],
    },
  ]
</script>

<!-- More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export -->
<!-- More on argTypes: https://storybook.js.org/docs/svelte/api/argtypes -->
<Meta
  title='Components/Organisms/SideMenu'
  component={ SideMenu }
/>

<!-- More on component templates: https://storybook.js.org/docs/svelte/writing-stories/introduction#using-args -->
<Template let:args>
  <SideMenu { ...args }/>
</Template>

<!-- More on args: https://storybook.js.org/docs/svelte/writing-stories/args -->
<Story
  name='Normal'
  args={{ menus }}
/>
