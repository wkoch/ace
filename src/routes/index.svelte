<script>
	/**
	 * @typedef { import("../lib/Types").Inspections } Inspections
	 * @typedef { import("../lib/Types").Interval } Interval
	 * @typedef { import("../lib/Types").Intervals } Intervals
	 * @typedef { import("../lib/Types").Period } Period
	 * @typedef { import("../lib/Types").Periods } Periods
	 */

	import { orderByStartTime } from "../lib/Helpers";

	import Content from "../components/Content.svelte";
	import Header from "../components/Header.svelte";
	import Modal from "../components/Modal.svelte";
	import Nav from "../components/Nav.svelte";
	import Panel from "../components/Panel.svelte";
	import Report from "../components/Report.svelte";
	import { subtractIntervalsFromDay } from "../lib/Periods";
	import { joinIntervals } from "../lib/Intervals";
	import { TEXT } from "../data/Data";

	/** @type {Inspections} */
	let inspections = [];

	/** @type {Period} */
	let dayPeriod;

	/** @type {Interval} */
	let lunchInterval = { type: TEXT.LUNCH, start: 68031200000, end: 40800000 };

	/** @type {Intervals} */
	let rains = [];

	/** @type {boolean} */
	let panelVisible = false;

	/** @type {boolean} */
	let modalVisible = false;

	$: intervals = joinIntervals([lunchInterval], rains);
	$: periods = subtractIntervalsFromDay(dayPeriod, intervals);
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

	<Panel bind:panelVisible bind:dayPeriod bind:lunchInterval />

	<Modal bind:modalVisible bind:rains />
</div>
