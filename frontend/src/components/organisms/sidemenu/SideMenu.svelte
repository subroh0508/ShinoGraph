<script lang='ts'>
  import Node from './SideMenuNode.svelte';
  import { MenuHeading, MenuList } from '$components/atoms/menu';

  export let menus = [];
  export let onClick: (href: string) => void = void {};
</script>

<MenuList>
  <MenuHeading
    label='283db'
    href='/'
  />
  {#each menus as menu}
    <Node {...menu} onClick={ onClick }/>
  {/each}
</MenuList>
