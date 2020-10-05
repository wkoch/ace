<script>
    import Icon from "./Icon.svelte";
    export let text;
    export let id;
    export let time;

    export let disabled;
</script>

<div class="columns is-mobile is-vcentered">
    <div class="column has-text-right">{text}</div>
    <div class="column is-narrow">
        <div class="field">
            <p class="control has-icons-left">
                <input
                    class="is-small is-rounded input"
                    {id}
                    type="time"
                    bind:value={time}
                    {disabled} />
                <Icon classes={'is-small is-left'} icon={'clock'} />
            </p>
        </div>
    </div>
</div>
