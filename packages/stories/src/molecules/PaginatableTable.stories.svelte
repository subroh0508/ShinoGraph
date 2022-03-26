<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import { TableHeader, TableData, PaginatableTable } from '@shinograph/components/molecules';
  import json from '../json/data-list-table.json';

  const randomNumbers = [0, 5, 15, 80, 100].map(count =>
    new Array(count).fill(null).map(() => calculateRandomNumber()),
  );

  function calculateRandomNumber() {
    return new Array(10).fill(null)
      .map(() => Math.floor(Math.random() * 16).toString(16))
      .join('');
  }

  function meta(v) {
    return (v && v.hasOwnProperty('datatype')) ? v.datatype.label : null;
  }

  function href(v) {
    return (v && v.type === 'uri') ? v.value : null;
  }
</script>

<!-- More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export -->
<!-- More on argTypes: https://storybook.js.org/docs/svelte/api/argtypes -->
<Meta
  title='Components/Molecules/PaginatableTable'
  component={ PaginatableTable }
  argTypes={{
    striped: {
      control: 'boolean',
    },
  }}
/>

<!-- More on component templates: https://storybook.js.org/docs/svelte/writing-stories/introduction#using-args -->
<Template let:args id='RandomNumber'>
  <PaginatableTable
    let:rows={ rows }
    let:offset={ offset }
    striped={ args.striped }
    data={ args.data }
    footerColspan={ 2 }
  >
    <thead slot='header'>
      <tr>
        <TableHeader label={ '#' }/>
        <TableHeader label={ 'RandomNumber' }/>
      </tr>
    </thead>
    <tbody slot='body'>
      {#each rows as row, i}
        <tr>
          <TableData label={ (offset + i + 1).toString() }/>
          <TableData label={ row }/>
        </tr>
      {/each}
    </tbody>
  </PaginatableTable>
</Template>

<!-- More on args: https://storybook.js.org/docs/svelte/writing-stories/args -->
<Story
  template='RandomNumber'
  name='Data Count: 0'
  args={{ data: randomNumbers[0], striped: false }}
/>

<Story
  template='RandomNumber'
  name='Data Count: 5'
  args={{ data: randomNumbers[1], striped: false }}
/>

<Story
  template='RandomNumber'
  name='Data Count: 15'
  args={{ data: randomNumbers[2], striped: false }}
/>

<Story
  template='RandomNumber'
  name='Data Count: 80'
  args={{ data: randomNumbers[3], striped: false }}
/>

<Story
  template='RandomNumber'
  name='Data Count: 100'
  args={{ data: randomNumbers[4], striped: false }}
/>

<Template let:args id='JsonData'>
  <PaginatableTable
    let:rows={ rows }
    let:offset={ offset }
    striped={ args.striped }
    data={ args.data }
    footerColspan={ args.headers.length + 1 }
  >
    <thead slot='header'>
    <tr>
      <TableHeader label={ '#' }/>
      {#each args.headers as header}
        <TableHeader label={ header }/>
      {/each}
    </tr>
    </thead>
    <tbody slot='body'>
    {#each rows as row, i}
      <tr>
        <TableData label={ (offset + i + 1).toString() }/>
        {#each args.headers as header}
          <TableData
            label={ (row[header] && row[header].value) || '' }
            href={ href(row[header]) }
            meta={ meta(row[header]) }
          />
        {/each}
      </tr>
    {/each}
    </tbody>
  </PaginatableTable>
</Template>

<Story
  template='JsonData'
  name='Literal Values: Idol'
  args={{ headers: json.headers['Idols'], data: json.data['Idols'], striped: false }}
/>

<Story
  template='JsonData'
  name='Uri Values: Place'
  args={{ headers: json.headers['Places'], data: json.data['Places'], striped: false }}
/>

<Story
  template='JsonData'
  name='Uri Values: Movie'
  args={{ headers: json.headers['Movies'], data: json.data['Movies'], striped: false }}
/>
