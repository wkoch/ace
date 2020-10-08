<script>
    export let modalVisible = false;
</script>

<tr>
    <td class="px-3 py-4 whitespace-no-wrap">
        <div class="text-lg leading-5 text-gray-900 text-center">1</div>
    </td>
    <td class="px-3 py-4 whitespace-no-wrap">
        <div class="flex items-center text-center">
            <div class="flex-shrink-0 h-10 w-10 m-auto text-green-400">
                <svg
                    class="h-10 w-10"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
            </div>
        </div>
    </td>
    <td class="px-3 py-4 whitespace-no-wrap">
        <div class="text-lg leading-5 text-gray-900 text-center">08:40</div>
    </td>
    <td class="px-3 py-4 whitespace-no-wrap hidden md:table-cell">
        <div class="text-lg leading-5 text-gray-900 text-center">09:55</div>
    </td>
    <td
        class="px-3 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 text-center">
        <button
            class="p-1 border-2 border-transparent text-indigo-600 rounded-full hover:indigo-gray-700 focus:outline-none"
            aria-label="Notifications">
            <svg
                class="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1"
                stroke-linecap="round"
                stroke-linejoin="round">
                <path
                    d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path
                    d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
        </button>
        <button
            class="p-1 border-2 border-transparent text-red-600 rounded-full hover:text-red-700 focus:outline-none"
            aria-label="Notifications"
            on:click={() => (modalVisible = true)}>
            <svg
                class="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1"
                stroke-linecap="round"
                stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path
                    d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
            </svg>
        </button>
    </td>
</tr>
