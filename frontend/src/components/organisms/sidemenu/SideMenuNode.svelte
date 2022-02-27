<script lang='ts'>
  import { MenuHeader, MenuItem } from '$components/atoms/menu';

  export let label: string = '';
  export let href: string | null = null;
  export let children = [];
  export let indent: number = 0;
  export let onClick: (href: string) => void = void {};

  let expand: boolean = false;

  function toggle() {
    expand = !expand;
  }

  function handleOnItemClick() {
    onClick(href)
  }
</script>

{#if !!children.length}
  <MenuHeader
    label={ label }
    indent={ indent }
    expand={ expand }
    onClick={ toggle }
  >
    {#if expand}
      {#each children as child}
        <svelte:self { ...child } indent={ 8 }/>
      {/each}
    {/if}
  </MenuHeader>
{:else}
  <MenuItem
    label={ label }
    href={ href }
    indent={ indent }
    onClick={ handleOnItemClick }
  />
{/if}
