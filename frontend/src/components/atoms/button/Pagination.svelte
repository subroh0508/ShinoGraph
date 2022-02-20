<script lang='ts' context='module'>
  const MIN_BUTTONS_COUNT = 2;
  const MIDDLE_BUTTONS_COUNT = 3;
  const MAX_BUTTONS_COUNT = 7;

  const BACK = '⟨';
  const NEXT = '⟩';
  const FIRST = '«';
  const LAST = '»';
  const ELLIPSIS = '...';

  const calculatePage = (page: number, totalPage: number, button: string): number => {
    switch (button) {
      case ELLIPSIS:
        return page;
      case FIRST:
        return 0;
      case LAST:
        return  totalPage - 1;
      case NEXT:
        return page < totalPage - 1 ? page + 1 : page;
      case BACK:
        return page > 0 ? page - 1 : page;
      default:
        const number = parseInt(button)
        return isNaN(number) ? page : number - 1;
    }
  };

  const buildButtons = (page: number, total: number): string[] => {
    if (total < MIN_BUTTONS_COUNT) {
      return buildNumberButtons(page, total);
    }

    if (total === MIN_BUTTONS_COUNT) {
      return [BACK, ...buildNumberButtons(page, total), NEXT];
    }

    return [FIRST, BACK, ...buildNumberButtons(page, total), NEXT, LAST];
  };

  const buildNumberButtons = (page: number, total: number): string[] => {
    if (total < MIN_BUTTONS_COUNT) {
      return [];
    }

    if (total <= MAX_BUTTONS_COUNT) {
      return new Array(total).fill(0).map((_, i) => (i + 1).toString());
    }

    const middle = new Array(MIDDLE_BUTTONS_COUNT + 2).fill(0);
    const isPrevEllipsisVisible = page > MIDDLE_BUTTONS_COUNT;
    const isNextEllipsisVisible = (total - 1) - page > MIDDLE_BUTTONS_COUNT;
    return [
      '1',
      ...middle.map((_, i) => {
        if (i === 0 && isPrevEllipsisVisible) {
          return ELLIPSIS;
        }

        if (i === middle.length - 1 && isNextEllipsisVisible) {
          return ELLIPSIS;
        }

        if (!isPrevEllipsisVisible && isNextEllipsisVisible) {
          return (MIN_BUTTONS_COUNT + i).toString();
        }

        if (isPrevEllipsisVisible && !isNextEllipsisVisible) {
          return (total - middle.length + i).toString();
        }

        return (page + 1 + (i - Math.trunc((MIDDLE_BUTTONS_COUNT + 2) / 2))).toString();
      }),
      total.toString(),
    ];
  }
</script>

<script lang='ts'>
  export let totalPage: number = 0;
  export let page: number = 0;
  export let onClick: (page: number) => void = (_) => void {};

  let buttons: string[] = buildButtons(page, totalPage);

  const handleOnClick = (button: string) => {
    if (button === ELLIPSIS) {
      return;
    }

    page = calculatePage(page, totalPage, button);
    buttons = buildButtons(page, totalPage);
    onClick(page);
  };
</script>

<div class='pagination pure-button-group' role='group'>
  {#each buttons as button, i}
    <a class='pure-button'
      class:pure-button-active={ button === (page + 1).toString() }
      class:ellipse={ button === ELLIPSIS }
      on:click={ () => handleOnClick(button) }
    >{ button }</a>
  {/each}
</div>

<style lang='scss'>
  .pagination {
    display: flex;

    > .pure-button {
      background-color: #fff;
      border-top: 1px solid rgba(0, 0, 0, 0.2);
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);

      &:first-child {
        border-left: 1px solid rgba(0, 0, 0, 0.2);
      }

      &:last-child {
        border-right: 1px solid rgba(0, 0, 0, 0.2);
      }
    }

    > .pure-button-active {
      background-color: #f2f2f2;
    }

    .ellipse {
      background-image: none;
      box-shadow: none;
      cursor: default;
    }
  }
</style>
