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
  ><h3>{ label }</h3></a>
{:else}
  <h3>{ label }</h3>
{/if}
