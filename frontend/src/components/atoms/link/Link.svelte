<script lang='ts' context='module'>
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
