<script lang='ts' context='module'>
  export let text: string | null = null;
</script>

{#if !!text}
  <span class='meta'>{ text }</span>
{/if}

<style lang='scss'>
  .meta {
    font-size: 0.75rem;
  }
</style>

