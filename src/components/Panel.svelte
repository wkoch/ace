<script>
    /**
     * @typedef { import("../lib/Types").Period } Period
     * @typedef { import("../lib/Types").Interval } Interval
     */
    import { TEXT } from "../data/Data";
    import { fly, fade } from "svelte/transition";
    import Period from "./Period.svelte";
    import Toggle from "./Toggle.svelte";
    import { stringToTime } from "../lib/Time";
    import { getInitialPeriod } from "../lib/Periods";
    import { getLunchInterval } from "../lib/Intervals";

    /** @type {boolean} */
    export let panelVisible = false;

    /** @type {boolean} */
    export let random = false;

    /** @type {boolean} */
    export let lock = false;

    /** @type {Period} */
    export let dayPeriod;

    /** @type {Interval} */
    export let lunchInterval;

    // DADOS DA MORNING
    /** @type {Period} */
    let Morning = {
        name: TEXT.MORNING,
        active: true,
        startTime: "08:40",
        endTime: "11:20",
        start: 31200000,
        end: 40800000,
        span: 9600000,
        nextInterval: null,
    };

    // DADOS DA AFTERNOON
    /** @type {Period} */
    let Afternoon = {
        name: TEXT.AFTERNOON,
        active: true,
        startTime: "14:20",
        endTime: "17:20",
        start: 51600000,
        end: 62400000,
        span: 10800000,
        nextInterval: null,
    };

    function save() {}

    $: Morning.start = stringToTime(Morning.startTime);
    $: Morning.end = stringToTime(Morning.endTime);
    $: Morning.span = Morning.end - Morning.start;
    $: Afternoon.start = stringToTime(Afternoon.startTime);
    $: Afternoon.end = stringToTime(Afternoon.endTime);
    $: Afternoon.span = Afternoon.end - Afternoon.start;
    $: dayPeriod = getInitialPeriod(Morning, Afternoon);
    $: lunchInterval = getLunchInterval(Morning, Afternoon);
</script>

{#if panelVisible}
    <div
        class="fixed inset-0 overflow-hidden"
        transition:fade={{ duration: 500 }}>
        <div class="absolute inset-0 overflow-hidden">
            <div
                class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            <section class="absolute inset-y-0 right-0 pl-10 max-w-full flex">
                <div
                    class="relative w-screen max-w-xs"
                    transition:fly={{ x: 500, duration: 500 }}>
                    <div
                        class="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4">
                        <button
                            aria-label="Fechar painel"
                            class="text-gray-800 hover:text-white transition ease-in-out span-150"
                            on:click={() => (panelVisible = false)}>
                            <svg
                                class="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div
                        class="h-full flex flex-col justify-between space-6 bg-white shadow-xl overflow-y-scroll">
                        <h2
                            class="text-lg leading-7 font-large text-gray-900 px-4 py-6">
                            Configurações
                        </h2>
                        <Period
                            name={TEXT.MORNING}
                            bind:checked={Morning.active}
                            bind:start={Morning.startTime}
                            bind:end={Morning.endTime} />
                        <hr class="m-4" />
                        <Period
                            name="Tarde"
                            bind:checked={Afternoon.active}
                            bind:start={Afternoon.startTime}
                            bind:end={Afternoon.endTime} />
                        <hr class="m-4" />
                        <div>
                            <Toggle name={TEXT.RANDOM} checked={random} />
                            <div class="my-2" />
                            <Toggle name={TEXT.LOCK} checked={lock} />
                        </div>
                        <div
                            class="bg-gray-200 py-6 px-4 grid md:grid-cols-2 gap-4">
                            <span class="w-full rounded-md shadow-sm">
                                <button
                                    type="button"
                                    class="w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out span-150 sm:text-sm sm:leading-5"
                                    on:click={() => (panelVisible = false)}>
                                    {TEXT.CANCEL}
                                </button>
                            </span>
                            <span class="w-full rounded-md shadow-sm">
                                <button
                                    type="button"
                                    class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out span-150 sm:text-sm sm:leading-5"
                                    on:click={save}>
                                    {TEXT.SAVE}
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
{/if}
