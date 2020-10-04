<script>
  // Variáveis
  /** @type {string} */
  export let id = "";

  /** @type {string} */
  export let classe = "";

  /** @type {string} */
  export let ícone = "";

  /** @type {number} */
  export let distintivo = 0;

  /** @type {any} */
  export let onclick;

  // Computado
  $: badge = distintivo > 0 ? true : false;
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
  class="is-large button {classe}"
  class:badge
  {id}
  data-badge={distintivo}
  on:click={onclick}>
  <span class="icon is-size-2">
    <i class="fas fa-{ícone}" aria-hidden="true" />
  </span>
</button>
