<script>
	/**
	 * @typedef { import("../lib/Tipos").Intervalos } Intervalos
	 * @typedef { import("../lib/Tipos").Manhã } Manhã
	 * @typedef { import("../lib/Tipos").Períodos } Períodos
	 * @typedef { import("../lib/Tipos").Relatórios } Relatórios
	 * @typedef { import("../lib/Tipos").Tarde } Tarde
	 * @typedef { import("../lib/Tipos").TipoVistorias } TipoVistorias
	 * @typedef { import("../lib/Tipos").Vistoria } Vistoria
	 * @typedef { import("../lib/Tipos").Tipo } Tipo
	 */

	// Bibliotecas
	import {
		contaFechadas,
		contaNormais,
		contaRecuperadas,
	} from "../lib/Auxiliares";
	import { adicionaVistoria } from "../lib/Interface";
	import { processaPeríodos } from "../lib/Períodos";
	// import { fade } from "svelte/transition";

	// Componentes
	import Barra from "./../components/Barra.svelte";
	import Botão from "../components/Botão.svelte";
	import Conteúdo from "../components/Conteúdo.svelte";
	import Menu from "./../components/Menu.svelte";
	import Modal from "../components/Modal.svelte";

	// Dados e Ajustes
	import { Ajustes } from "../data/Ajustes.js";
	// import {} from "../data/Dados.js";
	import { Tarde, TEXTO, TIPO, ÍCONE } from "../data/Constantes.js";

	// DADOS GERAIS, APENAS A INTERFACE ALTERA ESSAS VARIÁVEIS
	/** @type {TipoVistorias} */
	let vistorias = [];

	/** @type {Intervalos} */
	let chuvas = [];

	/** @type {boolean} */
	export let menu = false;

	/** @type {boolean} */
	export let modal = false;

	/** @type {(tipo: Tipo) => void} */
	function novaVisita(tipo) {
		vistorias = adicionaVistoria(vistorias, tipo);
	}

	// Variáveis Computadas Reativamente
	/** @type {number} */
	$: total = vistorias.length;
	$: fechadas = contaFechadas(vistorias);
	$: normais = contaNormais(vistorias);
	$: recuperadas = contaRecuperadas(vistorias);
	/** @type {Períodos} */
	$: períodos = processaPeríodos(manhã, Tarde, chuvas); // FIXME
	/** @type {Relatórios} */
	$: relatório = []; // geraRelatório();
</script>

<style>
</style>

<Conteúdo {relatório} {total}>
	<Modal bind:modal bind:chuvas />
</Conteúdo>

<Barra>
	<Botão
		classe="is-inverted is-link"
		id={TEXTO.CHUVA}
		distintivo={chuvas.length}
		ícone={ÍCONE.CHUVA}
		onclick={() => (modal = true)} />
	<Botão
		classe="is-inverted is-success"
		id={TEXTO.NORMAL}
		distintivo={normais}
		ícone={ÍCONE.NORMAL}
		onclick={() => novaVisita(TIPO.NORMAL)} />
	<Botão
		classe="is-inverted is-danger"
		id={TEXTO.FECHADA}
		distintivo={fechadas}
		ícone={ÍCONE.FECHADA}
		onclick={() => novaVisita(TIPO.FECHADA)} />
	<Botão
		classe="is-inverted is-primary"
		id={TEXTO.RECUPERADA}
		distintivo={recuperadas}
		ícone={ÍCONE.RECUPERADA}
		onclick={() => novaVisita(TIPO.RECUPERADA)} />

	<Menu bind:menu />
</Barra>
