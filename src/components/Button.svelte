<script>
    export let action;
    export let classes = "";
    export let id = "";
    export let label = "";
    export let badge = 0;

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
