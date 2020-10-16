<script lang="ts">
  import type { Interval, Intervals, Inspections, Period } from "../lib/Types";
  import { Type } from "../lib/Types";

  import { orderByStartTime } from "../lib/Helpers";

  import Content from "../components/Content.svelte";
  import Header from "../components/Header.svelte";
  import Modal from "../components/Modal.svelte";
  import Nav from "../components/Nav.svelte";
  import Panel from "../components/Panel.svelte";
  import Report from "../components/Report.svelte";
  import { subtractIntervals } from "../lib/Periods";
  import { joinIntervals } from "../lib/Intervals";
  import { TEXT } from "../data/Data";

  let inspections: Inspections = [];
  let day: Period;
  let lunchInterval: Interval = {
    type: Type.Lunch,
    start: 68031200000,
    stop: 40800000,
  };

  let rains: Intervals = [];

  /** @type {boolean} */
  let panelVisible = false;

  /** @type {boolean} */
  let modalVisible = false;

  $: intervals = joinIntervals([lunchInterval], rains);
  $: periods = subtractIntervals(day, intervals);
</script>

<style>
</style>

<div>
  <Nav bind:modalVisible bind:panelVisible bind:inspections />

  <Header />

  {#if inspections.length == 0}
    <Content />
  {:else}
    <Report {inspections} {periods} />
  {/if}

  <Panel bind:panelVisible bind:day bind:lunchInterval />

  <Modal bind:modalVisible bind:rains />
</div>
