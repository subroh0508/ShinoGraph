<script lang='ts'>
  import Node from './SideMenuNode.svelte';
  import { MenuHeading, MenuList } from '$components/atoms/menu';

  export let head: string | null;
  export let menus = [];
  export let onClick: (href: string) => void = void {};
</script>

<MenuHeading
  label={ head }
  href='/'
/>
<MenuList>
  {#each menus as menu}
    <Node {...menu} onClick={ onClick }/>
  {/each}
</MenuList>
