<script lang="ts">
    import { TEXT } from "../data/Data";
    import { fade } from "svelte/transition";

    export let confirmVisible = false;
</script>

{#if confirmVisible}
    <div
        class="z-10 fixed top-0 left-0 flex flex-col justify-center h-screen w-screen items-center text-center align-middle overflow-hidden bg-gray-500 bg-opacity-75"
        transition:fade={{ duration: 300 }}>
        <div
            class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
            transition:fade={{ duration: 300 }}>
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                    <div
                        class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <svg
                            class="h-6 w-6 text-red-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3
                            class="text-lg leading-6 font-medium text-gray-900"
                            id="modal-headline">
                            {TEXT.CONFIRM.TITLE}
                        </h3>
                        <div class="mt-2">
                            <p class="text-sm leading-5 text-gray-500">
                                {TEXT.CONFIRM.QUESTION}
                            </p>
                            <p class="text-sm leading-5 text-gray-500">
                                {TEXT.CONFIRM.WARNING}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div
                class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <span
                    class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                    <button
                        type="button"
                        class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out span-150 sm:text-sm sm:leading-5">
                        {TEXT.DELETE}
                    </button>
                </span>
                <span
                    class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                    <button
                        type="button"
                        class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out span-150 sm:text-sm sm:leading-5"
                        on:click={() => (confirmVisible = false)}>
                        {TEXT.CANCEL}
                    </button>
                </span>
            </div>
        </div>
    </div>
{/if}
