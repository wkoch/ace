<script lang="ts">
  import { timeToString } from "../lib/Time";
  import { Type } from "../lib/Types";
  import type { Inspections, Intervals, Report } from "../lib/Types";

  // export let modalVisible = false;
  export let inspections: Inspections = [];
  export let rains: Intervals = [];
  export let inspection: Report;
  export let lock: boolean = false;

  function changeType(inspection) {
    if (inspection.type == Type.Normal) {
      inspections[inspection.index].type = Type.Closed;
    } else if (inspection.type == Type.Closed) {
      inspections[inspection.index].type = Type.Recovered;
    } else if (inspection.type == Type.Recovered) {
      inspections[inspection.index].type = Type.Normal;
    }
  }

  function remove(index) {
    inspections.splice(index, 1);
    inspections = [...inspections];
  }

  function removeRain(index) {
    rains.splice(index, 1);
    rains = [...rains];
  }
</script>

{#if inspection.type == Type.Lunch && inspection.start > 0}
  <tr class="bg-orange-200 text-orange-600">
    <td class="px-3 py-4 whitespace-no-wrap" />
    <td class="px-3 py-4 whitespace-no-wrap">
      <div class="flex items-center text-center">
        <div class="flex-shrink-0 h-6 w-6 m-auto">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-sun"><circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
        </div>
      </div>
    </td>
    <td class="px-3 py-4 whitespace-no-wrap">
      <div class="text-lg leading-5 text-center">
        {timeToString(inspection.start)}
      </div>
      <div class="text-lg leading-5 text-center md:hidden mt-4">
        {timeToString(inspection.stop)}
      </div>
    </td>
    <td class="px-3 py-4 whitespace-no-wrap hidden md:table-cell">
      <div class="text-lg leading-5 text-center">
        {timeToString(inspection.stop)}
      </div>
    </td>
    <td class="px-3 py-4 whitespace-no-wrap text-sm leading-5 text-center" />
  </tr>
{:else if inspection.type == Type.Rain}
  <tr class="bg-blue-200 text-blue-600">
    <td class="px-3 py-4 whitespace-no-wrap" />
    <td class="px-3 py-4 whitespace-no-wrap">
      <div class="flex items-center text-center">
        <div class="flex-shrink-0 h-6 w-6 m-auto">
          <svg
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
            <path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25" />
          </svg>
        </div>
      </div>
    </td>
    <td class="px-3 py-4 whitespace-no-wrap">
      <div class="text-lg leading-5 text-center">
        {timeToString(inspection.start)}
      </div>
      <div class="text-lg leading-5 text-center md:hidden mt-4">
        {timeToString(inspection.stop)}
      </div>
    </td>
    <td class="px-3 py-4 whitespace-no-wrap hidden md:table-cell">
      <div class="text-lg leading-5 text-center">
        {timeToString(inspection.stop)}
      </div>
    </td>
    <td class="px-3 py-4 whitespace-no-wrap text-sm leading-5 text-center">
      <button
        class="p-1 border-2 border-transparent text-red-600 rounded-full hover:text-red-700 focus:outline-none"
        aria-label="Notifications"
        on:click={() => removeRain(inspection.index)}
        disabled={lock}>
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
{:else}
  <tr>
    <td class="px-3 py-4 whitespace-no-wrap">
      <div class="text-lg leading-5 text-gray-900 text-center">
        {inspection.index + 1}
      </div>
    </td>
    <td class="px-3 py-4 whitespace-no-wrap">
      <div class="flex items-center text-center">
        {#if inspection.type == Type.Normal}
          <button
            class="p-1 border-2 border-transparent rounded-full focus:outline-none items-center m-auto text-green-400"
            aria-label="Notifications"
            on:click={() => changeType(inspection)}
            disabled={lock}>
            <svg
              class="h-6 w-6"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </button>
        {:else if inspection.type == Type.Closed}
          <button
            class="p-1 border-2 border-transparent rounded-full focus:outline-none items-center m-auto text-red-400"
            aria-label="Notifications"
            on:click={() => changeType(inspection)}
            disabled={lock}>
            <svg
              class="h-6 w-6"
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
        {:else}
          <button
            class="p-1 border-2 border-transparent rounded-full focus:outline-none items-center m-auto text-teal-400"
            aria-label="Notifications"
            on:click={() => changeType(inspection)}
            disabled={lock}>
            <svg
              class="h-6 w-6"
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
        {/if}
      </div>
    </td>
    <td class="px-3 py-4 whitespace-no-wrap">
      <div class="text-lg leading-5 text-gray-900 text-center">
        {timeToString(inspection.start)}
      </div>
    </td>
    <td class="px-3 py-4 whitespace-no-wrap hidden md:table-cell">
      <div class="text-lg leading-5 text-gray-900 text-center">
        {timeToString(inspection.stop)}
      </div>
    </td>
    <td
      class="px-3 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 text-center">
      <button
        class="p-1 border-2 border-transparent text-indigo-600 rounded-full hover:indigo-gray-700 focus:outline-none"
        aria-label="Notifications"
        on:click={() => changeType(inspection)}
        disabled={lock}>
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
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
      </button>
      <button
        class="p-1 border-2 border-transparent text-red-600 rounded-full hover:text-red-700 focus:outline-none"
        aria-label="Notifications"
        on:click={() => remove(inspection.index)}
        disabled={lock}>
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
{/if}
