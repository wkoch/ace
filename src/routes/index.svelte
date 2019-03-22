<script>
	import { fade } from "svelte/transition";
	import {
	  getDuration,
	  updateIDs,
	  proximoHorario,
	  timeDiff
	} from "../modules/helpers.js";
	import MenuButton from "../components/MenuButton.svelte";
	import { beforeUpdate, afterUpdate } from "svelte";

	// Data
	let vistorias = [];

	// Config
	let showConfig = false;
	let locked = false;
	let horaAtual = "00:00";
	let manha = {
	  ativado: true,
	  inicio: "08:40",
	  fim: "11:25"
	};
	let tarde = {
	  ativado: true,
	  inicio: "14:30",
	  fim: "17:25"
	};

	// Computed
	$: normais = vistorias.filter(obj => obj.tipo == "n").length;
	$: fechadas = vistorias.filter(obj => obj.tipo == "f").length;
	$: recuperadas = vistorias.filter(obj => obj.tipo == "r").length;
	$: duracaoManha = manha.ativado ? getDuration(manha.inicio, manha.fim) : 0;
	$: duracaoTarde = tarde.ativado ? getDuration(tarde.inicio, tarde.fim) : 0;
	$: duracaoTotal = duracaoManha + duracaoTarde;
	$: media = (duracaoTotal - fechadas * 2) / (normais + recuperadas);

	// Button Actions
	function add(tipo) {
	  if (!locked) {
	    let margem = tipo == "f" ? 2 : 3;
	    vistorias = vistorias.concat({
	      id: vistorias.length,
	      tipo: tipo,
	      hora: "00:00",
	      margem: Math.trunc(Math.random() * margem) - 1
	    });
	    console.log(margem);
	  }
	}

	function changeTo(id, tipo) {
	  if (!locked) {
	    vistorias[id].tipo = tipo;
	  }
	}

	function remove(id) {
	  if (!locked) {
	    // vistorias = [...vistorias.slice(0, id), ...vistorias.slice(id + 1)]; // Alternative to splice with assignment.
	    vistorias.splice(id, 1);
	    vistorias = updateIDs(vistorias);
	  }
	}

	function updateAll() {
	  if (!locked) {
	    let novoVistorias = [];
	    // let recuperados = [];

	    if (recuperadas > 0) {
	      let recuperados = vistorias.filter(obj => obj.tipo == "r");
	      let outras = vistorias.filter(obj => obj.tipo == "f" || obj.tipo == "n");
	      let vs = outras.concat(recuperados);

	      for (var vistoria of vs) {
	        novoVistorias = novoVistorias.concat({
	          id: vistoria.id,
	          tipo: vistoria.tipo,
	          hora: proximoHorario(novoVistorias, manha, tarde, media),
	          margem: vistoria.margem
	        });
	      }
	      vistorias = novoVistorias.sort((a, b) => a.id - b.id);
	    } else {
	      for (var vistoria of vistorias) {
	        novoVistorias = novoVistorias.concat({
	          id: vistoria.id,
	          tipo: vistoria.tipo,
	          hora: proximoHorario(novoVistorias, manha, tarde, media),
	          margem: vistoria.margem
	        });
	      }
	      vistorias = novoVistorias;
	    }
	  }
	}

	// Auto updates everything after every change
	beforeUpdate(() => {
	  updateAll();
	});
</script>



<svelte:head>
	<title>Calculadora</title>
</svelte:head>

