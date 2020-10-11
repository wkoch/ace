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

	/** @type {Inspections} */
	let inspections = [];

	/** @type {Period} */
	let dayPeriod;

	/** @type {Interval} */
	let lunchInterval;

	/** @type {Intervals} */
	let rains = [];

	/** @type {boolean} */
	let panelVisible = false;

	/** @type {boolean} */
	let modalVisible = false;

	$: intervals = orderByStartTime([lunchInterval, ...rains]);
	$: console.table(intervals);
	$: periods = []; // FIXME
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
