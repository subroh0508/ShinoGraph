<script lang='ts'>
  export let label: string = '';
  export let href: string | null = null;
  export let onClick: () => void = void {};
</script>

{#if !!href}
  <a
    class='pure-menu-heading'
    href={ href }
    on:click={ onClick }
  >{ label }</a>
{:else}
  <div>{ label }</div>
{/if}

<style lang='scss'>
  a {
    border-bottom: 1px solid var(--dark-gray);
  }
</style>
