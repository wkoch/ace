<script>
	/**
	 * @typedef { import("../lib/Type").Interval } Interval
	 * @typedef { import("../lib/Type").Morning } Morning
	 * @typedef { import("../lib/Type").Periods } Periods
	 * @typedef { import("../lib/Type").Reports } Reports
	 * @typedef { import("../lib/Type").Afternoon } Afternoon
	 * @typedef { import("../lib/Type").Inspections } Inspections
	 * @typedef { import("../lib/Type").Type } Type
	 */

	// Libraries
	import { countByType } from "../lib/Helpers";
	import { addInspection } from "../lib/Interface";
	import { processPeriods } from "../lib/Period";
	// import { fade } from "svelte/transition";

	// Componentes
	import Nav from "../components/Nav.svelte";
	import Button from "../components/Button.svelte";
	import Content from "../components/Content.svelte";
	import Menu from "./../components/Menu.svelte";
	import Modal from "../components/Modal.svelte";

	// Dados e Ajustes
	import { Ajustes } from "../data/Config";
	import { TEXT, TYPE, ICON } from "../data/Data";

	// DADOS GERAIS, APENAS A INTERFACE ALTERA ESSAS VARIÁVEIS
	/** @type {Morning} */
	let morning = {
		active: true,
		start: 520,
		end: 680,
	};

	/** @type {Afternoon} */
	let afternoon = {
		active: true,
		start: 860,
		end: 1040,
	};

	/** @type {Inspections} */
	let inspections = [];

	/** @type {Interval} */
	let rains = [];

	/** @type {boolean} */
	let menu = false;

	/** @type {boolean} */
	let random = false;

	/** @type {boolean} */
	let lock = false;

	/** @type {boolean} */
	let modal = false;

	/** @type {(type: Type) => void} */
	function newInspection(type) {
		inspections = addInspection(inspections, type);
	}

	// Variáveis Computadas Reativamente
	/** @type {string} */
	$: disabled = lock ? "disabled" : "";
	/** @type {number} */
	$: total = inspections.length;
	/** @type {number} */
	$: closed = countByType(inspections, TYPE.FECHADA);
	/** @type {number} */
	$: normal = countByType(inspections, TYPE.NORMAL);
	/** @type {number} */
	$: recovered = countByType(inspections, TYPE.RECOVERED);
	/** @type {Periods} */
	// $: periods = processPeriods(morning, Afternoon, rains); // FIXME
	/** @type {Reports} */
	$: reports = [
		{
			id: 0,
			period: TEXT.MORNING,
			type: TYPE.NORMAL,
			start: 520,
			end: 540,
		},
		{
			id: 1,
			period: TEXT.MORNING,
			type: TYPE.NORMAL,
			start: 540,
			end: 560,
		},
		{
			id: 2,
			period: TEXT.MORNING,
			type: TYPE.CLOSED,
			start: 560,
			end: 565,
		},
		{
			id: 3,
			period: TEXT.MORNING,
			type: TYPE.CLOSED,
			start: 565,
			end: 570,
		},
		{
			id: 4,
			period: TEXT.MORNING,
			type: TYPE.NORMAL,
			start: 570,
			end: 590,
		},
		{
			id: 5,
			period: TEXT.MORNING,
			type: TYPE.CLOSED,
			start: 590,
			end: 595,
		},
		{
			id: 6,
			period: TEXT.MORNING,
			type: TYPE.NORMAL,
			start: 595,
			end: 615,
		},
		{
			id: 7,
			period: TEXT.MORNING,
			type: TYPE.CLOSED,
			start: 615,
			end: 620,
		},
		{
			id: 9,
			period: TEXT.MORNING,
			type: TYPE.NORMAL,
			start: 620,
			end: 640,
		},
		{
			id: 10,
			period: TEXT.MORNING,
			type: TYPE.NORMAL,
			start: 640,
			end: 660,
		},
		{
			id: 11,
			period: TEXT.MORNING,
			type: TYPE.NORMAL,
			start: 660,
			end: 680,
		},
		{
			id: 1,
			type: TYPE.LUNCH,
			start: 680,
			end: 860,
		},
		{
			id: 12,
			period: TEXT.AFTERNOON,
			type: TYPE.NORMAL,
			start: 860,
			end: 880,
		},
		{
			id: 13,
			period: TEXT.AFTERNOON,
			type: TYPE.NORMAL,
			start: 880,
			end: 900,
		},
		{
			id: 14,
			period: TEXT.AFTERNOON,
			type: TYPE.NORMAL,
			start: 900,
			end: 920,
		},
		{
			id: 2,
			period: TEXT.AFTERNOON,
			type: TYPE.RAIN,
			start: 920,
			end: 1040,
		},
	]; // makeReport();
	let toggle = false;
	$: active = toggle;
	function troca() {
		toggle = !toggle;
	}
	$: console.log(toggle);
