<script>
	import { fade } from "svelte/transition";
	import MenuButton from "../components/MenuButton.svelte";

	// Data
	let vistorias = [
	  { tipo: "n", hora: "08:00", margem: 2 },
	  { tipo: "f", hora: "08:15", margem: 3 },
	  { tipo: "n", hora: "08:20", margem: 1 },
	  { tipo: "r", hora: "08:35", margem: -2 }
	];

	// Config
	let showConfig = false;
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

	// Computed
	$: normais = vistorias.filter(obj => obj.tipo == "n").length;
	$: fechadas = vistorias.filter(obj => obj.tipo == "f").length;
	$: recuperadas = vistorias.filter(obj => obj.tipo == "r").length;
	$: duracaoManha = manha.ativado ? getDuration(manha.inicio, manha.fim) : 0;
	$: duracaoTarde = tarde.ativado ? getDuration(tarde.inicio, tarde.fim) : 0;
	$: duracaoTotal = duracaoManha + duracaoTarde;
	$: media = Math.trunc(
	  (duracaoTotal - (fechadas + recuperadas) * 2) / (normais + recuperadas)
	);

	// Helpers
	function timeObjAsStr(time) {
	  time.h = String(time.h).padStart(2, "0");
	  time.m = String(time.m).padStart(2, "0");
	  return `${time.h}:${time.m}`;
	}

	function timeStrAsObj(time) {
	  let [hours, minutes] = time.split(":");
	  return { h: Number(hours), m: Number(minutes) };
	}

	function getDuration(start, finish) {
	  start = timeStrAsObj(start);
	  finish = timeStrAsObj(finish);
	  // returns the duration in minutes between start and finish.
	  return (finish.h - (start.h + 1)) * 60 + (60 - start.m) + finish.m;
	}

	function timeDiff(time, duration) {
	  time = timeStrAsObj(time);
	  if (time.m + duration >= 60) {
	    let hours = Math.trunc((time.m + duration) / 60);
	    time.h += hours;
	    time.m = time.m + duration - hours * 60;
	  } else if (time.m + duration < 0) {
	    time.h -= 1;
	    time.m = 60 + duration;
	  } else {
	    time.m += duration;
	  }
	  return timeObjAsStr(time);
	}

	function add(tipo) {
	  let hora = "";
	  if (vistorias.length == 0) {
	    if (manha.ativado) {
	      hora = manha.inicio;
	    } else {
	      hora = tarde.inicio;
	    }
	  } else {
	    hora = timeDiff(vistorias[vistorias.length - 1].hora, 15);
	  }
		vistorias = vistorias.concat({ tipo: tipo, hora: hora, margem: (Math.trunc(Math.random() * 3) - 1) });
	}
</script>



<svelte:head>
	<title>Calculadora</title>
</svelte:head>

<div class="dock">
	<MenuButton type="badge" count={normais} action="{() => add("n")}" content="icon ion-md-checkmark success" />
	<MenuButton type="badge" count={fechadas} action="{() => add("f")}" content="icon ion-md-close warning" />
	<MenuButton type="badge" count={recuperadas} action="{() => add("r")}" content="icon ion-md-repeat attention" />
	<MenuButton type="" count="" action="{() => null}" content="icon ion-md-refresh" />
	<MenuButton type="" count="" action="{() => showConfig = !showConfig}" content="icon ion-md-cog" />
</div>

<div class={showConfig? "show" : "hide" }>
	<h1>Configurações</h1>

	<p><strong>Calculadora de Horas ACE <i>v3.4.0.</i></strong></p>

	{#if normais+recuperadas != 0}<p>Tempo médio por Vistoria realizada: {media}</p>{/if}

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

<div class={showConfig? "hide" : "show" }>
	<table>
		<tr>
			<th>Linha</th>
			<th>Tipo</th>
			<th>Hora</th>
			<th>Excluir</th>
		</tr>
		{#each vistorias as vistoria, id}
		<tr transition:fade>
			<td>{id+1}</td>
			<td>
				{#if vistoria.tipo == "n"}
				<button class="icon ion-md-checkmark-circle success" on:click=''></button>
				{:else if vistoria.tipo == "f"}
				<button class="icon ion-md-close-circle warning" on:click=''></button>
				{:else}
				<button class="icon ion-md-repeat attention" on:click=''></button>
				{/if}
			</td>
			<td>{vistoria.hora}</td>
			<td><button class="icon ion-md-trash" on:click=''></button></td>
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