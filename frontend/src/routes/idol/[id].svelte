<script context='module' lang='ts'>
  export const prerender = true;
</script>

<script lang='ts'>
  export let subject;
</script>

<div>
  <pre>{JSON.stringify(subject, null, 2)}</pre>
</div>

