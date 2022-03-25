<script lang='ts'>
  export let colspan: number;
</script>

<tfoot class='footer'>
  <tr>
    <th colspan={ colspan }>
      <slot/>
    </th>
  </tr>
</tfoot>
