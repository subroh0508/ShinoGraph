<script lang='ts'>
  import '../app.css';
  import 'purecss';

  import { DrawerMenu, MainLayout } from '$components/templates';
</script>

<DrawerMenu/>
<MainLayout>
  <main>
    <slot />
  </main>
</MainLayout>

<style lang='scss'>
  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    width: 100%;
    max-width: 1024px;
    margin: 0 auto;
    box-sizing: border-box;
    background-color: var(--pure-white);
  }
</style>
