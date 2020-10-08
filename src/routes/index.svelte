<script>
	import Nav from "../components/Nav.svelte";
	import Header from "../components/Header.svelte";
	import Report from "../components/Report.svelte";
	import Panel from "../components/Panel.svelte";
	import Modal from "../components/Modal.svelte";

	let panelVisible = false;
	let modalVisible = false;
</script>

<style>
</style>

<div>
	<Nav bind:panelVisible />

	<Header />
	<Report bind:modalVisible />

	<Panel bind:panelVisible />
	<Modal bind:modalVisible />
</div>
