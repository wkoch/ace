<script>
    import Button from "./Button.svelte";
    export let panelVisible = false;
    export let modalVisible = false;
</script>

<nav
    class="bg-gray-800 fixed bottom-0 w-full shadow-top border-t-2 border-gray-600">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20 align-middle">
            <div class="flex items-center m-auto align-middle">
                <Button
                    classes="p-3 border-2 border-transparent text-indigo-400 rounded-full hover:text-indigo-600 focus:outline-none"
                    label="Menu">
                    <svg
                        class="h-10 w-10"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round">
                        <line x1="8" y1="19" x2="8" y2="21" />
                        <line x1="8" y1="13" x2="8" y2="15" />
                        <line x1="16" y1="19" x2="16" y2="21" />
                        <line x1="16" y1="13" x2="16" y2="15" />
                        <line x1="12" y1="21" x2="12" y2="23" />
                        <line x1="12" y1="15" x2="12" y2="17" />
                        <path
                            d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25" />
                    </svg>
                </Button>
                <button
                    class="p-3 border-2 border-transparent text-green-400 rounded-full hover:text-green-600 focus:outline-none"
                    aria-label="Menu">
                    <svg
                        class="h-10 w-10"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                </button>
                <button
                    class="p-3 border-2 border-transparent text-red-400 rounded-full hover:text-red-600 focus:outline-none"
                    aria-label="Notifications">
                    <svg
                        class="h-10 w-10"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="15" y1="9" x2="9" y2="15" />
                        <line x1="9" y1="9" x2="15" y2="15" />
                    </svg>
                </button>
                <button
                    class="p-3 border-2 border-transparent text-teal-400 rounded-full hover:text-teal-600 focus:outline-none"
                    aria-label="Menu"
                    on:click={() => (modalVisible = true)}>
                    <svg
                        class="h-10 w-10"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round">
                        <polyline points="1 4 1 10 7 10" />
                        <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                    </svg>
                </button>
                <button
                    class="p-3 border-2 border-transparent text-gray-400 rounded-full hover:text-gray-600 focus:outline-none"
                    aria-label="Menu"
                    on:click={() => (panelVisible = true)}>
                    <svg
                        class="h-10 w-10"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round">
                        <line x1="4" y1="21" x2="4" y2="14" />
                        <line x1="4" y1="10" x2="4" y2="3" />
                        <line x1="12" y1="21" x2="12" y2="12" />
                        <line x1="12" y1="8" x2="12" y2="3" />
                        <line x1="20" y1="21" x2="20" y2="16" />
                        <line x1="20" y1="12" x2="20" y2="3" />
                        <line x1="1" y1="14" x2="7" y2="14" />
                        <line x1="9" y1="8" x2="15" y2="8" />
                        <line x1="17" y1="16" x2="23" y2="16" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</nav>
