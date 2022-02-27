<script lang='ts'>
  export let label: string = '';
  export let href: string | null = null;
  export let onClick: () => void = void {};
</script>

<li
  class='pure-menu-item'
  on:click={ onClick }
>
  {#if !!href}
    <a
      class='pure-menu-link'
      href={ href }
    >{ label }</a>
  {:else}
    <div>{ label }</div>
  {/if}
</li>

<style lang='scss'>
  a {
    color: var(--accent-color);
  }

  div {
    padding: 8px 16px;
    cursor: default;
  }
</style>
