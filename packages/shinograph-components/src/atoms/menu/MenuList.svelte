<ul class='pure-menu-list'>
  <slot/>
</ul>

<style lang='scss'>
  ul {
    border-top: 1px solid var(--dark-gray);
  }

  :global(li),
  :global(ul) {
    list-style: none;
    padding-left: 0;
  }
</style>
