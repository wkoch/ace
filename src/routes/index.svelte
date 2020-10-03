<script>
	/**
	 * @typedef { import("../lib/Tipos").Manhã } Manhã
	 * @typedef { import("../lib/Tipos").Tarde } Tarde
	 * @typedef { import("../lib/Tipos").Períodos } Períodos
	 * @typedef { import("../lib/Tipos").Vistorias } Vistorias
	 * @typedef { import("../lib/Tipos").Intervalos } Intervalos
	 */
	import { fade } from "svelte/transition";

	// Componentes
	import Barra from "./../components/Barra.svelte";
	import Botao from "./../components/Botao.svelte";
	import Conteudo from "./../components/Conteudo.svelte";
	import Menu from "./../components/Menu.svelte";
	import Modal from "../components/Modal.svelte";

	// Dados e Ajustes
	import { Ajustes } from "../data/Ajustes.js";
	import { TEXTO } from "../data/Constantes.js";

	// DADOS GERAIS
	/** @type {Vistorias} */
	let vistorias = [];

	/** @type {Períodos} */
	let periodos = [];

	/** @type {Intervalos} */
	let chuvas = [];

	/** @type {boolean} */
	export let estadoMenu = false;

	/** @type {boolean} */
	export let estadoModal = false;

	// Bibliotecas
	import {} from "../lib/Auxiliares.js";
	import MenuButton from "../components/MenuButton.svelte";

	// Variáveis Computadas Reativamente
	$: relatorio = [];
	$: total = relatorio.length;
</script>

<style>
</style>

<Conteudo {relatorio} {total}>
	<Modal bind:estadoModal bind:chuvas />
</Conteudo>

<Barra>
	<Botao
		classe="is-inverted is-link"
		id={TEXTO.CHUVA}
		distintivo={chuvas.length}
		icone="umbrella"
		onclick={() => (estadoModal = true)} />
	<Botao
		classe="is-inverted is-success"
		id={TEXTO.NORMAL}
		distintivo={relatorio.length}
		icone="check-circle"
		onclick={() => (relatorio = [...relatorio, { tipo: TEXTO.NORMAL, inicio: 600, fim: 700 }])} />
	<Botao
		classe="is-inverted is-danger"
		id={TEXTO.FECHADA}
		distintivo={0}
		icone="times-circle" />
	<Botao
		classe="is-inverted is-primary"
		id={TEXTO.RECUPERADA}
		distintivo={0}
		icone="recycle" />
	<Menu bind:estadoMenu />
</Barra>
