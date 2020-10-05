<script>
  import TimeBlock from "./TimeBlock.svelte";
  import Switch from "./../components/Switch.svelte";
  import { TEXT } from "../data/Data";

  import { timeInMinutes } from "../lib/Time";

  export let morning;
  export let afternoon;

  export let morningStart = "08:40";
  export let morningEnd = "11:20";

  export let afternoonStart = "14:20";
  export let afternoonEnd = "17:20";

  /** @type {boolean} */
  export let menu = false;

  /** @type {boolean} */
  export let random;

  /** @type {boolean} */
  export let lock;

  /** @type {string} */
  $: show = menu ? "is-active" : "";
  /** @type {string} */
  $: disabled = lock ? "disabled" : "";
  $: morning.start = timeInMinutes(morningStart);
  $: morning.end = timeInMinutes(morningEnd);
  $: afternoon.start = timeInMinutes(afternoonStart);
  $: afternoon.end = timeInMinutes(afternoonEnd);
</script>

<div class="is-right dropdown is-up {show}">
  <div class="dropdown-trigger">
    <button
      class="is-large button is-white"
      id={TEXT.MENU}
      aria-controls="config"
      aria-haspopup="true"
      on:click={() => (menu = !menu)}>
      <span class="is-large icon">
        <i class="fas fa-ellipsis-v" aria-hidden="true" />
      </span>
    </button>
  </div>
  <div class="dropdown-menu" id="config" role="menu">
    <div class="dropdown-content">
      <div class="dropdown-item">
        <Switch
          text={TEXT.MORNING}
          {disabled}
          id={'morningActive'}
          bind:checked={morning.active} />

        <TimeBlock
          text={TEXT.ENTERED}
          id={'morningStart'}
          bind:time={morningStart}
          {disabled} />

        <TimeBlock
          text={TEXT.EXITED}
          id={'morningEnd'}
          bind:time={morningEnd}
          {disabled} />

        <Switch
          text={TEXT.AFTERNOON}
          {disabled}
          id={'afternoonActive'}
          bind:checked={afternoon.active} />

        <TimeBlock
          text={TEXT.ENTERED}
          id={'AfternoonStart'}
          bind:time={afternoonStart}
          {disabled} />

        <TimeBlock
          text={TEXT.EXITED}
          id={'afternoonEnd'}
          bind:time={afternoonEnd}
          {disabled} />

        <hr class="dropdown-divider" />

        <Switch
          text={TEXT.RANDOM}
          {disabled}
          id={TEXT.RANDOM}
          bind:checked={random} />

        <Switch
          text={TEXT.LOCK}
          {disabled}
          id={TEXT.LOCK}
          bind:checked={lock} />
      </div>
    </div>
  </div>
</div>
