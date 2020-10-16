<script lang="ts">
    import type {
        Inspection,
        Inspections,
        Interval,
        Period,
    } from "../lib/Types";
    export let label = "";
    export let id = "";
    export let value = "00:00";
    export let disabled = false;
    export let error = false;

    $: colorDisabled = disabled ? "text-gray-400" : "text-gray-700";
    $: colorError = error ? "border-red-400" : "";
</script>

<section class="grid grid-cols-6 items-center">
    <label for={id} class="col-span-2 text-gray-700">{label}:</label>
    <input
        {id}
        type="time"
        bind:value
        class="col-span-4 align-center text-center {colorError} {colorDisabled} max-w-full bg-white overflow-hidden text-gray-400 border-gray-400 border rounded-md"
        {disabled} />
    <!-- <div
        class="col-span-4 text-sm  grid grid-cols-6 items-center">
        <svg
            class="h-4 w-4 col-span-2 m-2"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
        
    </div> -->
</section>
