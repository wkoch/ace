<script>
  import Icon from "./Icon.svelte";

  // Variáveis
  /** @type {string} */
  export let id = "";

  /** @type {string} */
  export let classes = "";

  /** @type {string} */
  export let icon = "";

  /** @type {number} */
  export let count = 0;

  /** @type {boolean} */
  export let disabled = false;

  /** @type {any} */
  export let action;

  // Computado
  /** @type {boolean} */
  $: badge = count > 0 ? true : false;
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
    font-size: 0.5em;
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
  class="button {classes}"
  class:badge
  {id}
  data-badge={count}
  on:click={action}
  {disabled}>
  <slot />
</button>
