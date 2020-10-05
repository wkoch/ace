<script>
    import Toggle from "./Toggle.svelte";
    export let text;

    export let id;

    export let checked = false;
    export let disabled = false;
</script>

<div class="columns is-mobile is-vcentered">
    <div class="column is-large is-size-5"><strong>{text}</strong></div>
    <div class="column is-narrow is-right">
        <Toggle {id} {checked} {disabled} />
    </div>
</div>
