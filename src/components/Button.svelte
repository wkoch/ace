<script lang="ts">
  export let action: any;
  export let classes = "";
  export let id = "";
  export let label = "";
  export let badge = 0;
  export let disabled = false;

  $: showBadge = badge > 0 ? classes + " badge" : classes;
</script>

<style>
  .badge {
    position: relative;
  }
  .badge[data-badge]:after {
    content: attr(data-badge);
    position: absolute;
    top: -8px;
    right: -5px;
    font-size: 1em;
    background: lightslategray;
    color: white;
    width: 1.5rem;
    height: 1.5rem;
    text-align: center;
    line-height: 1.5rem;
    border-radius: 50%;
    box-shadow: 0 0 1px #333;
  }
</style>

<button
  {id}
  class={showBadge}
  aria-label={label}
  on:click={action}
  data-badge={badge} {disabled}>
  <slot />
</button>
