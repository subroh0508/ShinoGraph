<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import { RDFEntityBuilder } from '@shinograph/client';
  import { RDFEntityViewer } from '@shinograph/components/organisms';
  //import properties from '../../src/routes/idol/properties.yml';
  import json from '../json/data-table.json';

  function buildEntity(name) {
    return new RDFEntityBuilder(
      { primary: 'label', secondary: 'description' },
      'predicate',
      { primary: 'object', secondary: 'objectName' },
      {
        'https://283db.org/schema#': 'scdb',
        'http://schema.org/': 'schema',
        'http://dbpedia.org/ontology/': 'dbo',
        'http://www.w3.org/1999/02/22-rdf-syntax-ns#': 'rdf',
        'http://www.w3.org/2000/01/rdf-schema#': 'rdfs',
        'http://www.w3.org/2001/XMLSchema#': 'xsd',
      },
      {},
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
