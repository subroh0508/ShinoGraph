<script lang='ts'>
  import { SideMenu } from '$lib/organisms/sidemenu';

  const menus = [
    {
      label: 'アイドル',
      children: [
        { label: '櫻木真乃', href: '/idol/Sakuragi_Mano' },
        { label: '風野灯織', href: '/idol/Kazano_Hiori' },
        { label: '八宮めぐる', href: '/idol/Hachimiya_Meguru' },
      ],
    },
    { label: 'クエリ', href: '/try' },
  ];
</script>

<div
  id='menu'
  class='pure-menu'
>
  <SideMenu
    head='283db'
    menus={ menus }
  />
</div>

<style lang='scss'>
  #menu {
    position: fixed;
    height: 100%;
    width: var(--drawer-width);
    background-color: var(--primary-color);
    border-right: 1px solid var(--dark-gray);
  }
</style>
