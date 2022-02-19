<script lang='ts'>
  export let label: string;
  export let onClick: () => void;
</script>

<button class='pure-button pure-button-primary'
  on:click={ onClick }
>
  <span>
    <slot/>
    { label }
  </span>
</button>
