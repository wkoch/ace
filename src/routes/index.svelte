<script>
	import { fade } from "svelte/transition";

	// Dados e Ajustes
	import { Ajustes } from "../data/Ajustes.js";
	import {
		Geral,
		Manha,
		Tarde,
		NORMAL,
		FECHADA,
		RECUPERADA,
		modal,
	} from "../data/Dados.js";
	import {} from "../lib/Auxiliares.js";

	// Componentes
	import Barra from "./../components/Barra.svelte";
	import Botao from "./../components/Botao.svelte";
	import Conteudo from "./../components/Conteudo.svelte";
	import Modal from "../components/Modal.svelte";

	// Funções
	// import { beforeUpdate, afterUpdate } from "svelte";
	// import {
	// 	atualizaIDs,
	// 	proximoHorario,
	// 	contaNormais,
	// 	contaFechadas,
	// 	contaRecuperadas,
	// 	calculaPeriodos,
	// } from "../lib/Auxiliares.js";

	// Temporario
	function add(tipo) {
		Geral.vistorias = Geral.vistorias.concat({
			id: Geral.vistorias.length + 1,
			tipo: tipo,
			inicio: "10:00",
			fim: "10:15",
		});
	}

	// Computado
	// $: chuvas = Geral.chuvas.length;
	// Manhã
	// $: Manha.normais = contaNormais(Manha.vistorias);
	// $: Manha.fechadas = contaFechadas(Manha.vistorias);
	// $: Manha.recuperadas = contaRecuperadas(Manha.vistorias);
	// Tarde
	// $: Tarde.normais = contaNormais(Tarde.vistorias);
	// $: Tarde.fechadas = contaFechadas(Tarde.vistorias);
	// $: Tarde.recuperadas = contaRecuperadas(Tarde.vistorias);
	// Geral
	$: normais = 0;
	$: fechadas = 0;
	$: recuperadas = 0;
	$: total = 1;
	// $: Geral.periodos = calculaPeriodos(
	// 	Geral.periodos,
	// 	Manha,
	// 	Tarde,
	// 	Geral.chuvas
	// );
	// $: duracaoManha = Manha.ativo ? getDuration(Manha.inicio, Manha.fim) : 0;
	// $: duracaoTarde = tarde.ativo ? getDuration(tarde.inicio, tarde.fim) : 0;
	// $: duracaoTotal = duracaoManha + duracaoTarde;
	// $: media = (duracaoTotal+sobra - fechadas * 3) / (normais + recuperadas-1);
</script>

<style>
</style>

<Conteudo bind:vistorias={Geral.vistorias} {total}>
	<Modal bind:ativo={modal.ativo} bind:chuvas={Geral.chuvas} />
</Conteudo>

<Barra>
	<Botao
		classe="is-inverted is-link"
		id="chuva"
		icone="umbrella"
		onclick={() => (modal.ativo = true)} />
	<Botao
		classe="is-inverted is-success"
		id="normal"
		distintivo={normais}
		icone="check-circle"
		onclick={() => add(NORMAL)} />
	<Botao
		classe="is-inverted is-danger"
		id="fechada"
		distintivo={fechadas}
		icone="times-circle" />
	<Botao
		classe="is-inverted is-primary"
		id="recuperada"
		distintivo={recuperadas}
		icone="recycle" />
</Barra>
