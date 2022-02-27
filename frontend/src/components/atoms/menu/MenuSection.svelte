<script lang='ts'>
  import Icon from 'svelte-awesome';
  import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

  export let label: string = '';
  export let expand: boolean = false;
  export let onClick: () => void = void {};
</script>

<li class='pure-menu-item'>
  <span on:click={ onClick }>
    { label }
    <Icon data={ expand ? faChevronUp : faChevronDown }/>
  </span>
  {#if expand}
    <ul>
      <slot/>
    </ul>
  {/if}
</li>

<style lang='scss'>
  li {
    padding: 0.5em 1em;
    cursor: pointer;

    :global(svg) {
      margin-left: 6px;
      vertical-align: text-top;
    }

    > ul {
      padding-top: 8px;
    }
  }
</style>