<div class="dock">
	{#if showConfig == false}
		<MenuButton name="normal" type="badge" count={normais} action="{() => add("n")}" content="icon ion-md-checkmark success" />
		<MenuButton name="fechada" type="badge" count={fechadas} action="{() => add("f")}" content="icon ion-md-close warning" />
		<MenuButton name="recuperada" type="badge" count={recuperadas} action="{() => add("r")}" content="icon ion-md-repeat attention" />
	{/if}
	{#if showConfig == true && locked == true}
		<MenuButton name="destravar" type="" count="" action="{() => locked = false}" content="icon ion-md-lock warning" />
	{:else if  showConfig == true && locked == false}
		<MenuButton name="travar" type="" count="" action="{() => locked = true}" content="icon ion-md-unlock success" />
	{/if}
	<MenuButton name="config" type="" count="" action="{() => showConfig = !showConfig}" content="icon ion-md-cog" />
	<!-- <MenuButton type="" count="" action="{() => updateAll()}" content="icon ion-md-refresh" /> -->
</div>

<div class={showConfig? "show" : "hide" }>
	<h1>Configurações</h1>

	<p><strong>Calculadora de Horas ACE <i>v4.1.0.</i></strong></p>

	{#if normais+recuperadas != 0}<p>Tempo médio por Vistoria realizada: {Math.trunc(media)}</p>{/if}

	<div class="container">
		<div>
			<fieldset>
				<legend>Manhã</legend>
				<label>Ativado
					<input type="checkbox" bind:checked={manha.ativado} data-cy="manha-checkbox">
				</label>
				<br>
				<br>
				<div class="container">
					<label>Início:</label>
					<input type="time" bind:value={manha.inicio} data-cy="manha-inicio">
				</div>
				<br>
				<div class="container">
					<label>Fim:</label>
					<input type="time" bind:value={manha.fim} data-cy="manha-fim">
				</div>
			</fieldset>
		</div>

		<div>
			<fieldset>
				<legend>Tarde</legend>
				<label>Ativado
					<input type="checkbox" bind:checked={tarde.ativado} data-cy="tarde-checkbox">
				</label>
				<br>
				<br>
				<div class="container">
					<label>Início:</label>
					<input type="time" bind:value={tarde.inicio} data-cy="tarde-inicio">
				</div>
				<br>
				<div class="container">
					<label>Fim:</label>
					<input type="time" bind:value={tarde.fim} data-cy="tarde-fim">
				</div>
			</fieldset>
		</div>
	</div>
	{#if !(manha.ativado || tarde.ativado)}
	<p class=warning-msg data-cy="erro">Erro. Não há período ativo. Ative ao menos um dos períodos.</p>
	{/if}
</div>

<div class={showConfig? "hide" : "show" }>
	<table>
		<tr>
			<th>Linha</th>
			<th>Tipo</th>
			<th>Hora</th>
			<th>Excluir</th>
		</tr>
		{#each vistorias as vistoria, index}
		{#if [20, 40, 60, 80, 100, 120, 140, 160].includes(vistoria.id)}
		<tr>
			<th>Linha</th>
			<th>Tipo</th>
			<th>Hora</th>
			<th>Excluir</th>
		</tr>
		{/if}
		<tr data-cy="linha-{vistoria.id+1}" transition:fade>
			<td data-cy="linha-{vistoria.id+1}">{vistoria.id+1}</td>
			<td data-cy="tipo">
				{#if vistoria.tipo == "n"}
				<button class="icon ion-md-checkmark-circle success" data-cy="normal" on:click='{() => changeTo(index, "f")}'></button>
				{:else if vistoria.tipo == "f"}
				<button class="icon ion-md-close-circle warning" data-cy="fechada" on:click='{() => changeTo(index, "r")}'></button>
				{:else}
				<button class="icon ion-md-repeat attention" data-cy="recuperada" on:click='{() => changeTo(index, "n")}'></button>
				{/if}
			</td>
			<td data-cy="hora">{timeDiff(vistoria.hora, vistoria.margem)}</td>
			<td data-cy="excluir"><button class="icon ion-md-trash" data-cy="excluir" on:click='{() => remove(index)}'></button></td>
		</tr>
		{/each}
	</table>
</div>


<style>
	table {
	  width: 100%;
	  border-collapse: collapse;
	  margin-bottom: 80px;
	}

	th {
	  font-size: 1.3em;
	}

	tr {
	  border-bottom: 5px solid white;
	}

	td {
	  text-align: center;
	  vertical-align: middle;
	  background-color: #f6f6f6;
	  font-size: 1.4em;
	}

	.hide {
	  display: none;
	}

	.show {
	  display: block;
	}

	td > .icon {
	  font-size: 1.2em;
	}

	.center {
	  text-align: center;
	}

	.warning-msg {
	  padding: 20px;
	  background-color: #e85600;
	  color: white;
	  font-weight: 700;
	  border-radius: 5px;
	}

	.dock {
	  position: fixed;
	  z-index: 999;
	  bottom: 0px;
	  right: 0px;
	  left: 0px;
	  background-color: white;
	  text-align: center;
	  -webkit-box-shadow: 0px -5px 70px 0px rgba(74, 74, 74, 0.75);
	  -moz-box-shadow: 0px -5px 70px 0px rgba(74, 74, 74, 0.75);
	  box-shadow: 0px -5px 70px 0px rgba(74, 74, 74, 0.75);
	}

	legend {
	  font-size: 1.4em;
	}

	button {
	  background-color: transparent;
	  border: none;
	  margin: 0px 10px 0px 10px;
	  vertical-align: middle;
	  touch-action: manipulation;
	}

	.icon {
	  font-size: 62px;
	}

	button.badge {
	  position: relative;
	}

	button.badge:before {
	  content: attr(data-count);
	  width: 20px;
	  height: 20px;
	  line-height: 20px;
	  display: block;
	  border-radius: 50%;
	  background: rgb(67, 151, 232);
	  border: 1px solid #ddd;
	  color: #fff;
	  position: absolute;
	  bottom: 10px;
	  right: 4px;
	}
</style>