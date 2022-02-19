<script lang='ts'>
  export let label: string;
  export let onClick: () => void;
</script>

<button class='pure-button pure-button-primary'
  on:click={ onClick }
>
  <slot/>
  { label }
</button>

<style lang='scss'>
  button {
    :global(svg) {
      margin-right: 6px;
      vertical-align: text-top;
    }
  }
</style>
