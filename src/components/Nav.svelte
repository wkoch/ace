<script lang="ts">
  import { TEXT } from "../data/Data";
  import { Type } from "../lib/Types";
  import Button from "./Button.svelte";
  import Checkmark from "./Icons/Checkmark.svelte";
  import Denied from "./Icons/Denied.svelte";
  import Rain from "./Icons/Rain.svelte";
  import Repeat from "./Icons/Repeat.svelte";
  import Settings from "./Icons/Settings.svelte";
  import type { Inspection, Inspections } from "../lib/Types";
  import { countByType } from "../lib/Helpers";

  export let inspections: Inspections;

  export let panelVisible: boolean;
  export let modalVisible: boolean;
  export let lock: boolean = false;

  function add(type: Type.Closed | Type.Normal | Type.Recovered): void {
    let next: Inspection = {
      index: inspections.length + 1,
      period: 0,
      type: type,
      start: 0,
      stop: 0,
    };
    inspections = [...inspections, next];
  }
  $: disabled = lock;
  $: countNormal = countByType(inspections, Type.Normal);
  $: countClosed = countByType(inspections, Type.Closed);
  $: countRecovered = countByType(inspections, Type.Recovered);
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
          action={() => (modalVisible = true)}
          {disabled}>
          <Rain />
        </Button>
        <Button
          id={TEXT.NORMAL}
          classes="p-3 border-2 border-transparent text-green-400 rounded-full hover:text-green-600 focus:outline-none"
          label="Nav"
          action={() => add(Type.Normal)}
          {disabled}
          badge={countNormal}>
          <Checkmark />
        </Button>
        <Button
          id={TEXT.CLOSED}
          classes="p-3 border-2 border-transparent text-red-400 rounded-full hover:text-red-600 focus:outline-none"
          aria-label="Nav"
          action={() => add(Type.Closed)}
          {disabled}
          badge={countClosed}>
          <Denied />
        </Button>
        <Button
          id={TEXT.RECOVERED}
          classes="p-3 border-2 border-transparent text-teal-400 rounded-full hover:text-teal-600 focus:outline-none"
          aria-label="Nav"
          action={() => add(Type.Recovered)}
          {disabled}
          badge={countRecovered}>
          <Repeat />
        </Button>
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
