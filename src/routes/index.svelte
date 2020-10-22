<script lang="ts">
  import { joinIntervals } from "../lib/Intervals";
  import { subtractIntervals } from "../lib/Periods";
  import { Type } from "../lib/Types";
  import Content from "../components/Content.svelte";
  import Header from "../components/Header.svelte";
  import Modal from "../components/Modal.svelte";
  import Nav from "../components/Nav.svelte";
  import Panel from "../components/Panel.svelte";
  import Report from "../components/Report.svelte";
  import type { Inspections, Interval, Intervals, Period } from "../lib/Types";

  let inspections: Inspections = [];
  let day: Period;
  let lunchInterval: Interval = {
    type: Type.Lunch,
    start: 0,
    stop: 0,
  };
  let random: boolean = true;
  let lock: boolean = false;

  let rains: Intervals = [];
  let panelVisible = false;
  let modalVisible = false;

  $: intervals = joinIntervals([lunchInterval], rains);
  $: periods = subtractIntervals(day, intervals);
</script>

<style>
</style>

<div>
  <Nav bind:modalVisible bind:panelVisible bind:inspections bind:lock />

  <Header />

  {#if inspections.length == 0}
    <Content />
  {:else}
    <Report bind:inspections {periods} {intervals} bind:rains />
  {/if}

  <Panel bind:panelVisible bind:day bind:lunchInterval bind:random bind:lock />

  <Modal bind:modalVisible bind:rains {random} />
</div>
