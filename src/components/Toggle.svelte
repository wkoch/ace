<script lang="ts">
    import type {
        Inspection,
        Inspections,
        Interval,
        Period,
    } from "../lib/Types";

    export let name: string;
    export let checked = true;
    $: color = checked ? "text-green-500" : "text-gray-500";
    $: rotate = checked ? "" : "rotate";
</script>

<style>
    .rotate {
        transform: rotate(180deg);
    }
</style>

<section class="px-4">
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
</section>
