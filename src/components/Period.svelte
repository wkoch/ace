<script>
    import TimeInput from "./TimeInput.svelte";

    /** @type {string} */
    export let name;

    /** @type {string} */
    export let start;

    /** @type {string} */
    export let end;

    // Toggle
    /** @type {boolean} */
    export let checked = true;

    /** @type {string} */
    $: color = checked ? "text-green-500" : "text-gray-500";

    /** @type {string} */
    $: rotate = checked ? "" : "rotate";

    /** @type {boolean} */
    $: disabled = checked ? false : true;
</script>

<style>
    .rotate {
        transform: rotate(180deg);
    }
</style>

<section class="flex flex-col justify-around h-48 px-4 py-4">
    <header class="flex flex-row justify-between">
        <h3 class="text-lg leading-7 font-large text-gray-900">{name}</h3>
        <div
            class="text-md leading-7 font-medium align-right {color}"
            on:click={() => (checked = !checked)}>
            <svg
                class="h-8 w-8 {rotate}"
                stroke="none"
                fill="currentColor"
                viewBox="0 0 16 16"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round">
                <path
                    fill-rule="evenodd"
                    d="M5 3a5 5 0 0 0 0 10h6a5 5 0 0 0 0-10H5zm6 9a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
            </svg>
        </div>
    </header>

    <TimeInput label="Início" id="{name}Início" value={start} {disabled} />

    <TimeInput label="Fim" id="{name}Fim" value={end} {disabled} />
</section>
