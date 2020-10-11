<script>
    /** @type {any} */
    export let action;
    /** @type {string} */
    export let classes = "";
    /** @type {string} */
    export let id = "";
    /** @type {string} */
    export let label = "";
    /** @type {number} */
    export let badge = 0;

    /** @type {string} */
    $: showBadge = badge > 0 ? classes + "badge" : classes;
</script>

<button
    {id}
    class={showBadge}
    aria-label={label}
    on:click={action}
    data-badge={badge}>
    <slot />
</button>