</script>

<style>
</style>

<Content {reports} {total}>
	<Modal bind:modal bind:rains />
</Content>

<Nav>
	<Button
		classes="is-inverted is-link"
		id={TEXT.RAIN}
		badge={rains.length}
		icon={ICON.RAIN}
		action={() => (modal = true)}
		{disabled} />
	<Button
		classes="is-inverted is-success"
		id={TEXT.NORMAL}
		badge={normal}
		icon={ICON.NORMAL}
		action={() => newInspection(TYPE.NORMAL)}
		{disabled}>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="2.5em"
			height="2.5em"
			fill="currentColor"
			viewBox="0 0 512 512">
			<path
				d="M256,48C141.31,48,48,141.31,48,256s93.31,208,208,208,208-93.31,208-208S370.69,48,256,48ZM364.25,186.29l-134.4,160a16,16,0,0,1-12,5.71h-.27a16,16,0,0,1-11.89-5.3l-57.6-64a16,16,0,1,1,23.78-21.4l45.29,50.32L339.75,165.71a16,16,0,0,1,24.5,20.58Z" /></svg>
	</Button>
	<Button
		classes="is-inverted is-danger"
		id={TEXT.CLOSED}
		badge={closed}
		icon={ICON.CLOSED}
		action={() => newInspection(TYPE.CLOSED)}
		{disabled}>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="2.5em"
			height="2.5em"
			fill="currentColor"
			viewBox="0 0 512 512">
			<path
				d="M256,48C141.31,48,48,141.31,48,256s93.31,208,208,208,208-93.31,208-208S370.69,48,256,48Zm75.31,260.69a16,16,0,1,1-22.62,22.62L256,278.63l-52.69,52.68a16,16,0,0,1-22.62-22.62L233.37,256l-52.68-52.69a16,16,0,0,1,22.62-22.62L256,233.37l52.69-52.68a16,16,0,0,1,22.62,22.62L278.63,256Z" /></svg>
	</Button>
	<Button
		classes="is-inverted is-primary"
		id={TEXT.RECOVERED}
		badge={recovered}
		icon={ICON.RECOVERED}
		action={() => newInspection(TYPE.RECOVERED)}
		{disabled}>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="2.5em"
			height="2.5em"
			fill="currentColor"
			viewBox="0 0 512 512">
			<path
				d="M48,256c0,114.87,93.13,208,208,208s208-93.13,208-208S370.87,48,256,48,48,141.13,48,256Zm96,66.67c5.45-61.45,34.14-117.09,122.87-117.09V168.26a8.32,8.32,0,0,1,14-6L365.42,242a8.2,8.2,0,0,1,0,11.94L281,333.71a8.32,8.32,0,0,1-14-6V290.42c-57.07,0-84.51,13.47-108.58,38.68C152.93,334.75,143.35,330.42,144,322.67Z" /></svg>
	</Button>

	<Menu bind:menu bind:morning bind:afternoon bind:random bind:lock />
</Nav>
