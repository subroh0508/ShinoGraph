<script lang='ts'>
  export let href: string | null = null;
</script>

{#if !!href}
  <a
    href={ href }
    target='_blank'
    rel='noopener noreferrer'
  ><slot/></a>
{:else}
  <slot/>
{/if}
