<script>
    import { ÍCONE, TIPO } from "../data/Constantes";
    import { íconeDaVistoria } from "../lib/Auxiliares";

    export let vistoria;

    $: ícone = íconeDaVistoria(vistoria);
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
        <p>Entrada:</p>
        <div class="column" />
        <div class="column" />
    </div>
</div>
