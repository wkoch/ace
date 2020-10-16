<script lang="ts">
  import type {
    Inspection,
    Inspections,
    Intervals,
    Periods,
  } from "../lib/Types";
  import { TEXT } from "../data/Data";
  import TimeInput from "./TimeInput.svelte";
  import { fade } from "svelte/transition";
  import Rain from "./Icons/Rain.svelte";
  import Notification from "./Notification.svelte";
  import { stringToTime } from "../lib/Time";
  import { newInterval } from "../lib/Intervals";

  export let modalVisible = false;

  export let rains: Intervals = [];

  let startTime = "00:00";
  let endTime = "00:00";
  $: start = stringToTime(startTime);
  $: stop = stringToTime(endTime);

  let disabled = false;
  let errorEmpty = false;
  let errorEqual = false;
  let errorInverted = false;
  let triedSaving = false;

  $: errorEmpty = start == 0 || stop == 0;
  $: errorEqual = start != 0 && start == stop;
  $: errorInverted = stop < start;
  $: error = errorEmpty || errorEqual || errorInverted;
  $: disabled = error;
  $: errorColor = error ? "bg-gray-400" : "bg-red-600 hover:bg-red-500";

  let errorMsg = "";
  function errorMessage(
    errorEmpty: boolean,
    errorEqual: boolean,
    errorInverted: boolean
  ): string {
    if (errorEmpty) {
      return `${TEXT.MODAL.ERROR_EMPTY}`;
    } else if (errorEqual) {
      return `${TEXT.MODAL.ERROR_EQUAL}`;
    } else if (errorInverted) {
      return `${TEXT.MODAL.ERROR_INVERTED}`;
    } else {
      return "";
    }
  }

  $: errorMsg = errorMessage(errorEmpty, errorEqual, errorInverted);

  function cancel() {
    triedSaving = false;
    startTime = "00:00";
    endTime = "00:00";
    modalVisible = false;
  }

  function save() {
    triedSaving = true;

    if (!error) {
      rains = newInterval(rains, {
        type: TEXT.RAIN,
        start: start,
        stop: stop,
      });
      cancel();
    }
  }
</script>

{#if modalVisible}
  {#if error}
    <Notification message={errorMsg} />
  {/if}
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
            class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10 bg-white">
            <Rain />
          </div>
          <div class="mt-3 text-center sm:mt-0 md:mx-4 sm:text-left w-full">
            <h3
              class="text-lg leading-6 font-medium text-gray-900"
              id="modal-headline">
              {TEXT.MODAL.TITLE}
            </h3>
            <div class="mt-2">
              <p class="text-sm leading-5 text-gray-500 py-4">
                {TEXT.MODAL.TEXT}
              </p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
                <TimeInput
                  label="Início"
                  id="{TEXT.RAIN}Início"
                  bind:value={startTime}
                  {error} />

                <TimeInput
                  label="Fim"
                  id="{TEXT.RAIN}Fim"
                  bind:value={endTime}
                  {error} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-gray-200 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
          <button
            type="button"
            class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 {errorColor} text-base leading-6 font-medium text-white shadow-sm  focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out span-150 sm:text-sm sm:leading-5"
            on:click={save}
            {disabled}>
            {TEXT.SAVE}
          </button>
        </span>
        <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
          <button
            type="button"
            class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out span-150 sm:text-sm sm:leading-5"
            on:click={cancel}>
            {TEXT.CANCEL}
          </button>
        </span>
      </div>
    </div>
  </div>
{/if}
