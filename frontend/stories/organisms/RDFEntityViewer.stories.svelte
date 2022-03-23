<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import { RDFEntityViewer } from '$components/organisms/viewer';
  import { RDFEntityBuilder } from '../../src/lib/RDFEntityBuilder';
  import properties from '../../src/routes/idol/properties.yml';
  import json from '../json/data-table.json';

  function buildEntity(name) {
    return new RDFEntityBuilder(
      { primary: 'label', secondary: 'description' },
      'predicate',
      { primary: 'object', secondary: 'objectName' },
      properties,
    ).build(json[name]);
  }
</script>

<!-- More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export -->
<!-- More on argTypes: https://storybook.js.org/docs/svelte/api/argtypes -->
<Meta
  title='Components/Organisms/RDFEntityViewer'
  component={ RDFEntityViewer }
  argTypes={{
    name: {
      options: ['Sakuragi Mano'],
      control: 'select',
    },
  }}
/>

<!-- More on component templates: https://storybook.js.org/docs/svelte/writing-stories/introduction#using-args -->
<Template let:args>
  <RDFEntityViewer entity={ buildEntity(args.name) }/>
</Template>

<!-- More on args: https://storybook.js.org/docs/svelte/writing-stories/args -->
<Story
  name='Idol'
  args={{ name: 'Sakuragi Mano' }}
/>
