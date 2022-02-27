<script lang='ts'>
  import { MenuSection, MenuItem } from '$components/atoms/menu';

  export let label: string = '';
  export let href: string | null = null;
  export let children = [];
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
  <MenuSection
    label={ label }
    expand={ expand }
    onClick={ toggle }
  >
    {#if expand}
      {#each children as child}
        <svelte:self { ...child }/>
      {/each}
    {/if}
  </MenuSection>
{:else}
  <MenuItem
    label={ label }
    href={ href }
    indent={ indent }
    onClick={ handleOnItemClick }
  />
{/if}
