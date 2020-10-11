<script>
    import { TEXT } from "../data/Data";

    /**
     * @typedef { import("../lib/Types").Inspections } Inspections
     * @typedef { import("../lib/Types").TYPE } TYPE
     */
    import Button from "./Button.svelte";
    import Rain from "./Icons/Rain.svelte";
    import Checkmark from "./Icons/Checkmark.svelte";
    import Denied from "./Icons/Denied.svelte";
    import Repeat from "./Icons/Repeat.svelte";
    import Settings from "./Icons/Settings.svelte";

    /** @type {Inspections} */
    export let inspections;

    /** @type {boolean} */
    export let panelVisible;
    /** @type {boolean} */
    export let modalVisible;

    /** @type {(type: TYPE) => void} */
    function add(type) {
        let next = {
            index: inspections.length + 1,
            period: TEXT.MORNING,
            type: type,
            start: 0,
            end: 0,
            nextInterval: TEXT.NONE,
        };
        inspections = [...inspections, next];
    }

    function showModal() {
        modalVisible = true;
    }
</script>

<nav
    class="bg-gray-800 fixed bottom-0 w-full shadow-top border-t-2 border-gray-600">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20 align-middle">
            <div class="flex items-center m-auto align-middle">
                <Button
                    id={TEXT.RAIN}
                    classes="p-3 border-2 border-transparent text-indigo-400 rounded-full hover:text-indigo-600 focus:outline-none"
                    label="Modal"
                    action={() => (modalVisible = true)}>
                    <Rain />
                </Button>
                <Button
                    id={TEXT.NORMAL}
                    classes="p-3 border-2 border-transparent text-green-400 rounded-full hover:text-green-600 focus:outline-none"
                    label="Nav"
                    action={() => add(TEXT.NORMAL)}>
                    <Checkmark />
                </Button>
                <button
                    id={TEXT.CLOSED}
                    class="p-3 border-2 border-transparent text-red-400 rounded-full hover:text-red-600 focus:outline-none"
                    aria-label="Nav"
                    on:click={() => add(TEXT.CLOSED)}>
                    <Denied />
                </button>
                <button
                    id={TEXT.RECOVERED}
                    class="p-3 border-2 border-transparent text-teal-400 rounded-full hover:text-teal-600 focus:outline-none"
                    aria-label="Nav"
                    on:click={() => add(TEXT.RECOVERED)}>
                    <Repeat />
                </button>
                <button
                    id={TEXT.MENU}
                    class="p-3 border-2 border-transparent text-gray-400 rounded-full hover:text-gray-600 focus:outline-none"
                    aria-label="Menu"
                    on:click={() => (panelVisible = true)}>
                    <Settings />
                </button>
            </div>
        </div>
    </div>
</nav>
