<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import { TableHeader, TableData, PaginatableTable } from '$components/molecules/table';

  const rowList = Object.fromEntries([
    ...[0, 5, 15, 80, 100].map(count => [
      `Random Numbers: ${count}`,
      new Array(count).fill(null).map(() => calculateRandomNumber()),
    ]),
  ]);

  function calculateRandomNumber() {
    return new Array(10).fill(null)
      .map(() => Math.floor(Math.random() * 16).toString(16))
      .join('');
  }
</script>

<!-- More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export -->
<!-- More on argTypes: https://storybook.js.org/docs/svelte/api/argtypes -->
<Meta
  title='Components/Molecules/PaginatableTable'
  component={ PaginatableTable }
  argTypes={{
    data: {
      options: Object.keys(rowList),
      control: 'select',
    },
    striped: {
      control: 'boolean',
    },
  }}
/>

<!-- More on component templates: https://storybook.js.org/docs/svelte/writing-stories/introduction#using-args -->
<Template let:args>
  <PaginatableTable
    let:rows={ rows }
    let:offset={ offset }
    striped={ args.striped }
    data={ rowList[args.data] }
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
  name='Empty Header'
  args={{ data: 'EmptyHeader', striped: false }}
/>

<Story
  name='Data Count: 0'
  args={{ data: 'Random Numbers: 0', striped: false }}
/>

<Story
  name='Data Count: 5'
  args={{ data: 'Random Numbers: 5', striped: false }}
/>

<Story
  name='Data Count: 15'
  args={{ data: 'Random Numbers: 15', striped: false }}
/>

<Story
  name='Data Count: 80'
  args={{ data: 'Random Numbers: 80', striped: false }}
/>

<Story
  name='Data Count: 100'
  args={{ data: 'Random Numbers: 100', striped: false }}
/>

<!--
<Story
  name='Literal Values: Idol'
  args={{ data: 'Idols', striped: false }}
/>

<Story
  name='Uri Values: Place'
  args={{ data: 'Places', striped: false }}
/>

<Story
  name='Uri Values: Movie'
  args={{ data: 'Movies', striped: false }}
/>
-->
