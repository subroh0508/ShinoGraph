<div class='container'>
  <slot/>
</div>

<style lang='scss'>
  .container {
    :global(.row) {
      border-top: 1px solid var(--dark-gray);
      border-left: 1px solid var(--dark-gray);
      border-right: 1px solid var(--dark-gray);

      &:last-child {
        border-bottom: 1px solid var(--dark-gray);
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
      }
    }

    :global(table) {
      border-top: none;
      border-bottom: none;
      border-right: none;
    }

    :global(table),
    :global(th):first-child,
    :global(td):first-child {
      border-left: none;
    }
  }
</style>
