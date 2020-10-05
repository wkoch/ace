<script>
    import { ICON, TEXT, TYPE } from "../data/Data";
    import { inspectionIcon } from "../lib/Inspection";

    export let inspection;

    $: ícone = inspectionIcon(inspection);
</script>

<style>
</style>

<div class="box">
    <div class="columns">
        <div class="column">
            <span class="icon is-size-2">
                <i class="fas fa-{ícone}" aria-hidden="true" />
            </span>
        </div>
        <div class="column" />
        <p>{TEXT.ENTERED}:</p>
        <div class="column" />
        <div class="column" />
    </div>
</div>
