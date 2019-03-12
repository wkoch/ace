<svelte:head>
	<title>Calculadora</title>
</svelte:head>

<div class="dock">
	<MenuButton type="badge" count={normais} action="{() => vistorias = vistorias.concat({tipo: "n", hora: "00:00"})}" content="icon ion-md-checkmark success" />
	<MenuButton type="badge" count={fechadas} action="{() => fechadas += 1}" content="icon ion-md-close warning" />
	<MenuButton type="badge" count={recuperadas} action="{() => recuperadas += 1}" content="icon ion-md-repeat warning" />
	<MenuButton type="" count="" action="{() => null}" content="icon ion-md-refresh" />
	<MenuButton type="" count="" action="{() => showConfig = !showConfig}" content="icon ion-md-cog" />
</div>

<div class={showConfig? "show" : "hide"}>
	<h1>Configurações</h1>

	<p><strong>Calculadora de Horas ACE <i>v3.3.0.</i></strong></p>

	{#if normais != 0}<p>Tempo médio por Vistoria N: media</p>{/if}

	<div class="container">
		<div>
			<fieldset>
				<legend>Manhã</legend>
				<label>Ativado
					<input type="checkbox" bind:checked={manha.ativado}>
				</label>
				<br>
				<br>
				<div class="container">
					<label>Início:</label>
					<input type="time" bind:value={manha.inicio}>
				</div>
				<br>
				<div class="container">
					<label>Fim:</label>
					<input type="time" bind:value={manha.fim}>
				</div>
			</fieldset>
		</div>

		<div>
			<fieldset>
				<legend>Tarde</legend>
				<label>Ativado
					<input type="checkbox" bind:checked={tarde.ativado}>
				</label>
				<br>
				<br>
				<div class="container">
					<label>Início:</label>
					<input type="time" bind:value={tarde.inicio}>
				</div>
				<br>
				<div class="container">
					<label>Fim:</label>
					<input type="time" bind:value={tarde.fim}>
				</div>
			</fieldset>
		</div>
	</div>
	{#if !(manha.ativado || tarde.ativado)}
	<p class=warning-msg>Erro. Não há período ativo. Ative ao menos um dos períodos.</p>
	{/if}
</div>

<div class={showConfig? "hide" : "show"}>
	<table>
		<tr>
			<th>Linha</th>
			<th>Tipo</th>
			<th>Hora</th>
			<th>Excluir</th>
		</tr>
		{#each vistorias as vistoria}
		<tr transition:fade>
			<td>1</td>
			<td>
				{#if vistoria.tipo == "n"}
				<button class="icon ion-md-checkmark-circle success" on:click=''></button>
				{:else}
				<button class="icon ion-md-close-circle warning" on:click=''></button>
				{/if}
			</td>
			<td>{vistoria.hora}</td>
			<td><button class="icon ion-md-trash" on:click=''></button></td>
		</tr>
		{/each}
	</table>
</div>













<script>
	import { fade } from 'svelte/transition';
	import MenuButton from "../components/MenuButton.svelte";
	let showConfig = false;
	let normais = 0;
	let fechadas = 0;
	let recuperadas = 0;
	let vistorias = [
		{tipo: "n", hora: "08:00"},
		{tipo: "f", hora: "08:15"},
		{tipo: "n", hora: "08:20"},
		{tipo: "n", hora: "08:35"}
	];
	let manha = {
	  ativado: true,
	  inicio: "08:40",
	  fim: "11:20"
	};
	let tarde = {
	  ativado: true,
	  inicio: "14:30",
	  fim: "17:20"
	};

	function add(tipo, hora) {
		vistorias.push({tipo: tipo, hora: hora});
	}
</script>

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
</style>