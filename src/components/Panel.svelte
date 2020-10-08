<script>
    import { fly, fade } from "svelte/transition";
    export let panelVisible = false;
</script>

{#if panelVisible}
    <div
        class="fixed inset-0 overflow-hidden"
        transition:fade={{ span: 500 }}>
        <div class="absolute inset-0 overflow-hidden">
            <div
                class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            <section class="absolute inset-y-0 right-0 pl-10 max-w-full flex">
                <div
                    class="relative w-screen max-w-md"
                    transition:fly={{ x: 500, span: 500 }}>
                    <div
                        class="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4">
                        <button
                            aria-label="Fechar painel"
                            class="text-gray-800 hover:text-white transition ease-in-out span-150"
                            on:click={() => (panelVisible = false)}>
                            <svg
                                class="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
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
                        class="h-full flex flex-col space-y-6 py-6 bg-white shadow-xl overflow-y-scroll">
                        <header class="px-4 sm:px-6">
                            <h2
                                class="text-lg leading-7 font-medium text-gray-900">
                                Painel de Configurações
                            </h2>
                        </header>
                        <div class="relative flex-1 px-4 sm:px-6">
                            <!-- Replace with your content -->
                            <div class="absolute inset-0 px-4 sm:px-6">
                <div class="h-full border-2 border-dashed border-gray-200"></div>
              </div>
                            <!-- /End replace -->
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
{/if}
