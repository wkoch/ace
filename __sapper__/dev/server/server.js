'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var sirv = _interopDefault(require('sirv'));
var polka = _interopDefault(require('polka'));
var compression = _interopDefault(require('compression'));
var Stream = require('stream');
var Stream__default = _interopDefault(Stream);
var http = require('http');
var http__default = _interopDefault(http);
var url = require('url');
var https = _interopDefault(require('https'));
var zlib = _interopDefault(require('zlib'));
var fs = require('fs');
var path = require('path');
require('svelte-transitions');

const escaped = {
	'"': '&quot;',
	"'": '&#39;',
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;'
};

function escape(html) {
	return String(html).replace(/["'&<>]/g, match => escaped[match]);
}

function each(items, assign, fn) {
	let str = '';
	for (let i = 0; i < items.length; i += 1) {
		str += fn(assign(items[i], i));
	}
	return str;
}

const missingComponent = {
	_render: () => ''
};

function validateSsrComponent(component, name) {
	if (!component || !component._render) {
		if (name === 'svelte:component') name += ' this={...}';
		throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
	}

	return component;
}

function media(vistorias, manha, tarde) {
  let normais = vistorias.filter(obj => obj.normal).length;
  let fechadas = vistorias.filter(obj => !obj.normal).length;
  return Math.trunc(
    (totalDuration(manha, tarde) - fechadas * 2) / (normais - 1)
  );
}

function timeObjAsStr(time) {
  time.h = String(time.h).padStart(2, "0");
  time.m = String(time.m).padStart(2, "0");
  return `${time.h}:${time.m}`;
}

function timeStrAsObj(time) {
  let [hours, minutes] = time.split(":");
  return { h: Number(hours), m: Number(minutes) };
}

function timeDiff(time, duration) {
  time = timeStrAsObj(time);
  if (time.m + duration >= 60) {
    let hours = Math.trunc((time.m + duration) / 60);
    time.h += hours;
		time.m = time.m + duration - hours * 60;
		// console.log(`Avançou: ${time.h}:${time.m}`);
	} else if (time.m + duration < 0) {
		time.h -= 1;
		time.m = 60 + duration;
		// console.log(`Retornou: ${time.h}:${time.m}`);
  } else {
		time.m += duration;
		// console.log(`Normal: ${time.h}:${time.m}`);
  }
  return timeObjAsStr(time);
}

function getDuration(start, finish) {
  start = timeStrAsObj(start);
  finish = timeStrAsObj(finish);
  // returns the duration in minutes between start and finish.
  return (finish.h - (start.h + 1)) * 60 + (60 - start.m) + finish.m;
}

function totalDuration(manha, tarde) {
  let durationManha = getDuration(manha.inicio, manha.fim);
  let durationTarde = getDuration(tarde.inicio, tarde.fim);
  let minutos = 0;
  if (manha.ativado && tarde.ativado) {
    minutos = durationManha + durationTarde;
  } else if (manha.ativado && !tarde.ativado) {
    minutos = durationManha;
  } else if (!manha.ativado && tarde.ativado) {
    minutos = durationTarde;
  }
  return minutos;
}

// Aleatoriedade dos horários (entre n-1 e n+1).
function randomize(time) {
  let diff = Math.trunc(Math.random() * 3) - 1;
  return timeDiff(time, diff);
}

function horaInicio(manha, tarde) {
  if (manha.ativado) {
    return manha.inicio;
  } else if (tarde.ativado) {
    return tarde.inicio;
  } else {
    return "00:00";
  }
}

function horaSaida(manha, tarde, hora) {
  hora = timeStrAsObj(hora);
  if (manha.ativado && tarde.ativado) {
    let manhaFim = timeStrAsObj(manha.fim);
    let tardeInicio = timeStrAsObj(tarde.inicio);
    if (hora.h >= manhaFim.h && hora.m > manhaFim.m && hora.h < tardeInicio.h) {
      return tarde.inicio;
    } else {
      return timeObjAsStr(hora);
    }
  } else {
    return timeObjAsStr(hora);
  }
}

function update(vistorias, manha, tarde) {
  let mediaNormal = media(vistorias, manha, tarde);
  if (vistorias.length > 0) {
    let atual = randomize(horaInicio(manha, tarde));
    vistorias = vistorias.map(vistoria => {
      vistoria.hora = atual;
      if (vistoria.normal) {
        atual = randomize(
          horaSaida(manha, tarde, timeDiff(atual, mediaNormal))
        );
      } else {
        atual = randomize(horaSaida(manha, tarde, timeDiff(atual, 2)));
      }
      return vistoria;
    });
  }
  return vistorias;
}

function showConfig({ config }) {
	return config ? "show" : "hide";
}

function showContent({ config }) {
	return !config ? "show" : "hide";
}

function normais({ vistorias }) {
	return vistorias.filter(obj => obj.normal).length;
}

function fechadas({ vistorias }) {
	return vistorias.filter(obj => obj.normal == false).length;
}

function media_1({ vistorias, manha, tarde }) {
	return media(vistorias, manha, tarde);
}

function update_1({ vistorias, manha, tarde }) {
	return update(vistorias, manha, tarde);
}

function data() {
  return {
    config: false,
    vistorias: [],
    manha: {
      ativado: true,
      inicio: "08:40",
      fim: "11:20"
    },
    tarde: {
      ativado: true,
      inicio: "14:30",
      fim: "17:20"
    }
  };
}
var Index = {};

Index.filename = "/mnt/c/Users/willi/OneDrive/Documentos/GitHub/ace/src/routes/index.html";

Index.data = function() {
	return data();
};

Index.render = function(state, options = {}) {
	var components = new Set();

	function addComponent(component) {
		components.add(component);
	}

	var result = { head: '', addComponent };
	var html = Index._render(result, state, options);

	var cssCode = Array.from(components).map(c => c.css && c.css.code).filter(Boolean).join('\n');

	return {
		html,
		head: result.head,
		css: { code: cssCode, map: null },
		toString() {
			return html;
		}
	};
};

Index._render = function(__result, ctx, options) {
	__result.addComponent(Index);

	ctx = Object.assign(data(), ctx);

	ctx.showConfig = showConfig(ctx);
	ctx.showContent = showContent(ctx);
	ctx.normais = normais(ctx);
	ctx.fechadas = fechadas(ctx);
	ctx.media = media_1(ctx);
	ctx.update = update_1(ctx);

	return `${(__result.head += `<title>Calculadora</title>`, "")}

<div class="dock svelte-fk0o7">
	<button class="badge svelte-fk0o7"${(v => v == null ? "" : ` data-count="${escape(ctx.normais)}"`)(ctx.normais)}><span class="icon ion-md-checkmark-circle success svelte-fk0o7"></span></button>
	<button class="badge svelte-fk0o7"${(v => v == null ? "" : ` data-count="${escape(ctx.fechadas)}"`)(ctx.fechadas)}><span class="icon ion-md-close-circle warning svelte-fk0o7"></span></button>
	<button class="svelte-fk0o7"><span class="icon ion-md-cog svelte-fk0o7"></span></button>
</div>

<div class="${escape(ctx.showConfig)} svelte-fk0o7">
	<h1>Configurações</h1>

	<p><strong>Calculadora de Horas ACE <i>v3.3.0.</i></strong></p>

	${ ctx.normais != 0 ? `<p>Tempo médio por Vistoria N: ${escape(ctx.media)}</p>` : `` }

	<div class="container">
		<div>
			<fieldset>
				<legend class="svelte-fk0o7">Manhã</legend>
				<label>Ativado
					<input type="checkbox" ${(v => v ? ("checked" + (v === true ? "" : "=" + JSON.stringify(v))) : "")(ctx.manha.ativado)}>
				</label>
				<br>
				<br>
				<div class="container">
					<label>Início:</label>
					<input type="time" ${(v => v ? ("value" + (v === true ? "" : "=" + JSON.stringify(v))) : "")(ctx.manha.inicio)}>
				</div>
				<br>
				<div class="container">
					<label>Fim:</label>
					<input type="time" ${(v => v ? ("value" + (v === true ? "" : "=" + JSON.stringify(v))) : "")(ctx.manha.fim)}>
				</div>
			</fieldset>
		</div>

		<div>
			<fieldset>
				<legend class="svelte-fk0o7">Tarde</legend>
				<label>Ativado
					<input type="checkbox" ${(v => v ? ("checked" + (v === true ? "" : "=" + JSON.stringify(v))) : "")(ctx.tarde.ativado)}>
				</label>
				<br>
				<br>
				<div class="container">
					<label>Início:</label>
					<input type="time" ${(v => v ? ("value" + (v === true ? "" : "=" + JSON.stringify(v))) : "")(ctx.tarde.inicio)}>
				</div>
				<br>
				<div class="container">
					<label>Fim:</label>
					<input type="time" ${(v => v ? ("value" + (v === true ? "" : "=" + JSON.stringify(v))) : "")(ctx.tarde.fim)}>
				</div>
			</fieldset>
		</div>
	</div>
	${ !(ctx.manha.ativado || ctx.tarde.ativado) ? `<p class="warning-msg svelte-fk0o7">Erro. Não há período ativo. Ative ao menos um dos períodos.</p>` : `` }
</div>


<div class="${escape(ctx.showContent)} svelte-fk0o7">
	<table class="svelte-fk0o7">
		<tr class="svelte-fk0o7">
			<th class="svelte-fk0o7">Linha</th>
			<th class="svelte-fk0o7">Tipo</th>
			<th class="svelte-fk0o7">Hora</th>
			<th class="svelte-fk0o7">Excluir</th>
		</tr>
		${ each(ctx.vistorias, item => Object.assign({}, ctx, { vistoria: item }), ctx => `<tr class="svelte-fk0o7">
			<td class="svelte-fk0o7">${escape(ctx.vistorias.findIndex(obj => obj.id == ctx.vistoria.id)+1)}</td>
			<td class="svelte-fk0o7">
				${ ctx.vistoria.normal ? `<button class="icon ion-md-checkmark-circle success svelte-fk0o7"></button>` : `<button class="icon ion-md-close-circle warning svelte-fk0o7"></button>` }
			</td>
			<td class="svelte-fk0o7">${escape(ctx.vistoria.hora)}</td>
			<td class="svelte-fk0o7"><button class="icon ion-md-trash svelte-fk0o7"></button></td>
		</tr>`)}
	</table>
</div>`;
};

Index.css = {
	code: "button.svelte-fk0o7{background-color:transparent;border:none}table.svelte-fk0o7{width:100%;border-collapse:collapse;margin-bottom:80px}th.svelte-fk0o7{font-size:1.3em}tr.svelte-fk0o7{border-bottom:5px solid white}td.svelte-fk0o7{text-align:center;vertical-align:middle;background-color:#f6f6f6;font-size:1.4em}.hide.svelte-fk0o7{display:none}.show.svelte-fk0o7{display:block}div>.icon.svelte-fk0o7,button.svelte-fk0o7>.icon.svelte-fk0o7{font-size:62px}td.svelte-fk0o7>.icon.svelte-fk0o7{font-size:1.2em}.center.svelte-fk0o7{text-align:center}button.svelte-fk0o7{margin:0px 10px 0px 10px;vertical-align:middle;touch-action:manipulation}.success.svelte-fk0o7{color:#32b643}.warning.svelte-fk0o7{color:#e85600}.warning-msg.svelte-fk0o7{padding:20px;background-color:#e85600;color:white;font-weight:700;border-radius:5px}.dock.svelte-fk0o7{position:fixed;bottom:0px;right:0px;left:0px;background-color:white;text-align:center;-webkit-box-shadow:0px -5px 70px 0px rgba(74, 74, 74, 0.75);-moz-box-shadow:0px -5px 70px 0px rgba(74, 74, 74, 0.75);box-shadow:0px -5px 70px 0px rgba(74, 74, 74, 0.75)}legend.svelte-fk0o7{font-size:1.4em}button.badge.svelte-fk0o7{position:relative}button.badge.svelte-fk0o7:before{content:attr(data-count);width:20px;height:20px;line-height:20px;text-align:center;display:block;border-radius:50%;background:rgb(67, 151, 232);border:1px solid #ddd;color:#fff;position:absolute;bottom:10px;right:4px}",
	map: "{\"version\":3,\"file\":\"index.html\",\"sources\":[\"index.html\"],\"sourcesContent\":[\"<svelte:head>\\r\\n\\t<title>Calculadora</title>\\r\\n</svelte:head>\\r\\n\\r\\n<div class=\\\"dock\\\">\\r\\n\\t<button class=\\\"badge\\\" on:click=\\\"add(true)\\\" data-count={normais}><span class=\\\"icon ion-md-checkmark-circle success\\\"></span></button>\\r\\n\\t<button class=\\\"badge\\\" on:click=\\\"add(false)\\\" data-count={fechadas}><span class=\\\"icon ion-md-close-circle warning\\\"></span></button>\\r\\n\\t<button on:click=\\\"config()\\\"><span class=\\\"icon ion-md-cog\\\"></span></button>\\r\\n</div>\\r\\n\\r\\n<div class={showConfig}>\\r\\n\\t<h1>Configurações</h1>\\r\\n\\r\\n\\t<p><strong>Calculadora de Horas ACE <i>v3.3.0.</i></strong></p>\\r\\n\\r\\n\\t{#if normais != 0}<p>Tempo médio por Vistoria N: {media}</p>{/if}\\r\\n\\r\\n\\t<div class=\\\"container\\\">\\r\\n\\t\\t<div>\\r\\n\\t\\t\\t<fieldset>\\r\\n\\t\\t\\t\\t<legend>Manhã</legend>\\r\\n\\t\\t\\t\\t<label>Ativado\\r\\n\\t\\t\\t\\t\\t<input type=\\\"checkbox\\\" bind:checked=manha.ativado>\\r\\n\\t\\t\\t\\t</label>\\r\\n\\t\\t\\t\\t<br>\\r\\n\\t\\t\\t\\t<br>\\r\\n\\t\\t\\t\\t<div class=\\\"container\\\">\\r\\n\\t\\t\\t\\t\\t<label>Início:</label>\\r\\n\\t\\t\\t\\t\\t<input type=\\\"time\\\" bind:value=manha.inicio>\\r\\n\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t\\t<br>\\r\\n\\t\\t\\t\\t<div class=\\\"container\\\">\\r\\n\\t\\t\\t\\t\\t<label>Fim:</label>\\r\\n\\t\\t\\t\\t\\t<input type=\\\"time\\\" bind:value=manha.fim>\\r\\n\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t</fieldset>\\r\\n\\t\\t</div>\\r\\n\\r\\n\\t\\t<div>\\r\\n\\t\\t\\t<fieldset>\\r\\n\\t\\t\\t\\t<legend>Tarde</legend>\\r\\n\\t\\t\\t\\t<label>Ativado\\r\\n\\t\\t\\t\\t\\t<input type=\\\"checkbox\\\" bind:checked=tarde.ativado>\\r\\n\\t\\t\\t\\t</label>\\r\\n\\t\\t\\t\\t<br>\\r\\n\\t\\t\\t\\t<br>\\r\\n\\t\\t\\t\\t<div class=\\\"container\\\">\\r\\n\\t\\t\\t\\t\\t<label>Início:</label>\\r\\n\\t\\t\\t\\t\\t<input type=\\\"time\\\" bind:value=tarde.inicio>\\r\\n\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t\\t<br>\\r\\n\\t\\t\\t\\t<div class=\\\"container\\\">\\r\\n\\t\\t\\t\\t\\t<label>Fim:</label>\\r\\n\\t\\t\\t\\t\\t<input type=\\\"time\\\" bind:value=tarde.fim>\\r\\n\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t</fieldset>\\r\\n\\t\\t</div>\\r\\n\\t</div>\\r\\n\\t{#if !(manha.ativado || tarde.ativado)}\\r\\n\\t<p class=warning-msg>Erro. Não há período ativo. Ative ao menos um dos períodos.</p>\\r\\n\\t{/if}\\r\\n</div>\\r\\n\\r\\n\\r\\n<div class={showContent}>\\r\\n\\t<table>\\r\\n\\t\\t<tr>\\r\\n\\t\\t\\t<th>Linha</th>\\r\\n\\t\\t\\t<th>Tipo</th>\\r\\n\\t\\t\\t<th>Hora</th>\\r\\n\\t\\t\\t<th>Excluir</th>\\r\\n\\t\\t</tr>\\r\\n\\t\\t{#each vistorias as vistoria}\\r\\n\\t\\t<tr transition:fade>\\r\\n\\t\\t\\t<td>{vistorias.findIndex(obj => obj.id == vistoria.id)+1}</td>\\r\\n\\t\\t\\t<td>\\r\\n\\t\\t\\t\\t{#if vistoria.normal}\\r\\n\\t\\t\\t\\t<button class=\\\"icon ion-md-checkmark-circle success\\\" on:click='change(vistoria.id)'></button>\\r\\n\\t\\t\\t\\t{:else}\\r\\n\\t\\t\\t\\t<button class=\\\"icon ion-md-close-circle warning\\\" on:click='change(vistoria.id)'></button>\\r\\n\\t\\t\\t\\t{/if}\\r\\n\\t\\t\\t</td>\\r\\n\\t\\t\\t<td>{vistoria.hora}</td>\\r\\n\\t\\t\\t<td><button class=\\\"icon ion-md-trash\\\" on:click='remove(vistoria.id)'></button></td>\\r\\n\\t\\t</tr>\\r\\n\\t\\t{/each}\\r\\n\\t</table>\\r\\n</div>\\r\\n\\r\\n\\r\\n<script>\\r\\n\\timport { fade } from 'svelte-transitions';\\r\\n\\r\\n\\tfunction media(vistorias, manha, tarde) {\\r\\n\\t  let normais = vistorias.filter(obj => obj.normal).length;\\r\\n\\t  let fechadas = vistorias.filter(obj => !obj.normal).length;\\r\\n\\t  return Math.trunc(\\r\\n\\t    (totalDuration(manha, tarde) - fechadas * 2) / (normais - 1)\\r\\n\\t  );\\r\\n\\t}\\r\\n\\r\\n\\tfunction timeObjAsStr(time) {\\r\\n\\t  time.h = String(time.h).padStart(2, \\\"0\\\");\\r\\n\\t  time.m = String(time.m).padStart(2, \\\"0\\\");\\r\\n\\t  return `${time.h}:${time.m}`;\\r\\n\\t}\\r\\n\\r\\n\\tfunction timeStrAsObj(time) {\\r\\n\\t  let [hours, minutes] = time.split(\\\":\\\");\\r\\n\\t  return { h: Number(hours), m: Number(minutes) };\\r\\n\\t}\\r\\n\\r\\n\\tfunction timeDiff(time, duration) {\\r\\n\\t  time = timeStrAsObj(time);\\r\\n\\t  if (time.m + duration >= 60) {\\r\\n\\t    let hours = Math.trunc((time.m + duration) / 60);\\r\\n\\t    time.h += hours;\\r\\n\\t\\t\\ttime.m = time.m + duration - hours * 60;\\r\\n\\t\\t\\t// console.log(`Avançou: ${time.h}:${time.m}`);\\r\\n\\t\\t} else if (time.m + duration < 0) {\\r\\n\\t\\t\\ttime.h -= 1;\\r\\n\\t\\t\\ttime.m = 60 + duration;\\r\\n\\t\\t\\t// console.log(`Retornou: ${time.h}:${time.m}`);\\r\\n\\t  } else {\\r\\n\\t\\t\\ttime.m += duration;\\r\\n\\t\\t\\t// console.log(`Normal: ${time.h}:${time.m}`);\\r\\n\\t  }\\r\\n\\t  return timeObjAsStr(time);\\r\\n\\t}\\r\\n\\r\\n\\tfunction getDuration(start, finish) {\\r\\n\\t  start = timeStrAsObj(start);\\r\\n\\t  finish = timeStrAsObj(finish);\\r\\n\\t  // returns the duration in minutes between start and finish.\\r\\n\\t  return (finish.h - (start.h + 1)) * 60 + (60 - start.m) + finish.m;\\r\\n\\t}\\r\\n\\r\\n\\tfunction totalDuration(manha, tarde) {\\r\\n\\t  let durationManha = getDuration(manha.inicio, manha.fim);\\r\\n\\t  let durationTarde = getDuration(tarde.inicio, tarde.fim);\\r\\n\\t  let minutos = 0;\\r\\n\\t  if (manha.ativado && tarde.ativado) {\\r\\n\\t    minutos = durationManha + durationTarde;\\r\\n\\t  } else if (manha.ativado && !tarde.ativado) {\\r\\n\\t    minutos = durationManha;\\r\\n\\t  } else if (!manha.ativado && tarde.ativado) {\\r\\n\\t    minutos = durationTarde;\\r\\n\\t  }\\r\\n\\t  return minutos;\\r\\n\\t}\\r\\n\\r\\n\\t// Aleatoriedade dos horários (entre n-1 e n+1).\\r\\n\\tfunction randomize(time) {\\r\\n\\t  let diff = Math.trunc(Math.random() * 3) - 1;\\r\\n\\t  return timeDiff(time, diff);\\r\\n\\t}\\r\\n\\r\\n\\tfunction horaInicio(manha, tarde) {\\r\\n\\t  if (manha.ativado) {\\r\\n\\t    return manha.inicio;\\r\\n\\t  } else if (tarde.ativado) {\\r\\n\\t    return tarde.inicio;\\r\\n\\t  } else {\\r\\n\\t    return \\\"00:00\\\";\\r\\n\\t  }\\r\\n\\t}\\r\\n\\r\\n\\tfunction horaSaida(manha, tarde, hora) {\\r\\n\\t  hora = timeStrAsObj(hora);\\r\\n\\t  if (manha.ativado && tarde.ativado) {\\r\\n\\t    let manhaFim = timeStrAsObj(manha.fim);\\r\\n\\t    let tardeInicio = timeStrAsObj(tarde.inicio);\\r\\n\\t    if (hora.h >= manhaFim.h && hora.m > manhaFim.m && hora.h < tardeInicio.h) {\\r\\n\\t      return tarde.inicio;\\r\\n\\t    } else {\\r\\n\\t      return timeObjAsStr(hora);\\r\\n\\t    }\\r\\n\\t  } else {\\r\\n\\t    return timeObjAsStr(hora);\\r\\n\\t  }\\r\\n\\t}\\r\\n\\r\\n\\tfunction update(vistorias, manha, tarde) {\\r\\n\\t  let mediaNormal = media(vistorias, manha, tarde);\\r\\n\\t  if (vistorias.length > 0) {\\r\\n\\t    let atual = randomize(horaInicio(manha, tarde));\\r\\n\\t    vistorias = vistorias.map(vistoria => {\\r\\n\\t      vistoria.hora = atual;\\r\\n\\t      if (vistoria.normal) {\\r\\n\\t        atual = randomize(\\r\\n\\t          horaSaida(manha, tarde, timeDiff(atual, mediaNormal))\\r\\n\\t        );\\r\\n\\t      } else {\\r\\n\\t        atual = randomize(horaSaida(manha, tarde, timeDiff(atual, 2)));\\r\\n\\t      }\\r\\n\\t      return vistoria;\\r\\n\\t    });\\r\\n\\t  }\\r\\n\\t  return vistorias;\\r\\n\\t}\\r\\n\\r\\n\\texport default {\\r\\n\\t\\ttransitions: { fade },\\r\\n\\t  data() {\\r\\n\\t    return {\\r\\n\\t      config: false,\\r\\n\\t      vistorias: [],\\r\\n\\t      manha: {\\r\\n\\t        ativado: true,\\r\\n\\t        inicio: \\\"08:40\\\",\\r\\n\\t        fim: \\\"11:20\\\"\\r\\n\\t      },\\r\\n\\t      tarde: {\\r\\n\\t        ativado: true,\\r\\n\\t        inicio: \\\"14:30\\\",\\r\\n\\t        fim: \\\"17:20\\\"\\r\\n\\t      }\\r\\n\\t    };\\r\\n\\t  },\\r\\n\\t  helpers: {},\\r\\n\\t  computed: {\\r\\n\\t    showConfig: ({ config }) => (config ? \\\"show\\\" : \\\"hide\\\"),\\r\\n\\t    showContent: ({ config }) => (!config ? \\\"show\\\" : \\\"hide\\\"),\\r\\n\\t    normais: ({ vistorias }) => vistorias.filter(obj => obj.normal).length,\\r\\n\\t    fechadas: ({ vistorias }) =>\\r\\n\\t      vistorias.filter(obj => obj.normal == false).length,\\r\\n\\t    media: ({ vistorias, manha, tarde }) => media(vistorias, manha, tarde),\\r\\n\\t    update: ({ vistorias, manha, tarde }) => update(vistorias, manha, tarde)\\r\\n\\t  },\\r\\n\\t  methods: {\\r\\n\\t    config() {\\r\\n\\t      const { config, vistorias, manha, tarde } = this.get();\\r\\n\\r\\n\\t      if (config) {\\r\\n\\t        this.set({ config: false });\\r\\n\\t      } else {\\r\\n\\t        this.set({ config: true });\\r\\n\\t      }\\r\\n\\t      this.set({ vistorias: vistorias });\\r\\n\\t    },\\r\\n\\r\\n\\t    add(type) {\\r\\n\\t      const { config, vistorias, manha, tarde } = this.get();\\r\\n\\r\\n\\t      let horaEntrada = horaInicio(manha, tarde);\\r\\n\\t      if (vistorias.length > 0) {\\r\\n\\t        let vistoriaAnterior = vistorias[vistorias.length - 1];\\r\\n\\t        if (vistoriaAnterior.normal) {\\r\\n\\t          horaEntrada = timeDiff(vistoriaAnterior.hora, 15);\\r\\n\\t        } else {\\r\\n\\t          horaEntrada = timeDiff(vistoriaAnterior.hora, 2);\\r\\n\\t        }\\r\\n\\t      }\\r\\n\\r\\n\\t      // Registra a vistoria\\r\\n\\t      this.set({\\r\\n\\t        vistorias: vistorias.concat({\\r\\n\\t          id: vistorias.length,\\r\\n\\t          normal: type,\\r\\n\\t          hora: horaEntrada\\r\\n\\t        })\\r\\n\\t      });\\r\\n\\t    },\\r\\n\\r\\n\\t    change(id) {\\r\\n\\t      const { config, vistorias, ..._ } = this.get();\\r\\n\\t      this.set({\\r\\n\\t        vistorias: vistorias.map(vistoria => {\\r\\n\\t          if (vistoria.id == id) {\\r\\n\\t            vistoria.normal = !vistoria.normal;\\r\\n\\t          }\\r\\n\\t          return vistoria;\\r\\n\\t        })\\r\\n\\t      });\\r\\n\\t    },\\r\\n\\r\\n\\t    remove(id) {\\r\\n\\t      const { config, vistorias, ..._ } = this.get();\\r\\n\\r\\n\\t      this.set({\\r\\n\\t        vistorias: vistorias.filter(obj => obj.id != id)\\r\\n\\t      });\\r\\n\\t    }\\r\\n\\t  }\\r\\n\\t};\\r\\n</script>\\r\\n\\r\\n<style>\\r\\n\\tbutton {\\r\\n\\t  background-color: transparent;\\r\\n\\t  border: none;\\r\\n\\t}\\r\\n\\r\\n\\ttable {\\r\\n\\t  width: 100%;\\r\\n\\t  border-collapse: collapse;\\r\\n\\t  margin-bottom: 80px;\\r\\n\\t}\\r\\n\\r\\n\\tth {\\r\\n\\t  font-size: 1.3em;\\r\\n\\t}\\r\\n\\r\\n\\ttr {\\r\\n\\t  border-bottom: 5px solid white;\\r\\n\\t}\\r\\n\\r\\n\\ttd {\\r\\n\\t  text-align: center;\\r\\n\\t  vertical-align: middle;\\r\\n\\t  background-color: #f6f6f6;\\r\\n\\t  font-size: 1.4em;\\r\\n\\t}\\r\\n\\r\\n\\t.hide {\\r\\n\\t  display: none;\\r\\n\\t}\\r\\n\\r\\n\\t.show {\\r\\n\\t  display: block;\\r\\n\\t}\\r\\n\\r\\n\\tdiv > .icon,\\r\\n\\tbutton > .icon {\\r\\n\\t  font-size: 62px;\\r\\n\\t}\\r\\n\\r\\n\\ttd > .icon {\\r\\n\\t  font-size: 1.2em;\\r\\n\\t}\\r\\n\\r\\n\\t.center {\\r\\n\\t  text-align: center;\\r\\n\\t}\\r\\n\\r\\n\\tbutton {\\r\\n\\t  margin: 0px 10px 0px 10px;\\r\\n\\t  vertical-align: middle;\\r\\n\\t\\ttouch-action: manipulation;\\r\\n\\t}\\r\\n\\r\\n\\t.success {\\r\\n\\t  color: #32b643;\\r\\n\\t}\\r\\n\\r\\n\\t.warning {\\r\\n\\t  color: #e85600;\\r\\n\\t}\\r\\n\\r\\n\\t.warning-msg {\\r\\n\\t  padding: 20px;\\r\\n\\t  background-color: #e85600;\\r\\n\\t  color: white;\\r\\n\\t  font-weight: 700;\\r\\n\\t  border-radius: 5px;\\r\\n\\t}\\r\\n\\r\\n\\t.dock {\\r\\n\\t  position: fixed;\\r\\n\\t  bottom: 0px;\\r\\n\\t  right: 0px;\\r\\n\\t  left: 0px;\\r\\n\\t  background-color: white;\\r\\n\\t  text-align: center;\\r\\n\\t  -webkit-box-shadow: 0px -5px 70px 0px rgba(74, 74, 74, 0.75);\\r\\n\\t  -moz-box-shadow: 0px -5px 70px 0px rgba(74, 74, 74, 0.75);\\r\\n\\t  box-shadow: 0px -5px 70px 0px rgba(74, 74, 74, 0.75);\\r\\n\\t}\\r\\n\\r\\n\\tlegend {\\r\\n\\t  font-size: 1.4em;\\r\\n\\t}\\r\\n\\r\\n\\t/* Button Badge */\\r\\n\\tbutton.badge {\\r\\n\\t  position: relative;\\r\\n\\t}\\r\\n\\r\\n\\tbutton.badge:before {\\r\\n\\t  content: attr(data-count);\\r\\n\\t  width: 20px;\\r\\n\\t  height: 20px;\\r\\n\\t  line-height: 20px;\\r\\n\\t  text-align: center;\\r\\n\\t  display: block;\\r\\n\\t  border-radius: 50%;\\r\\n\\t  background: rgb(67, 151, 232);\\r\\n\\t  border: 1px solid #ddd;\\r\\n\\t  color: #fff;\\r\\n\\t  position: absolute;\\r\\n\\t  bottom: 10px;\\r\\n\\t  right: 4px;\\r\\n\\t}\\r\\n</style>\"],\"names\":[],\"mappings\":\"AAgSC,MAAM,aAAC,CAAC,AACN,gBAAgB,CAAE,WAAW,CAC7B,MAAM,CAAE,IAAI,AACd,CAAC,AAED,KAAK,aAAC,CAAC,AACL,KAAK,CAAE,IAAI,CACX,eAAe,CAAE,QAAQ,CACzB,aAAa,CAAE,IAAI,AACrB,CAAC,AAED,EAAE,aAAC,CAAC,AACF,SAAS,CAAE,KAAK,AAClB,CAAC,AAED,EAAE,aAAC,CAAC,AACF,aAAa,CAAE,GAAG,CAAC,KAAK,CAAC,KAAK,AAChC,CAAC,AAED,EAAE,aAAC,CAAC,AACF,UAAU,CAAE,MAAM,CAClB,cAAc,CAAE,MAAM,CACtB,gBAAgB,CAAE,OAAO,CACzB,SAAS,CAAE,KAAK,AAClB,CAAC,AAED,KAAK,aAAC,CAAC,AACL,OAAO,CAAE,IAAI,AACf,CAAC,AAED,KAAK,aAAC,CAAC,AACL,OAAO,CAAE,KAAK,AAChB,CAAC,AAED,GAAG,CAAG,kBAAK,CACX,mBAAM,CAAG,KAAK,aAAC,CAAC,AACd,SAAS,CAAE,IAAI,AACjB,CAAC,AAED,eAAE,CAAG,KAAK,aAAC,CAAC,AACV,SAAS,CAAE,KAAK,AAClB,CAAC,AAED,OAAO,aAAC,CAAC,AACP,UAAU,CAAE,MAAM,AACpB,CAAC,AAED,MAAM,aAAC,CAAC,AACN,MAAM,CAAE,GAAG,CAAC,IAAI,CAAC,GAAG,CAAC,IAAI,CACzB,cAAc,CAAE,MAAM,CACvB,YAAY,CAAE,YAAY,AAC3B,CAAC,AAED,QAAQ,aAAC,CAAC,AACR,KAAK,CAAE,OAAO,AAChB,CAAC,AAED,QAAQ,aAAC,CAAC,AACR,KAAK,CAAE,OAAO,AAChB,CAAC,AAED,YAAY,aAAC,CAAC,AACZ,OAAO,CAAE,IAAI,CACb,gBAAgB,CAAE,OAAO,CACzB,KAAK,CAAE,KAAK,CACZ,WAAW,CAAE,GAAG,CAChB,aAAa,CAAE,GAAG,AACpB,CAAC,AAED,KAAK,aAAC,CAAC,AACL,QAAQ,CAAE,KAAK,CACf,MAAM,CAAE,GAAG,CACX,KAAK,CAAE,GAAG,CACV,IAAI,CAAE,GAAG,CACT,gBAAgB,CAAE,KAAK,CACvB,UAAU,CAAE,MAAM,CAClB,kBAAkB,CAAE,GAAG,CAAC,IAAI,CAAC,IAAI,CAAC,GAAG,CAAC,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,CAC5D,eAAe,CAAE,GAAG,CAAC,IAAI,CAAC,IAAI,CAAC,GAAG,CAAC,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,CACzD,UAAU,CAAE,GAAG,CAAC,IAAI,CAAC,IAAI,CAAC,GAAG,CAAC,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,AACtD,CAAC,AAED,MAAM,aAAC,CAAC,AACN,SAAS,CAAE,KAAK,AAClB,CAAC,AAGD,MAAM,MAAM,aAAC,CAAC,AACZ,QAAQ,CAAE,QAAQ,AACpB,CAAC,AAED,MAAM,mBAAM,OAAO,AAAC,CAAC,AACnB,OAAO,CAAE,KAAK,UAAU,CAAC,CACzB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,WAAW,CAAE,IAAI,CACjB,UAAU,CAAE,MAAM,CAClB,OAAO,CAAE,KAAK,CACd,aAAa,CAAE,GAAG,CAClB,UAAU,CAAE,IAAI,EAAE,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAC7B,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,CACtB,KAAK,CAAE,IAAI,CACX,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,GAAG,AACZ,CAAC\"}"
};

var Layout = {};

Layout.filename = "/mnt/c/Users/willi/OneDrive/Documentos/GitHub/ace/src/routes/_layout.html";

Layout.data = function() {
	return {};
};

Layout.render = function(state, options = {}) {
	var components = new Set();

	function addComponent(component) {
		components.add(component);
	}

	var result = { head: '', addComponent };
	var html = Layout._render(result, state, options);

	var cssCode = Array.from(components).map(c => c.css && c.css.code).filter(Boolean).join('\n');

	return {
		html,
		head: result.head,
		css: { code: cssCode, map: null },
		toString() {
			return html;
		}
	};
};

Layout._render = function(__result, ctx, options) {
	__result.addComponent(Layout);

	ctx = Object.assign({}, ctx);

	return `<main class="svelte-1tyvcu5">
	${validateSsrComponent(((ctx.child.component) || missingComponent), 'svelte:component')._render(__result, Object.assign(ctx.child.props), { store: options.store })}
</main>`;
};

Layout.css = {
	code: "main.svelte-1tyvcu5{position:relative;max-width:56em;background-color:white;padding:2em;margin:0 auto;box-sizing:border-box}",
	map: "{\"version\":3,\"file\":\"_layout.html\",\"sources\":[\"_layout.html\"],\"sourcesContent\":[\"<main>\\r\\n\\t<svelte:component this={child.component} {...child.props}/>\\r\\n</main>\\r\\n\\r\\n<style>\\r\\n\\tmain {\\r\\n\\t\\tposition: relative;\\r\\n\\t\\tmax-width: 56em;\\r\\n\\t\\tbackground-color: white;\\r\\n\\t\\tpadding: 2em;\\r\\n\\t\\tmargin: 0 auto;\\r\\n\\t\\tbox-sizing: border-box;\\r\\n\\t}\\r\\n</style>\\r\\n\\r\\n<script>\\r\\n\\r\\n</script>\"],\"names\":[],\"mappings\":\"AAKC,IAAI,eAAC,CAAC,AACL,QAAQ,CAAE,QAAQ,CAClB,SAAS,CAAE,IAAI,CACf,gBAAgB,CAAE,KAAK,CACvB,OAAO,CAAE,GAAG,CACZ,MAAM,CAAE,CAAC,CAAC,IAAI,CACd,UAAU,CAAE,UAAU,AACvB,CAAC\"}"
};

var Error$1 = {};

Error$1.filename = "/mnt/c/Users/willi/OneDrive/Documentos/GitHub/ace/src/routes/_error.html";

Error$1.data = function() {
	return {};
};

Error$1.render = function(state, options = {}) {
	var components = new Set();

	function addComponent(component) {
		components.add(component);
	}

	var result = { head: '', addComponent };
	var html = Error$1._render(result, state, options);

	var cssCode = Array.from(components).map(c => c.css && c.css.code).filter(Boolean).join('\n');

	return {
		html,
		head: result.head,
		css: { code: cssCode, map: null },
		toString() {
			return html;
		}
	};
};

Error$1._render = function(__result, ctx, options) {
	__result.addComponent(Error$1);

	ctx = Object.assign({}, ctx);

	return `${(__result.head += `<title>${escape(ctx.status)}</title>`, "")}

<h1 class="svelte-13vgy2g">${escape(ctx.status)}</h1>

<p class="svelte-13vgy2g">${escape(ctx.error.message)}</p>`;
};

Error$1.css = {
	code: "h1.svelte-13vgy2g,p.svelte-13vgy2g{margin:0 auto}h1.svelte-13vgy2g{font-size:2.8em;font-weight:700;margin:0 0 0.5em 0}p.svelte-13vgy2g{margin:1em auto}@media(min-width: 480px){h1.svelte-13vgy2g{font-size:4em}}",
	map: "{\"version\":3,\"file\":\"_error.html\",\"sources\":[\"_error.html\"],\"sourcesContent\":[\"<svelte:head>\\r\\n\\t<title>{status}</title>\\r\\n</svelte:head>\\r\\n\\r\\n<h1>{status}</h1>\\r\\n\\r\\n<p>{error.message}</p>\\r\\n\\r\\n<style>\\r\\n\\th1, p {\\r\\n\\t\\tmargin: 0 auto;\\r\\n\\t}\\r\\n\\r\\n\\th1 {\\r\\n\\t\\tfont-size: 2.8em;\\r\\n\\t\\tfont-weight: 700;\\r\\n\\t\\tmargin: 0 0 0.5em 0;\\r\\n\\t}\\r\\n\\r\\n\\tp {\\r\\n\\t\\tmargin: 1em auto;\\r\\n\\t}\\r\\n\\r\\n\\t@media (min-width: 480px) {\\r\\n\\t\\th1 {\\r\\n\\t\\t\\tfont-size: 4em;\\r\\n\\t\\t}\\r\\n\\t}\\r\\n</style>\"],\"names\":[],\"mappings\":\"AASC,iBAAE,CAAE,CAAC,eAAC,CAAC,AACN,MAAM,CAAE,CAAC,CAAC,IAAI,AACf,CAAC,AAED,EAAE,eAAC,CAAC,AACH,SAAS,CAAE,KAAK,CAChB,WAAW,CAAE,GAAG,CAChB,MAAM,CAAE,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,AACpB,CAAC,AAED,CAAC,eAAC,CAAC,AACF,MAAM,CAAE,GAAG,CAAC,IAAI,AACjB,CAAC,AAED,MAAM,AAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AAC1B,EAAE,eAAC,CAAC,AACH,SAAS,CAAE,GAAG,AACf,CAAC,AACF,CAAC\"}"
};

// This file is generated by Sapper — do not edit it!

const manifest = {
	server_routes: [
		
	],

	pages: [
		{
			// index.html
			pattern: /^\/?$/,
			parts: [
				{ name: "index", file: "index.html", component: Index }
			]
		}
	],

	root: Layout,

	error: Error$1
};
const build_dir = "__sapper__/dev";
const src_dir = "src";
const IGNORE = '__SAPPER__IGNORE__';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve$$1, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve$$1(result.value) : new P(function (resolve$$1) { resolve$$1(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function get_server_route_handler(routes) {
    function handle_route(route, req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            req.params = route.params(route.pattern.exec(req.path));
            const method = req.method.toLowerCase();
            // 'delete' cannot be exported from a module because it is a keyword,
            // so check for 'del' instead
            const method_export = method === 'delete' ? 'del' : method;
            const handle_method = route.handlers[method_export];
            if (handle_method) {
                if (process.env.SAPPER_EXPORT) {
                    const { write, end, setHeader } = res;
                    const chunks = [];
                    const headers = {};
                    // intercept data so that it can be exported
                    res.write = function (chunk) {
                        chunks.push(Buffer.from(chunk));
                        write.apply(res, arguments);
                    };
                    res.setHeader = function (name, value) {
                        headers[name.toLowerCase()] = value;
                        setHeader.apply(res, arguments);
                    };
                    res.end = function (chunk) {
                        if (chunk)
                            chunks.push(Buffer.from(chunk));
                        end.apply(res, arguments);
                        process.send({
                            __sapper__: true,
                            event: 'file',
                            url: req.url,
                            method: req.method,
                            status: res.statusCode,
                            type: headers['content-type'],
                            body: Buffer.concat(chunks).toString()
                        });
                    };
                }
                const handle_next = (err) => {
                    if (err) {
                        res.statusCode = 500;
                        res.end(err.message);
                    }
                    else {
                        process.nextTick(next);
                    }
                };
                try {
                    yield handle_method(req, res, handle_next);
                }
                catch (err) {
                    handle_next(err);
                }
            }
            else {
                // no matching handler for method
                process.nextTick(next);
            }
        });
    }
    return function find_route(req, res, next) {
        if (req[IGNORE])
            return next();
        for (const route of routes) {
            if (route.pattern.test(req.path)) {
                handle_route(route, req, res, next);
                return;
            }
        }
        next();
    };
}

/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */

/**
 * Module exports.
 * @public
 */

var parse_1 = parse$1;
var serialize_1 = serialize;

/**
 * Module variables.
 * @private
 */

var decode = decodeURIComponent;
var encode = encodeURIComponent;
var pairSplitRegExp = /; */;

/**
 * RegExp to match field-content in RFC 7230 sec 3.2
 *
 * field-content = field-vchar [ 1*( SP / HTAB ) field-vchar ]
 * field-vchar   = VCHAR / obs-text
 * obs-text      = %x80-FF
 */

var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;

/**
 * Parse a cookie header.
 *
 * Parse the given cookie header string into an object
 * The object has the various cookies as keys(names) => values
 *
 * @param {string} str
 * @param {object} [options]
 * @return {object}
 * @public
 */

function parse$1(str, options) {
  if (typeof str !== 'string') {
    throw new TypeError('argument str must be a string');
  }

  var obj = {};
  var opt = options || {};
  var pairs = str.split(pairSplitRegExp);
  var dec = opt.decode || decode;

  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i];
    var eq_idx = pair.indexOf('=');

    // skip things that don't look like key=value
    if (eq_idx < 0) {
      continue;
    }

    var key = pair.substr(0, eq_idx).trim();
    var val = pair.substr(++eq_idx, pair.length).trim();

    // quoted values
    if ('"' == val[0]) {
      val = val.slice(1, -1);
    }

    // only assign once
    if (undefined == obj[key]) {
      obj[key] = tryDecode(val, dec);
    }
  }

  return obj;
}

/**
 * Serialize data into a cookie header.
 *
 * Serialize the a name value pair into a cookie string suitable for
 * http headers. An optional options object specified cookie parameters.
 *
 * serialize('foo', 'bar', { httpOnly: true })
 *   => "foo=bar; httpOnly"
 *
 * @param {string} name
 * @param {string} val
 * @param {object} [options]
 * @return {string}
 * @public
 */

function serialize(name, val, options) {
  var opt = options || {};
  var enc = opt.encode || encode;

  if (typeof enc !== 'function') {
    throw new TypeError('option encode is invalid');
  }

  if (!fieldContentRegExp.test(name)) {
    throw new TypeError('argument name is invalid');
  }

  var value = enc(val);

  if (value && !fieldContentRegExp.test(value)) {
    throw new TypeError('argument val is invalid');
  }

  var str = name + '=' + value;

  if (null != opt.maxAge) {
    var maxAge = opt.maxAge - 0;
    if (isNaN(maxAge)) throw new Error('maxAge should be a Number');
    str += '; Max-Age=' + Math.floor(maxAge);
  }

  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError('option domain is invalid');
    }

    str += '; Domain=' + opt.domain;
  }

  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError('option path is invalid');
    }

    str += '; Path=' + opt.path;
  }

  if (opt.expires) {
    if (typeof opt.expires.toUTCString !== 'function') {
      throw new TypeError('option expires is invalid');
    }

    str += '; Expires=' + opt.expires.toUTCString();
  }

  if (opt.httpOnly) {
    str += '; HttpOnly';
  }

  if (opt.secure) {
    str += '; Secure';
  }

  if (opt.sameSite) {
    var sameSite = typeof opt.sameSite === 'string'
      ? opt.sameSite.toLowerCase() : opt.sameSite;

    switch (sameSite) {
      case true:
        str += '; SameSite=Strict';
        break;
      case 'lax':
        str += '; SameSite=Lax';
        break;
      case 'strict':
        str += '; SameSite=Strict';
        break;
      default:
        throw new TypeError('option sameSite is invalid');
    }
  }

  return str;
}

/**
 * Try decoding a string using a decoding function.
 *
 * @param {string} str
 * @param {function} decode
 * @private
 */

function tryDecode(str, decode) {
  try {
    return decode(str);
  } catch (e) {
    return str;
  }
}

var cookie = {
	parse: parse_1,
	serialize: serialize_1
};

var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$';
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var unsafe = /[<>\/\u2028\u2029]/g;
var escaped$1 = { '<': '\\u003C', '>': '\\u003E', '/': '\\u002F', '\u2028': '\\u2028', '\u2029': '\\u2029' };
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join('\0');
function devalue(value) {
    var counts = new Map();
    function walk(thing) {
        if (typeof thing === 'function') {
            throw new Error("Cannot stringify a function");
        }
        if (counts.has(thing)) {
            counts.set(thing, counts.get(thing) + 1);
            return;
        }
        counts.set(thing, 1);
        if (!isPrimitive(thing)) {
            var type = getType(thing);
            switch (type) {
                case 'Number':
                case 'String':
                case 'Boolean':
                case 'Date':
                case 'RegExp':
                    return;
                case 'Array':
                    thing.forEach(walk);
                    break;
                case 'Set':
                case 'Map':
                    Array.from(thing).forEach(walk);
                    break;
                default:
                    var proto = Object.getPrototypeOf(thing);
                    if (proto !== Object.prototype &&
                        proto !== null &&
                        Object.getOwnPropertyNames(proto).sort().join('\0') !== objectProtoOwnPropertyNames) {
                        throw new Error("Cannot stringify arbitrary non-POJOs");
                    }
                    if (Object.getOwnPropertySymbols(thing).length > 0) {
                        throw new Error("Cannot stringify POJOs with symbolic keys");
                    }
                    Object.keys(thing).forEach(function (key) { return walk(thing[key]); });
            }
        }
    }
    walk(value);
    var names = new Map();
    Array.from(counts)
        .filter(function (entry) { return entry[1] > 1; })
        .sort(function (a, b) { return b[1] - a[1]; })
        .forEach(function (entry, i) {
        names.set(entry[0], getName(i));
    });
    function stringify(thing) {
        if (names.has(thing)) {
            return names.get(thing);
        }
        if (isPrimitive(thing)) {
            return stringifyPrimitive(thing);
        }
        var type = getType(thing);
        switch (type) {
            case 'Number':
            case 'String':
            case 'Boolean':
                return "Object(" + stringify(thing.valueOf()) + ")";
            case 'RegExp':
                return thing.toString();
            case 'Date':
                return "new Date(" + thing.getTime() + ")";
            case 'Array':
                var members = thing.map(function (v, i) { return i in thing ? stringify(v) : ''; });
                var tail = thing.length === 0 || (thing.length - 1 in thing) ? '' : ',';
                return "[" + members.join(',') + tail + "]";
            case 'Set':
            case 'Map':
                return "new " + type + "([" + Array.from(thing).map(stringify).join(',') + "])";
            default:
                var obj = "{" + Object.keys(thing).map(function (key) { return safeKey(key) + ":" + stringify(thing[key]); }).join(',') + "}";
                var proto = Object.getPrototypeOf(thing);
                if (proto === null) {
                    return Object.keys(thing).length > 0
                        ? "Object.assign(Object.create(null)," + obj + ")"
                        : "Object.create(null)";
                }
                return obj;
        }
    }
    var str = stringify(value);
    if (names.size) {
        var params_1 = [];
        var statements_1 = [];
        var values_1 = [];
        names.forEach(function (name, thing) {
            params_1.push(name);
            if (isPrimitive(thing)) {
                values_1.push(stringifyPrimitive(thing));
                return;
            }
            var type = getType(thing);
            switch (type) {
                case 'Number':
                case 'String':
                case 'Boolean':
                    values_1.push("Object(" + stringify(thing.valueOf()) + ")");
                    break;
                case 'RegExp':
                    values_1.push(thing.toString());
                    break;
                case 'Date':
                    values_1.push("new Date(" + thing.getTime() + ")");
                    break;
                case 'Array':
                    values_1.push("Array(" + thing.length + ")");
                    thing.forEach(function (v, i) {
                        statements_1.push(name + "[" + i + "]=" + stringify(v));
                    });
                    break;
                case 'Set':
                    values_1.push("new Set");
                    statements_1.push(name + "." + Array.from(thing).map(function (v) { return "add(" + stringify(v) + ")"; }).join('.'));
                    break;
                case 'Map':
                    values_1.push("new Map");
                    statements_1.push(name + "." + Array.from(thing).map(function (_a) {
                        var k = _a[0], v = _a[1];
                        return "set(" + stringify(k) + ", " + stringify(v) + ")";
                    }).join('.'));
                    break;
                default:
                    values_1.push(Object.getPrototypeOf(thing) === null ? 'Object.create(null)' : '{}');
                    Object.keys(thing).forEach(function (key) {
                        statements_1.push("" + name + safeProp(key) + "=" + stringify(thing[key]));
                    });
            }
        });
        statements_1.push("return " + str);
        return "(function(" + params_1.join(',') + "){" + statements_1.join(';') + "}(" + values_1.join(',') + "))";
    }
    else {
        return str;
    }
}
function getName(num) {
    var name = '';
    do {
        name = chars[num % chars.length] + name;
        num = ~~(num / chars.length) - 1;
    } while (num >= 0);
    return reserved.test(name) ? name + "_" : name;
}
function isPrimitive(thing) {
    return Object(thing) !== thing;
}
function escape$1(char) {
    return escaped$1[char];
}
function stringifyPrimitive(thing) {
    if (typeof thing === 'string')
        return JSON.stringify(thing).replace(unsafe, escape$1);
    if (thing === void 0)
        return 'void 0';
    if (thing === 0 && 1 / thing < 0)
        return '-0';
    var str = String(thing);
    if (typeof thing === 'number')
        return str.replace(/^(-)?0\./, '$1.');
    return str;
}
function getType(thing) {
    return Object.prototype.toString.call(thing).slice(8, -1);
}
function safeKey(key) {
    return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : JSON.stringify(key);
}
function safeProp(key) {
    return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? "." + key : "[" + JSON.stringify(key) + "]";
}

// Based on https://github.com/tmpvar/jsdom/blob/aa85b2abf07766ff7bf5c1f6daafb3726f2f2db5/lib/jsdom/living/blob.js
// (MIT licensed)

const BUFFER = Symbol('buffer');
const TYPE = Symbol('type');

class Blob {
	constructor() {
		this[TYPE] = '';

		const blobParts = arguments[0];
		const options = arguments[1];

		const buffers = [];

		if (blobParts) {
			const a = blobParts;
			const length = Number(a.length);
			for (let i = 0; i < length; i++) {
				const element = a[i];
				let buffer;
				if (element instanceof Buffer) {
					buffer = element;
				} else if (ArrayBuffer.isView(element)) {
					buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
				} else if (element instanceof ArrayBuffer) {
					buffer = Buffer.from(element);
				} else if (element instanceof Blob) {
					buffer = element[BUFFER];
				} else {
					buffer = Buffer.from(typeof element === 'string' ? element : String(element));
				}
				buffers.push(buffer);
			}
		}

		this[BUFFER] = Buffer.concat(buffers);

		let type = options && options.type !== undefined && String(options.type).toLowerCase();
		if (type && !/[^\u0020-\u007E]/.test(type)) {
			this[TYPE] = type;
		}
	}
	get size() {
		return this[BUFFER].length;
	}
	get type() {
		return this[TYPE];
	}
	slice() {
		const size = this.size;

		const start = arguments[0];
		const end = arguments[1];
		let relativeStart, relativeEnd;
		if (start === undefined) {
			relativeStart = 0;
		} else if (start < 0) {
			relativeStart = Math.max(size + start, 0);
		} else {
			relativeStart = Math.min(start, size);
		}
		if (end === undefined) {
			relativeEnd = size;
		} else if (end < 0) {
			relativeEnd = Math.max(size + end, 0);
		} else {
			relativeEnd = Math.min(end, size);
		}
		const span = Math.max(relativeEnd - relativeStart, 0);

		const buffer = this[BUFFER];
		const slicedBuffer = buffer.slice(relativeStart, relativeStart + span);
		const blob = new Blob([], { type: arguments[2] });
		blob[BUFFER] = slicedBuffer;
		return blob;
	}
}

Object.defineProperties(Blob.prototype, {
	size: { enumerable: true },
	type: { enumerable: true },
	slice: { enumerable: true }
});

Object.defineProperty(Blob.prototype, Symbol.toStringTag, {
	value: 'Blob',
	writable: false,
	enumerable: false,
	configurable: true
});

/**
 * fetch-error.js
 *
 * FetchError interface for operational errors
 */

/**
 * Create FetchError instance
 *
 * @param   String      message      Error message for human
 * @param   String      type         Error type for machine
 * @param   String      systemError  For Node.js system error
 * @return  FetchError
 */
function FetchError(message, type, systemError) {
  Error.call(this, message);

  this.message = message;
  this.type = type;

  // when err.type is `system`, err.code contains system error code
  if (systemError) {
    this.code = this.errno = systemError.code;
  }

  // hide custom error implementation details from end-users
  Error.captureStackTrace(this, this.constructor);
}

FetchError.prototype = Object.create(Error.prototype);
FetchError.prototype.constructor = FetchError;
FetchError.prototype.name = 'FetchError';

let convert;
try {
	convert = require('encoding').convert;
} catch (e) {}

const INTERNALS = Symbol('Body internals');

/**
 * Body mixin
 *
 * Ref: https://fetch.spec.whatwg.org/#body
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
function Body(body) {
	var _this = this;

	var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	    _ref$size = _ref.size;

	let size = _ref$size === undefined ? 0 : _ref$size;
	var _ref$timeout = _ref.timeout;
	let timeout = _ref$timeout === undefined ? 0 : _ref$timeout;

	if (body == null) {
		// body is undefined or null
		body = null;
	} else if (typeof body === 'string') ; else if (isURLSearchParams(body)) ; else if (body instanceof Blob) ; else if (Buffer.isBuffer(body)) ; else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') ; else if (ArrayBuffer.isView(body)) ; else if (body instanceof Stream__default) ; else {
		// none of the above
		// coerce to string
		body = String(body);
	}
	this[INTERNALS] = {
		body,
		disturbed: false,
		error: null
	};
	this.size = size;
	this.timeout = timeout;

	if (body instanceof Stream__default) {
		body.on('error', function (err) {
			_this[INTERNALS].error = new FetchError(`Invalid response body while trying to fetch ${_this.url}: ${err.message}`, 'system', err);
		});
	}
}

Body.prototype = {
	get body() {
		return this[INTERNALS].body;
	},

	get bodyUsed() {
		return this[INTERNALS].disturbed;
	},

	/**
  * Decode response as ArrayBuffer
  *
  * @return  Promise
  */
	arrayBuffer() {
		return consumeBody.call(this).then(function (buf) {
			return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
		});
	},

	/**
  * Return raw response as Blob
  *
  * @return Promise
  */
	blob() {
		let ct = this.headers && this.headers.get('content-type') || '';
		return consumeBody.call(this).then(function (buf) {
			return Object.assign(
			// Prevent copying
			new Blob([], {
				type: ct.toLowerCase()
			}), {
				[BUFFER]: buf
			});
		});
	},

	/**
  * Decode response as json
  *
  * @return  Promise
  */
	json() {
		var _this2 = this;

		return consumeBody.call(this).then(function (buffer) {
			try {
				return JSON.parse(buffer.toString());
			} catch (err) {
				return Body.Promise.reject(new FetchError(`invalid json response body at ${_this2.url} reason: ${err.message}`, 'invalid-json'));
			}
		});
	},

	/**
  * Decode response as text
  *
  * @return  Promise
  */
	text() {
		return consumeBody.call(this).then(function (buffer) {
			return buffer.toString();
		});
	},

	/**
  * Decode response as buffer (non-spec api)
  *
  * @return  Promise
  */
	buffer() {
		return consumeBody.call(this);
	},

	/**
  * Decode response as text, while automatically detecting the encoding and
  * trying to decode to UTF-8 (non-spec api)
  *
  * @return  Promise
  */
	textConverted() {
		var _this3 = this;

		return consumeBody.call(this).then(function (buffer) {
			return convertBody(buffer, _this3.headers);
		});
	}

};

// In browsers, all properties are enumerable.
Object.defineProperties(Body.prototype, {
	body: { enumerable: true },
	bodyUsed: { enumerable: true },
	arrayBuffer: { enumerable: true },
	blob: { enumerable: true },
	json: { enumerable: true },
	text: { enumerable: true }
});

Body.mixIn = function (proto) {
	for (const name of Object.getOwnPropertyNames(Body.prototype)) {
		// istanbul ignore else: future proof
		if (!(name in proto)) {
			const desc = Object.getOwnPropertyDescriptor(Body.prototype, name);
			Object.defineProperty(proto, name, desc);
		}
	}
};

/**
 * Consume and convert an entire Body to a Buffer.
 *
 * Ref: https://fetch.spec.whatwg.org/#concept-body-consume-body
 *
 * @return  Promise
 */
function consumeBody() {
	var _this4 = this;

	if (this[INTERNALS].disturbed) {
		return Body.Promise.reject(new TypeError(`body used already for: ${this.url}`));
	}

	this[INTERNALS].disturbed = true;

	if (this[INTERNALS].error) {
		return Body.Promise.reject(this[INTERNALS].error);
	}

	// body is null
	if (this.body === null) {
		return Body.Promise.resolve(Buffer.alloc(0));
	}

	// body is string
	if (typeof this.body === 'string') {
		return Body.Promise.resolve(Buffer.from(this.body));
	}

	// body is blob
	if (this.body instanceof Blob) {
		return Body.Promise.resolve(this.body[BUFFER]);
	}

	// body is buffer
	if (Buffer.isBuffer(this.body)) {
		return Body.Promise.resolve(this.body);
	}

	// body is ArrayBuffer
	if (Object.prototype.toString.call(this.body) === '[object ArrayBuffer]') {
		return Body.Promise.resolve(Buffer.from(this.body));
	}

	// body is ArrayBufferView
	if (ArrayBuffer.isView(this.body)) {
		return Body.Promise.resolve(Buffer.from(this.body.buffer, this.body.byteOffset, this.body.byteLength));
	}

	// istanbul ignore if: should never happen
	if (!(this.body instanceof Stream__default)) {
		return Body.Promise.resolve(Buffer.alloc(0));
	}

	// body is stream
	// get ready to actually consume the body
	let accum = [];
	let accumBytes = 0;
	let abort = false;

	return new Body.Promise(function (resolve$$1, reject) {
		let resTimeout;

		// allow timeout on slow response body
		if (_this4.timeout) {
			resTimeout = setTimeout(function () {
				abort = true;
				reject(new FetchError(`Response timeout while trying to fetch ${_this4.url} (over ${_this4.timeout}ms)`, 'body-timeout'));
			}, _this4.timeout);
		}

		// handle stream error, such as incorrect content-encoding
		_this4.body.on('error', function (err) {
			reject(new FetchError(`Invalid response body while trying to fetch ${_this4.url}: ${err.message}`, 'system', err));
		});

		_this4.body.on('data', function (chunk) {
			if (abort || chunk === null) {
				return;
			}

			if (_this4.size && accumBytes + chunk.length > _this4.size) {
				abort = true;
				reject(new FetchError(`content size at ${_this4.url} over limit: ${_this4.size}`, 'max-size'));
				return;
			}

			accumBytes += chunk.length;
			accum.push(chunk);
		});

		_this4.body.on('end', function () {
			if (abort) {
				return;
			}

			clearTimeout(resTimeout);

			try {
				resolve$$1(Buffer.concat(accum));
			} catch (err) {
				// handle streams that have accumulated too much data (issue #414)
				reject(new FetchError(`Could not create Buffer from response body for ${_this4.url}: ${err.message}`, 'system', err));
			}
		});
	});
}

/**
 * Detect buffer encoding and convert to target encoding
 * ref: http://www.w3.org/TR/2011/WD-html5-20110113/parsing.html#determining-the-character-encoding
 *
 * @param   Buffer  buffer    Incoming buffer
 * @param   String  encoding  Target encoding
 * @return  String
 */
function convertBody(buffer, headers) {
	if (typeof convert !== 'function') {
		throw new Error('The package `encoding` must be installed to use the textConverted() function');
	}

	const ct = headers.get('content-type');
	let charset = 'utf-8';
	let res, str;

	// header
	if (ct) {
		res = /charset=([^;]*)/i.exec(ct);
	}

	// no charset in content type, peek at response body for at most 1024 bytes
	str = buffer.slice(0, 1024).toString();

	// html5
	if (!res && str) {
		res = /<meta.+?charset=(['"])(.+?)\1/i.exec(str);
	}

	// html4
	if (!res && str) {
		res = /<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(str);

		if (res) {
			res = /charset=(.*)/i.exec(res.pop());
		}
	}

	// xml
	if (!res && str) {
		res = /<\?xml.+?encoding=(['"])(.+?)\1/i.exec(str);
	}

	// found charset
	if (res) {
		charset = res.pop();

		// prevent decode issues when sites use incorrect encoding
		// ref: https://hsivonen.fi/encoding-menu/
		if (charset === 'gb2312' || charset === 'gbk') {
			charset = 'gb18030';
		}
	}

	// turn raw buffers into a single utf-8 buffer
	return convert(buffer, 'UTF-8', charset).toString();
}

/**
 * Detect a URLSearchParams object
 * ref: https://github.com/bitinn/node-fetch/issues/296#issuecomment-307598143
 *
 * @param   Object  obj     Object to detect by type or brand
 * @return  String
 */
function isURLSearchParams(obj) {
	// Duck-typing as a necessary condition.
	if (typeof obj !== 'object' || typeof obj.append !== 'function' || typeof obj.delete !== 'function' || typeof obj.get !== 'function' || typeof obj.getAll !== 'function' || typeof obj.has !== 'function' || typeof obj.set !== 'function') {
		return false;
	}

	// Brand-checking and more duck-typing as optional condition.
	return obj.constructor.name === 'URLSearchParams' || Object.prototype.toString.call(obj) === '[object URLSearchParams]' || typeof obj.sort === 'function';
}

/**
 * Clone body given Res/Req instance
 *
 * @param   Mixed  instance  Response or Request instance
 * @return  Mixed
 */
function clone(instance) {
	let p1, p2;
	let body = instance.body;

	// don't allow cloning a used body
	if (instance.bodyUsed) {
		throw new Error('cannot clone body after it is used');
	}

	// check that body is a stream and not form-data object
	// note: we can't clone the form-data object without having it as a dependency
	if (body instanceof Stream__default && typeof body.getBoundary !== 'function') {
		// tee instance body
		p1 = new Stream.PassThrough();
		p2 = new Stream.PassThrough();
		body.pipe(p1);
		body.pipe(p2);
		// set instance body to teed body and return the other teed body
		instance[INTERNALS].body = p1;
		body = p2;
	}

	return body;
}

/**
 * Performs the operation "extract a `Content-Type` value from |object|" as
 * specified in the specification:
 * https://fetch.spec.whatwg.org/#concept-bodyinit-extract
 *
 * This function assumes that instance.body is present.
 *
 * @param   Mixed  instance  Response or Request instance
 */
function extractContentType(instance) {
	const body = instance.body;

	// istanbul ignore if: Currently, because of a guard in Request, body
	// can never be null. Included here for completeness.

	if (body === null) {
		// body is null
		return null;
	} else if (typeof body === 'string') {
		// body is string
		return 'text/plain;charset=UTF-8';
	} else if (isURLSearchParams(body)) {
		// body is a URLSearchParams
		return 'application/x-www-form-urlencoded;charset=UTF-8';
	} else if (body instanceof Blob) {
		// body is blob
		return body.type || null;
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		return null;
	} else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
		// body is ArrayBuffer
		return null;
	} else if (ArrayBuffer.isView(body)) {
		// body is ArrayBufferView
		return null;
	} else if (typeof body.getBoundary === 'function') {
		// detect form data input from form-data module
		return `multipart/form-data;boundary=${body.getBoundary()}`;
	} else {
		// body is stream
		// can't really do much about this
		return null;
	}
}

/**
 * The Fetch Standard treats this as if "total bytes" is a property on the body.
 * For us, we have to explicitly get it with a function.
 *
 * ref: https://fetch.spec.whatwg.org/#concept-body-total-bytes
 *
 * @param   Body    instance   Instance of Body
 * @return  Number?            Number of bytes, or null if not possible
 */
function getTotalBytes(instance) {
	const body = instance.body;

	// istanbul ignore if: included for completion

	if (body === null) {
		// body is null
		return 0;
	} else if (typeof body === 'string') {
		// body is string
		return Buffer.byteLength(body);
	} else if (isURLSearchParams(body)) {
		// body is URLSearchParams
		return Buffer.byteLength(String(body));
	} else if (body instanceof Blob) {
		// body is blob
		return body.size;
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		return body.length;
	} else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
		// body is ArrayBuffer
		return body.byteLength;
	} else if (ArrayBuffer.isView(body)) {
		// body is ArrayBufferView
		return body.byteLength;
	} else if (body && typeof body.getLengthSync === 'function') {
		// detect form data input from form-data module
		if (body._lengthRetrievers && body._lengthRetrievers.length == 0 || // 1.x
		body.hasKnownLength && body.hasKnownLength()) {
			// 2.x
			return body.getLengthSync();
		}
		return null;
	} else {
		// body is stream
		// can't really do much about this
		return null;
	}
}

/**
 * Write a Body to a Node.js WritableStream (e.g. http.Request) object.
 *
 * @param   Body    instance   Instance of Body
 * @return  Void
 */
function writeToStream(dest, instance) {
	const body = instance.body;


	if (body === null) {
		// body is null
		dest.end();
	} else if (typeof body === 'string') {
		// body is string
		dest.write(body);
		dest.end();
	} else if (isURLSearchParams(body)) {
		// body is URLSearchParams
		dest.write(Buffer.from(String(body)));
		dest.end();
	} else if (body instanceof Blob) {
		// body is blob
		dest.write(body[BUFFER]);
		dest.end();
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		dest.write(body);
		dest.end();
	} else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
		// body is ArrayBuffer
		dest.write(Buffer.from(body));
		dest.end();
	} else if (ArrayBuffer.isView(body)) {
		// body is ArrayBufferView
		dest.write(Buffer.from(body.buffer, body.byteOffset, body.byteLength));
		dest.end();
	} else {
		// body is stream
		body.pipe(dest);
	}
}

// expose Promise
Body.Promise = global.Promise;

/**
 * headers.js
 *
 * Headers class offers convenient helpers
 */

const invalidTokenRegex = /[^\^_`a-zA-Z\-0-9!#$%&'*+.|~]/;
const invalidHeaderCharRegex = /[^\t\x20-\x7e\x80-\xff]/;

function validateName(name) {
	name = `${name}`;
	if (invalidTokenRegex.test(name)) {
		throw new TypeError(`${name} is not a legal HTTP header name`);
	}
}

function validateValue(value) {
	value = `${value}`;
	if (invalidHeaderCharRegex.test(value)) {
		throw new TypeError(`${value} is not a legal HTTP header value`);
	}
}

/**
 * Find the key in the map object given a header name.
 *
 * Returns undefined if not found.
 *
 * @param   String  name  Header name
 * @return  String|Undefined
 */
function find(map, name) {
	name = name.toLowerCase();
	for (const key in map) {
		if (key.toLowerCase() === name) {
			return key;
		}
	}
	return undefined;
}

const MAP = Symbol('map');
class Headers {
	/**
  * Headers class
  *
  * @param   Object  headers  Response headers
  * @return  Void
  */
	constructor() {
		let init = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

		this[MAP] = Object.create(null);

		if (init instanceof Headers) {
			const rawHeaders = init.raw();
			const headerNames = Object.keys(rawHeaders);

			for (const headerName of headerNames) {
				for (const value of rawHeaders[headerName]) {
					this.append(headerName, value);
				}
			}

			return;
		}

		// We don't worry about converting prop to ByteString here as append()
		// will handle it.
		if (init == null) ; else if (typeof init === 'object') {
			const method = init[Symbol.iterator];
			if (method != null) {
				if (typeof method !== 'function') {
					throw new TypeError('Header pairs must be iterable');
				}

				// sequence<sequence<ByteString>>
				// Note: per spec we have to first exhaust the lists then process them
				const pairs = [];
				for (const pair of init) {
					if (typeof pair !== 'object' || typeof pair[Symbol.iterator] !== 'function') {
						throw new TypeError('Each header pair must be iterable');
					}
					pairs.push(Array.from(pair));
				}

				for (const pair of pairs) {
					if (pair.length !== 2) {
						throw new TypeError('Each header pair must be a name/value tuple');
					}
					this.append(pair[0], pair[1]);
				}
			} else {
				// record<ByteString, ByteString>
				for (const key of Object.keys(init)) {
					const value = init[key];
					this.append(key, value);
				}
			}
		} else {
			throw new TypeError('Provided initializer must be an object');
		}
	}

	/**
  * Return combined header value given name
  *
  * @param   String  name  Header name
  * @return  Mixed
  */
	get(name) {
		name = `${name}`;
		validateName(name);
		const key = find(this[MAP], name);
		if (key === undefined) {
			return null;
		}

		return this[MAP][key].join(', ');
	}

	/**
  * Iterate over all headers
  *
  * @param   Function  callback  Executed for each item with parameters (value, name, thisArg)
  * @param   Boolean   thisArg   `this` context for callback function
  * @return  Void
  */
	forEach(callback) {
		let thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

		let pairs = getHeaders(this);
		let i = 0;
		while (i < pairs.length) {
			var _pairs$i = pairs[i];
			const name = _pairs$i[0],
			      value = _pairs$i[1];

			callback.call(thisArg, value, name, this);
			pairs = getHeaders(this);
			i++;
		}
	}

	/**
  * Overwrite header values given name
  *
  * @param   String  name   Header name
  * @param   String  value  Header value
  * @return  Void
  */
	set(name, value) {
		name = `${name}`;
		value = `${value}`;
		validateName(name);
		validateValue(value);
		const key = find(this[MAP], name);
		this[MAP][key !== undefined ? key : name] = [value];
	}

	/**
  * Append a value onto existing header
  *
  * @param   String  name   Header name
  * @param   String  value  Header value
  * @return  Void
  */
	append(name, value) {
		name = `${name}`;
		value = `${value}`;
		validateName(name);
		validateValue(value);
		const key = find(this[MAP], name);
		if (key !== undefined) {
			this[MAP][key].push(value);
		} else {
			this[MAP][name] = [value];
		}
	}

	/**
  * Check for header name existence
  *
  * @param   String   name  Header name
  * @return  Boolean
  */
	has(name) {
		name = `${name}`;
		validateName(name);
		return find(this[MAP], name) !== undefined;
	}

	/**
  * Delete all header values given name
  *
  * @param   String  name  Header name
  * @return  Void
  */
	delete(name) {
		name = `${name}`;
		validateName(name);
		const key = find(this[MAP], name);
		if (key !== undefined) {
			delete this[MAP][key];
		}
	}

	/**
  * Return raw headers (non-spec api)
  *
  * @return  Object
  */
	raw() {
		return this[MAP];
	}

	/**
  * Get an iterator on keys.
  *
  * @return  Iterator
  */
	keys() {
		return createHeadersIterator(this, 'key');
	}

	/**
  * Get an iterator on values.
  *
  * @return  Iterator
  */
	values() {
		return createHeadersIterator(this, 'value');
	}

	/**
  * Get an iterator on entries.
  *
  * This is the default iterator of the Headers object.
  *
  * @return  Iterator
  */
	[Symbol.iterator]() {
		return createHeadersIterator(this, 'key+value');
	}
}
Headers.prototype.entries = Headers.prototype[Symbol.iterator];

Object.defineProperty(Headers.prototype, Symbol.toStringTag, {
	value: 'Headers',
	writable: false,
	enumerable: false,
	configurable: true
});

Object.defineProperties(Headers.prototype, {
	get: { enumerable: true },
	forEach: { enumerable: true },
	set: { enumerable: true },
	append: { enumerable: true },
	has: { enumerable: true },
	delete: { enumerable: true },
	keys: { enumerable: true },
	values: { enumerable: true },
	entries: { enumerable: true }
});

function getHeaders(headers) {
	let kind = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'key+value';

	const keys = Object.keys(headers[MAP]).sort();
	return keys.map(kind === 'key' ? function (k) {
		return k.toLowerCase();
	} : kind === 'value' ? function (k) {
		return headers[MAP][k].join(', ');
	} : function (k) {
		return [k.toLowerCase(), headers[MAP][k].join(', ')];
	});
}

const INTERNAL = Symbol('internal');

function createHeadersIterator(target, kind) {
	const iterator = Object.create(HeadersIteratorPrototype);
	iterator[INTERNAL] = {
		target,
		kind,
		index: 0
	};
	return iterator;
}

const HeadersIteratorPrototype = Object.setPrototypeOf({
	next() {
		// istanbul ignore if
		if (!this || Object.getPrototypeOf(this) !== HeadersIteratorPrototype) {
			throw new TypeError('Value of `this` is not a HeadersIterator');
		}

		var _INTERNAL = this[INTERNAL];
		const target = _INTERNAL.target,
		      kind = _INTERNAL.kind,
		      index = _INTERNAL.index;

		const values = getHeaders(target, kind);
		const len = values.length;
		if (index >= len) {
			return {
				value: undefined,
				done: true
			};
		}

		this[INTERNAL].index = index + 1;

		return {
			value: values[index],
			done: false
		};
	}
}, Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]())));

Object.defineProperty(HeadersIteratorPrototype, Symbol.toStringTag, {
	value: 'HeadersIterator',
	writable: false,
	enumerable: false,
	configurable: true
});

/**
 * Export the Headers object in a form that Node.js can consume.
 *
 * @param   Headers  headers
 * @return  Object
 */
function exportNodeCompatibleHeaders(headers) {
	const obj = Object.assign({ __proto__: null }, headers[MAP]);

	// http.request() only supports string as Host header. This hack makes
	// specifying custom Host header possible.
	const hostHeaderKey = find(headers[MAP], 'Host');
	if (hostHeaderKey !== undefined) {
		obj[hostHeaderKey] = obj[hostHeaderKey][0];
	}

	return obj;
}

/**
 * Create a Headers object from an object of headers, ignoring those that do
 * not conform to HTTP grammar productions.
 *
 * @param   Object  obj  Object of headers
 * @return  Headers
 */
function createHeadersLenient(obj) {
	const headers = new Headers();
	for (const name of Object.keys(obj)) {
		if (invalidTokenRegex.test(name)) {
			continue;
		}
		if (Array.isArray(obj[name])) {
			for (const val of obj[name]) {
				if (invalidHeaderCharRegex.test(val)) {
					continue;
				}
				if (headers[MAP][name] === undefined) {
					headers[MAP][name] = [val];
				} else {
					headers[MAP][name].push(val);
				}
			}
		} else if (!invalidHeaderCharRegex.test(obj[name])) {
			headers[MAP][name] = [obj[name]];
		}
	}
	return headers;
}

const INTERNALS$1 = Symbol('Response internals');

/**
 * Response class
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
class Response {
	constructor() {
		let body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
		let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		Body.call(this, body, opts);

		const status = opts.status || 200;

		this[INTERNALS$1] = {
			url: opts.url,
			status,
			statusText: opts.statusText || http.STATUS_CODES[status],
			headers: new Headers(opts.headers)
		};
	}

	get url() {
		return this[INTERNALS$1].url;
	}

	get status() {
		return this[INTERNALS$1].status;
	}

	/**
  * Convenience property representing if the request ended normally
  */
	get ok() {
		return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
	}

	get statusText() {
		return this[INTERNALS$1].statusText;
	}

	get headers() {
		return this[INTERNALS$1].headers;
	}

	/**
  * Clone this response
  *
  * @return  Response
  */
	clone() {
		return new Response(clone(this), {
			url: this.url,
			status: this.status,
			statusText: this.statusText,
			headers: this.headers,
			ok: this.ok
		});
	}
}

Body.mixIn(Response.prototype);

Object.defineProperties(Response.prototype, {
	url: { enumerable: true },
	status: { enumerable: true },
	ok: { enumerable: true },
	statusText: { enumerable: true },
	headers: { enumerable: true },
	clone: { enumerable: true }
});

Object.defineProperty(Response.prototype, Symbol.toStringTag, {
	value: 'Response',
	writable: false,
	enumerable: false,
	configurable: true
});

const INTERNALS$2 = Symbol('Request internals');

/**
 * Check if a value is an instance of Request.
 *
 * @param   Mixed   input
 * @return  Boolean
 */
function isRequest(input) {
	return typeof input === 'object' && typeof input[INTERNALS$2] === 'object';
}

/**
 * Request class
 *
 * @param   Mixed   input  Url or Request instance
 * @param   Object  init   Custom options
 * @return  Void
 */
class Request {
	constructor(input) {
		let init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		let parsedURL;

		// normalize input
		if (!isRequest(input)) {
			if (input && input.href) {
				// in order to support Node.js' Url objects; though WHATWG's URL objects
				// will fall into this branch also (since their `toString()` will return
				// `href` property anyway)
				parsedURL = url.parse(input.href);
			} else {
				// coerce input to a string before attempting to parse
				parsedURL = url.parse(`${input}`);
			}
			input = {};
		} else {
			parsedURL = url.parse(input.url);
		}

		let method = init.method || input.method || 'GET';
		method = method.toUpperCase();

		if ((init.body != null || isRequest(input) && input.body !== null) && (method === 'GET' || method === 'HEAD')) {
			throw new TypeError('Request with GET/HEAD method cannot have body');
		}

		let inputBody = init.body != null ? init.body : isRequest(input) && input.body !== null ? clone(input) : null;

		Body.call(this, inputBody, {
			timeout: init.timeout || input.timeout || 0,
			size: init.size || input.size || 0
		});

		const headers = new Headers(init.headers || input.headers || {});

		if (init.body != null) {
			const contentType = extractContentType(this);
			if (contentType !== null && !headers.has('Content-Type')) {
				headers.append('Content-Type', contentType);
			}
		}

		this[INTERNALS$2] = {
			method,
			redirect: init.redirect || input.redirect || 'follow',
			headers,
			parsedURL
		};

		// node-fetch-only options
		this.follow = init.follow !== undefined ? init.follow : input.follow !== undefined ? input.follow : 20;
		this.compress = init.compress !== undefined ? init.compress : input.compress !== undefined ? input.compress : true;
		this.counter = init.counter || input.counter || 0;
		this.agent = init.agent || input.agent;
	}

	get method() {
		return this[INTERNALS$2].method;
	}

	get url() {
		return url.format(this[INTERNALS$2].parsedURL);
	}

	get headers() {
		return this[INTERNALS$2].headers;
	}

	get redirect() {
		return this[INTERNALS$2].redirect;
	}

	/**
  * Clone this request
  *
  * @return  Request
  */
	clone() {
		return new Request(this);
	}
}

Body.mixIn(Request.prototype);

Object.defineProperty(Request.prototype, Symbol.toStringTag, {
	value: 'Request',
	writable: false,
	enumerable: false,
	configurable: true
});

Object.defineProperties(Request.prototype, {
	method: { enumerable: true },
	url: { enumerable: true },
	headers: { enumerable: true },
	redirect: { enumerable: true },
	clone: { enumerable: true }
});

/**
 * Convert a Request to Node.js http request options.
 *
 * @param   Request  A Request instance
 * @return  Object   The options object to be passed to http.request
 */
function getNodeRequestOptions(request) {
	const parsedURL = request[INTERNALS$2].parsedURL;
	const headers = new Headers(request[INTERNALS$2].headers);

	// fetch step 1.3
	if (!headers.has('Accept')) {
		headers.set('Accept', '*/*');
	}

	// Basic fetch
	if (!parsedURL.protocol || !parsedURL.hostname) {
		throw new TypeError('Only absolute URLs are supported');
	}

	if (!/^https?:$/.test(parsedURL.protocol)) {
		throw new TypeError('Only HTTP(S) protocols are supported');
	}

	// HTTP-network-or-cache fetch steps 2.4-2.7
	let contentLengthValue = null;
	if (request.body == null && /^(POST|PUT)$/i.test(request.method)) {
		contentLengthValue = '0';
	}
	if (request.body != null) {
		const totalBytes = getTotalBytes(request);
		if (typeof totalBytes === 'number') {
			contentLengthValue = String(totalBytes);
		}
	}
	if (contentLengthValue) {
		headers.set('Content-Length', contentLengthValue);
	}

	// HTTP-network-or-cache fetch step 2.11
	if (!headers.has('User-Agent')) {
		headers.set('User-Agent', 'node-fetch/1.0 (+https://github.com/bitinn/node-fetch)');
	}

	// HTTP-network-or-cache fetch step 2.15
	if (request.compress) {
		headers.set('Accept-Encoding', 'gzip,deflate');
	}
	if (!headers.has('Connection') && !request.agent) {
		headers.set('Connection', 'close');
	}

	// HTTP-network fetch step 4.2
	// chunked encoding is handled by Node.js

	return Object.assign({}, parsedURL, {
		method: request.method,
		headers: exportNodeCompatibleHeaders(headers),
		agent: request.agent
	});
}

/**
 * Fetch function
 *
 * @param   Mixed    url   Absolute url or Request instance
 * @param   Object   opts  Fetch options
 * @return  Promise
 */
function fetch(url$1, opts) {

	// allow custom promise
	if (!fetch.Promise) {
		throw new Error('native promise missing, set fetch.Promise to your favorite alternative');
	}

	Body.Promise = fetch.Promise;

	// wrap http.request into fetch
	return new fetch.Promise(function (resolve$$1, reject) {
		// build request object
		const request = new Request(url$1, opts);
		const options = getNodeRequestOptions(request);

		const send = (options.protocol === 'https:' ? https : http__default).request;

		// send request
		const req = send(options);
		let reqTimeout;

		function finalize() {
			req.abort();
			clearTimeout(reqTimeout);
		}

		if (request.timeout) {
			req.once('socket', function (socket) {
				reqTimeout = setTimeout(function () {
					reject(new FetchError(`network timeout at: ${request.url}`, 'request-timeout'));
					finalize();
				}, request.timeout);
			});
		}

		req.on('error', function (err) {
			reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, 'system', err));
			finalize();
		});

		req.on('response', function (res) {
			clearTimeout(reqTimeout);

			const headers = createHeadersLenient(res.headers);

			// HTTP fetch step 5
			if (fetch.isRedirect(res.statusCode)) {
				// HTTP fetch step 5.2
				const location = headers.get('Location');

				// HTTP fetch step 5.3
				const locationURL = location === null ? null : url.resolve(request.url, location);

				// HTTP fetch step 5.5
				switch (request.redirect) {
					case 'error':
						reject(new FetchError(`redirect mode is set to error: ${request.url}`, 'no-redirect'));
						finalize();
						return;
					case 'manual':
						// node-fetch-specific step: make manual redirect a bit easier to use by setting the Location header value to the resolved URL.
						if (locationURL !== null) {
							headers.set('Location', locationURL);
						}
						break;
					case 'follow':
						// HTTP-redirect fetch step 2
						if (locationURL === null) {
							break;
						}

						// HTTP-redirect fetch step 5
						if (request.counter >= request.follow) {
							reject(new FetchError(`maximum redirect reached at: ${request.url}`, 'max-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 6 (counter increment)
						// Create a new Request object.
						const requestOpts = {
							headers: new Headers(request.headers),
							follow: request.follow,
							counter: request.counter + 1,
							agent: request.agent,
							compress: request.compress,
							method: request.method,
							body: request.body
						};

						// HTTP-redirect fetch step 9
						if (res.statusCode !== 303 && request.body && getTotalBytes(request) === null) {
							reject(new FetchError('Cannot follow redirect with body being a readable stream', 'unsupported-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 11
						if (res.statusCode === 303 || (res.statusCode === 301 || res.statusCode === 302) && request.method === 'POST') {
							requestOpts.method = 'GET';
							requestOpts.body = undefined;
							requestOpts.headers.delete('content-length');
						}

						// HTTP-redirect fetch step 15
						resolve$$1(fetch(new Request(locationURL, requestOpts)));
						finalize();
						return;
				}
			}

			// prepare response
			let body = res.pipe(new Stream.PassThrough());
			const response_options = {
				url: request.url,
				status: res.statusCode,
				statusText: res.statusMessage,
				headers: headers,
				size: request.size,
				timeout: request.timeout
			};

			// HTTP-network fetch step 12.1.1.3
			const codings = headers.get('Content-Encoding');

			// HTTP-network fetch step 12.1.1.4: handle content codings

			// in following scenarios we ignore compression support
			// 1. compression support is disabled
			// 2. HEAD request
			// 3. no Content-Encoding header
			// 4. no content response (204)
			// 5. content not modified response (304)
			if (!request.compress || request.method === 'HEAD' || codings === null || res.statusCode === 204 || res.statusCode === 304) {
				resolve$$1(new Response(body, response_options));
				return;
			}

			// For Node v6+
			// Be less strict when decoding compressed responses, since sometimes
			// servers send slightly invalid responses that are still accepted
			// by common browsers.
			// Always using Z_SYNC_FLUSH is what cURL does.
			const zlibOptions = {
				flush: zlib.Z_SYNC_FLUSH,
				finishFlush: zlib.Z_SYNC_FLUSH
			};

			// for gzip
			if (codings == 'gzip' || codings == 'x-gzip') {
				body = body.pipe(zlib.createGunzip(zlibOptions));
				resolve$$1(new Response(body, response_options));
				return;
			}

			// for deflate
			if (codings == 'deflate' || codings == 'x-deflate') {
				// handle the infamous raw deflate response from old servers
				// a hack for old IIS and Apache servers
				const raw = res.pipe(new Stream.PassThrough());
				raw.once('data', function (chunk) {
					// see http://stackoverflow.com/questions/37519828
					if ((chunk[0] & 0x0F) === 0x08) {
						body = body.pipe(zlib.createInflate());
					} else {
						body = body.pipe(zlib.createInflateRaw());
					}
					resolve$$1(new Response(body, response_options));
				});
				return;
			}

			// otherwise, use response as-is
			resolve$$1(new Response(body, response_options));
		});

		writeToStream(req, request);
	});
}
/**
 * Redirect code matching
 *
 * @param   Number   code  Status code
 * @return  Boolean
 */
fetch.isRedirect = function (code) {
	return code === 301 || code === 302 || code === 303 || code === 307 || code === 308;
};

// expose Promise
fetch.Promise = global.Promise;

function get_page_handler(manifest$$1, store_getter) {
    const get_build_info = () => JSON.parse(fs.readFileSync(path.join(build_dir, 'build.json'), 'utf-8'));
    const template = () => read_template(src_dir);
    const has_service_worker = fs.existsSync(path.join(build_dir, 'service-worker.js'));
    const { server_routes, pages } = manifest$$1;
    const error_route = manifest$$1.error;
    function handle_error(req, res, statusCode, error) {
        handle_page({
            pattern: null,
            parts: [
                { name: null, component: error_route }
            ]
        }, req, res, statusCode, error || new Error('Unknown error in preload function'));
    }
    function handle_page(page, req, res, status = 200, error = null) {
        return __awaiter(this, void 0, void 0, function* () {
            const isSWIndexHtml = req.path === '/service-worker-index.html';
            const build_info = get_build_info();
            res.setHeader('Content-Type', 'text/html');
            res.setHeader('Cache-Control', 'no-cache');
            // preload main.js and current route
            // TODO detect other stuff we can preload? images, CSS, fonts?
            let preloaded_chunks = Array.isArray(build_info.assets.main) ? build_info.assets.main : [build_info.assets.main];
            if (!error && !isSWIndexHtml) {
                page.parts.forEach(part => {
                    if (!part)
                        return;
                    // using concat because it could be a string or an array. thanks webpack!
                    preloaded_chunks = preloaded_chunks.concat(build_info.assets[part.name]);
                });
            }
            if (build_info.bundler === 'rollup') {
                // TODO add dependencies and CSS
                const link = preloaded_chunks
                    .filter(file => file && !file.match(/\.map$/))
                    .map(file => `<${req.baseUrl}/client/${file}>;rel="modulepreload"`)
                    .join(', ');
                res.setHeader('Link', link);
            }
            else {
                const link = preloaded_chunks
                    .filter(file => file && !file.match(/\.map$/))
                    .map((file) => {
                    const as = /\.css$/.test(file) ? 'style' : 'script';
                    return `<${req.baseUrl}/client/${file}>;rel="preload";as="${as}"`;
                })
                    .join(', ');
                res.setHeader('Link', link);
            }
            const store = store_getter ? store_getter(req, res) : null;
            let redirect;
            let preload_error;
            const preload_context = {
                redirect: (statusCode, location) => {
                    if (redirect && (redirect.statusCode !== statusCode || redirect.location !== location)) {
                        throw new Error(`Conflicting redirects`);
                    }
                    location = location.replace(/^\//g, ''); // leading slash (only)
                    redirect = { statusCode, location };
                },
                error: (statusCode, message) => {
                    preload_error = { statusCode, message };
                },
                fetch: (url$1, opts) => {
                    const parsed = new url.URL(url$1, `http://127.0.0.1:${process.env.PORT}${req.baseUrl ? req.baseUrl + '/' : ''}`);
                    if (opts) {
                        opts = Object.assign({}, opts);
                        const include_cookies = (opts.credentials === 'include' ||
                            opts.credentials === 'same-origin' && parsed.origin === `http://127.0.0.1:${process.env.PORT}`);
                        if (include_cookies) {
                            opts.headers = Object.assign({}, opts.headers);
                            const cookies = Object.assign({}, cookie.parse(req.headers.cookie || ''), cookie.parse(opts.headers.cookie || ''));
                            const set_cookie = res.getHeader('Set-Cookie');
                            (Array.isArray(set_cookie) ? set_cookie : [set_cookie]).forEach(str => {
                                const match = /([^=]+)=([^;]+)/.exec(str);
                                if (match)
                                    cookies[match[1]] = match[2];
                            });
                            const str = Object.keys(cookies)
                                .map(key => `${key}=${cookies[key]}`)
                                .join('; ');
                            opts.headers.cookie = str;
                        }
                    }
                    return fetch(parsed.href, opts);
                },
                store
            };
            let preloaded;
            let match;
            try {
                const root_preloaded = manifest$$1.root.preload
                    ? manifest$$1.root.preload.call(preload_context, {
                        path: req.path,
                        query: req.query,
                        params: {}
                    })
                    : {};
                match = error ? null : page.pattern.exec(req.path);
                let toPreload = [root_preloaded];
                if (!isSWIndexHtml) {
                    toPreload = toPreload.concat(page.parts.map(part => {
                        if (!part)
                            return null;
                        return part.component.preload
                            ? part.component.preload.call(preload_context, {
                                path: req.path,
                                query: req.query,
                                params: part.params ? part.params(match) : {}
                            })
                            : {};
                    }));
                }
                preloaded = yield Promise.all(toPreload);
            }
            catch (err) {
                preload_error = { statusCode: 500, message: err };
                preloaded = []; // appease TypeScript
            }
            try {
                if (redirect) {
                    const location = url.resolve(req.baseUrl || '/', redirect.location);
                    res.statusCode = redirect.statusCode;
                    res.setHeader('Location', location);
                    res.end();
                    return;
                }
                if (preload_error) {
                    handle_error(req, res, preload_error.statusCode, preload_error.message);
                    return;
                }
                const serialized = {
                    preloaded: `[${preloaded.map(data => try_serialize(data)).join(',')}]`,
                    store: store && try_serialize(store.get())
                };
                const segments = req.path.split('/').filter(Boolean);
                const props = {
                    path: req.path,
                    query: req.query,
                    params: {},
                    child: null
                };
                if (error) {
                    props.error = error instanceof Error ? error : { message: error };
                    props.status = status;
                }
                const data = Object.assign({}, props, preloaded[0], {
                    params: {},
                    child: {
                        segment: segments[0]
                    }
                });
                let level = data.child;
                if (isSWIndexHtml) {
                    level.props = Object.assign({}, props, {
                        params: {}
                    });
                }
                else {
                    for (let i = 0; i < page.parts.length; i += 1) {
                        const part = page.parts[i];
                        if (!part)
                            continue;
                        const get_params = part.params || (() => ({}));
                        Object.assign(level, {
                            component: part.component,
                            props: Object.assign({}, props, {
                                params: get_params(match)
                            }, preloaded[i + 1])
                        });
                        level.props.child = {
                            segment: segments[i + 1]
                        };
                        level = level.props.child;
                    }
                }
                const { html, head, css } = manifest$$1.root.render(data, {
                    store
                });
                let script = `__SAPPER__={${[
                    error && `error:1`,
                    `baseUrl:"${req.baseUrl}"`,
                    serialized.preloaded && `preloaded:${serialized.preloaded}`,
                    serialized.store && `store:${serialized.store}`
                ].filter(Boolean).join(',')}};`;
                if (has_service_worker) {
                    script += `if('serviceWorker' in navigator)navigator.serviceWorker.register('${req.baseUrl}/service-worker.js');`;
                }
                const file = [].concat(build_info.assets.main).filter(file => file && /\.js$/.test(file))[0];
                const main = `${req.baseUrl}/client/${file}`;
                if (build_info.bundler === 'rollup') {
                    if (build_info.legacy_assets) {
                        const legacy_main = `${req.baseUrl}/client/legacy/${build_info.legacy_assets.main}`;
                        script += `(function(){try{eval("async function x(){}");var main="${main}"}catch(e){main="${legacy_main}"};var s=document.createElement("script");try{new Function("if(0)import('')")();s.src=main;s.type="module";s.crossOrigin="use-credentials";}catch(e){s.src="${req.baseUrl}/client/shimport@${build_info.shimport}.js";s.setAttribute("data-main",main);}document.head.appendChild(s);}());`;
                    }
                    else {
                        script += `var s=document.createElement("script");try{new Function("if(0)import('')")();s.src="${main}";s.type="module";s.crossOrigin="use-credentials";}catch(e){s.src="${req.baseUrl}/client/shimport@${build_info.shimport}.js";s.setAttribute("data-main","${main}")}document.head.appendChild(s)`;
                    }
                }
                else {
                    script += `</script><script src="${main}">`;
                }
                let styles;
                // TODO make this consistent across apps
                // TODO embed build_info in placeholder.ts
                if (build_info.css && build_info.css.main) {
                    const css_chunks = new Set();
                    if (build_info.css.main)
                        css_chunks.add(build_info.css.main);
                    page.parts.forEach(part => {
                        if (!part)
                            return;
                        const css_chunks_for_part = build_info.css.chunks[part.file];
                        if (css_chunks_for_part) {
                            css_chunks_for_part.forEach(file => {
                                css_chunks.add(file);
                            });
                        }
                    });
                    styles = Array.from(css_chunks)
                        .map(href => `<link rel="stylesheet" href="client/${href}">`)
                        .join('');
                }
                else {
                    styles = (css && css.code ? `<style>${css.code}</style>` : '');
                }
                // users can set a CSP nonce using res.locals.nonce
                const nonce_attr = (res.locals && res.locals.nonce) ? ` nonce="${res.locals.nonce}"` : '';
                const body = template()
                    .replace('%sapper.base%', () => `<base href="${req.baseUrl}/">`)
                    .replace('%sapper.scripts%', () => `<script${nonce_attr}>${script}</script>`)
                    .replace('%sapper.html%', () => html)
                    .replace('%sapper.head%', () => `<noscript id='sapper-head-start'></noscript>${head}<noscript id='sapper-head-end'></noscript>`)
                    .replace('%sapper.styles%', () => styles);
                res.statusCode = status;
                res.end(body);
            }
            catch (err) {
                if (error) {
                    // we encountered an error while rendering the error page — oops
                    res.statusCode = 500;
                    res.end(`<pre>${escape_html(err.message)}</pre>`);
                }
                else {
                    handle_error(req, res, 500, err);
                }
            }
        });
    }
    return function find_route(req, res, next) {
        if (req[IGNORE])
            return next();
        if (req.path === '/service-worker-index.html') {
            const homePage = pages.find(page => page.pattern.test('/'));
            handle_page(homePage, req, res);
            return;
        }
        if (!server_routes.some(route => route.pattern.test(req.path))) {
            for (const page of pages) {
                if (page.pattern.test(req.path)) {
                    handle_page(page, req, res);
                    return;
                }
            }
        }
        handle_error(req, res, 404, 'Not found');
    };
}
function read_template(dir = build_dir) {
    return fs.readFileSync(`${dir}/template.html`, 'utf-8');
}
function try_serialize(data) {
    try {
        return devalue(data);
    }
    catch (err) {
        return null;
    }
}
function escape_html(html) {
    const chars = {
        '"': 'quot',
        "'": '#39',
        '&': 'amp',
        '<': 'lt',
        '>': 'gt'
    };
    return html.replace(/["'&<>]/g, c => `&${chars[c]};`);
}

var mime_raw = "application/andrew-inset\t\t\tez\napplication/applixware\t\t\t\taw\napplication/atom+xml\t\t\t\tatom\napplication/atomcat+xml\t\t\t\tatomcat\napplication/atomsvc+xml\t\t\t\tatomsvc\napplication/ccxml+xml\t\t\t\tccxml\napplication/cdmi-capability\t\t\tcdmia\napplication/cdmi-container\t\t\tcdmic\napplication/cdmi-domain\t\t\t\tcdmid\napplication/cdmi-object\t\t\t\tcdmio\napplication/cdmi-queue\t\t\t\tcdmiq\napplication/cu-seeme\t\t\t\tcu\napplication/davmount+xml\t\t\tdavmount\napplication/docbook+xml\t\t\t\tdbk\napplication/dssc+der\t\t\t\tdssc\napplication/dssc+xml\t\t\t\txdssc\napplication/ecmascript\t\t\t\tecma\napplication/emma+xml\t\t\t\temma\napplication/epub+zip\t\t\t\tepub\napplication/exi\t\t\t\t\texi\napplication/font-tdpfr\t\t\t\tpfr\napplication/gml+xml\t\t\t\tgml\napplication/gpx+xml\t\t\t\tgpx\napplication/gxf\t\t\t\t\tgxf\napplication/hyperstudio\t\t\t\tstk\napplication/inkml+xml\t\t\t\tink inkml\napplication/ipfix\t\t\t\tipfix\napplication/java-archive\t\t\tjar\napplication/java-serialized-object\t\tser\napplication/java-vm\t\t\t\tclass\napplication/javascript\t\t\t\tjs\napplication/json\t\t\t\tjson map\napplication/jsonml+json\t\t\t\tjsonml\napplication/lost+xml\t\t\t\tlostxml\napplication/mac-binhex40\t\t\thqx\napplication/mac-compactpro\t\t\tcpt\napplication/mads+xml\t\t\t\tmads\napplication/marc\t\t\t\tmrc\napplication/marcxml+xml\t\t\t\tmrcx\napplication/mathematica\t\t\t\tma nb mb\napplication/mathml+xml\t\t\t\tmathml\napplication/mbox\t\t\t\tmbox\napplication/mediaservercontrol+xml\t\tmscml\napplication/metalink+xml\t\t\tmetalink\napplication/metalink4+xml\t\t\tmeta4\napplication/mets+xml\t\t\t\tmets\napplication/mods+xml\t\t\t\tmods\napplication/mp21\t\t\t\tm21 mp21\napplication/mp4\t\t\t\t\tmp4s\napplication/msword\t\t\t\tdoc dot\napplication/mxf\t\t\t\t\tmxf\napplication/octet-stream\tbin dms lrf mar so dist distz pkg bpk dump elc deploy\napplication/oda\t\t\t\t\toda\napplication/oebps-package+xml\t\t\topf\napplication/ogg\t\t\t\t\togx\napplication/omdoc+xml\t\t\t\tomdoc\napplication/onenote\t\t\t\tonetoc onetoc2 onetmp onepkg\napplication/oxps\t\t\t\toxps\napplication/patch-ops-error+xml\t\t\txer\napplication/pdf\t\t\t\t\tpdf\napplication/pgp-encrypted\t\t\tpgp\napplication/pgp-signature\t\t\tasc sig\napplication/pics-rules\t\t\t\tprf\napplication/pkcs10\t\t\t\tp10\napplication/pkcs7-mime\t\t\t\tp7m p7c\napplication/pkcs7-signature\t\t\tp7s\napplication/pkcs8\t\t\t\tp8\napplication/pkix-attr-cert\t\t\tac\napplication/pkix-cert\t\t\t\tcer\napplication/pkix-crl\t\t\t\tcrl\napplication/pkix-pkipath\t\t\tpkipath\napplication/pkixcmp\t\t\t\tpki\napplication/pls+xml\t\t\t\tpls\napplication/postscript\t\t\t\tai eps ps\napplication/prs.cww\t\t\t\tcww\napplication/pskc+xml\t\t\t\tpskcxml\napplication/rdf+xml\t\t\t\trdf\napplication/reginfo+xml\t\t\t\trif\napplication/relax-ng-compact-syntax\t\trnc\napplication/resource-lists+xml\t\t\trl\napplication/resource-lists-diff+xml\t\trld\napplication/rls-services+xml\t\t\trs\napplication/rpki-ghostbusters\t\t\tgbr\napplication/rpki-manifest\t\t\tmft\napplication/rpki-roa\t\t\t\troa\napplication/rsd+xml\t\t\t\trsd\napplication/rss+xml\t\t\t\trss\napplication/rtf\t\t\t\t\trtf\napplication/sbml+xml\t\t\t\tsbml\napplication/scvp-cv-request\t\t\tscq\napplication/scvp-cv-response\t\t\tscs\napplication/scvp-vp-request\t\t\tspq\napplication/scvp-vp-response\t\t\tspp\napplication/sdp\t\t\t\t\tsdp\napplication/set-payment-initiation\t\tsetpay\napplication/set-registration-initiation\t\tsetreg\napplication/shf+xml\t\t\t\tshf\napplication/smil+xml\t\t\t\tsmi smil\napplication/sparql-query\t\t\trq\napplication/sparql-results+xml\t\t\tsrx\napplication/srgs\t\t\t\tgram\napplication/srgs+xml\t\t\t\tgrxml\napplication/sru+xml\t\t\t\tsru\napplication/ssdl+xml\t\t\t\tssdl\napplication/ssml+xml\t\t\t\tssml\napplication/tei+xml\t\t\t\ttei teicorpus\napplication/thraud+xml\t\t\t\ttfi\napplication/timestamped-data\t\t\ttsd\napplication/vnd.3gpp.pic-bw-large\t\tplb\napplication/vnd.3gpp.pic-bw-small\t\tpsb\napplication/vnd.3gpp.pic-bw-var\t\t\tpvb\napplication/vnd.3gpp2.tcap\t\t\ttcap\napplication/vnd.3m.post-it-notes\t\tpwn\napplication/vnd.accpac.simply.aso\t\taso\napplication/vnd.accpac.simply.imp\t\timp\napplication/vnd.acucobol\t\t\tacu\napplication/vnd.acucorp\t\t\t\tatc acutc\napplication/vnd.adobe.air-application-installer-package+zip\tair\napplication/vnd.adobe.formscentral.fcdt\t\tfcdt\napplication/vnd.adobe.fxp\t\t\tfxp fxpl\napplication/vnd.adobe.xdp+xml\t\t\txdp\napplication/vnd.adobe.xfdf\t\t\txfdf\napplication/vnd.ahead.space\t\t\tahead\napplication/vnd.airzip.filesecure.azf\t\tazf\napplication/vnd.airzip.filesecure.azs\t\tazs\napplication/vnd.amazon.ebook\t\t\tazw\napplication/vnd.americandynamics.acc\t\tacc\napplication/vnd.amiga.ami\t\t\tami\napplication/vnd.android.package-archive\t\tapk\napplication/vnd.anser-web-certificate-issue-initiation\tcii\napplication/vnd.anser-web-funds-transfer-initiation\tfti\napplication/vnd.antix.game-component\t\tatx\napplication/vnd.apple.installer+xml\t\tmpkg\napplication/vnd.apple.mpegurl\t\t\tm3u8\napplication/vnd.aristanetworks.swi\t\tswi\napplication/vnd.astraea-software.iota\t\tiota\napplication/vnd.audiograph\t\t\taep\napplication/vnd.blueice.multipass\t\tmpm\napplication/vnd.bmi\t\t\t\tbmi\napplication/vnd.businessobjects\t\t\trep\napplication/vnd.chemdraw+xml\t\t\tcdxml\napplication/vnd.chipnuts.karaoke-mmd\t\tmmd\napplication/vnd.cinderella\t\t\tcdy\napplication/vnd.claymore\t\t\tcla\napplication/vnd.cloanto.rp9\t\t\trp9\napplication/vnd.clonk.c4group\t\t\tc4g c4d c4f c4p c4u\napplication/vnd.cluetrust.cartomobile-config\t\tc11amc\napplication/vnd.cluetrust.cartomobile-config-pkg\tc11amz\napplication/vnd.commonspace\t\t\tcsp\napplication/vnd.contact.cmsg\t\t\tcdbcmsg\napplication/vnd.cosmocaller\t\t\tcmc\napplication/vnd.crick.clicker\t\t\tclkx\napplication/vnd.crick.clicker.keyboard\t\tclkk\napplication/vnd.crick.clicker.palette\t\tclkp\napplication/vnd.crick.clicker.template\t\tclkt\napplication/vnd.crick.clicker.wordbank\t\tclkw\napplication/vnd.criticaltools.wbs+xml\t\twbs\napplication/vnd.ctc-posml\t\t\tpml\napplication/vnd.cups-ppd\t\t\tppd\napplication/vnd.curl.car\t\t\tcar\napplication/vnd.curl.pcurl\t\t\tpcurl\napplication/vnd.dart\t\t\t\tdart\napplication/vnd.data-vision.rdz\t\t\trdz\napplication/vnd.dece.data\t\t\tuvf uvvf uvd uvvd\napplication/vnd.dece.ttml+xml\t\t\tuvt uvvt\napplication/vnd.dece.unspecified\t\tuvx uvvx\napplication/vnd.dece.zip\t\t\tuvz uvvz\napplication/vnd.denovo.fcselayout-link\t\tfe_launch\napplication/vnd.dna\t\t\t\tdna\napplication/vnd.dolby.mlp\t\t\tmlp\napplication/vnd.dpgraph\t\t\t\tdpg\napplication/vnd.dreamfactory\t\t\tdfac\napplication/vnd.ds-keypoint\t\t\tkpxx\napplication/vnd.dvb.ait\t\t\t\tait\napplication/vnd.dvb.service\t\t\tsvc\napplication/vnd.dynageo\t\t\t\tgeo\napplication/vnd.ecowin.chart\t\t\tmag\napplication/vnd.enliven\t\t\t\tnml\napplication/vnd.epson.esf\t\t\tesf\napplication/vnd.epson.msf\t\t\tmsf\napplication/vnd.epson.quickanime\t\tqam\napplication/vnd.epson.salt\t\t\tslt\napplication/vnd.epson.ssf\t\t\tssf\napplication/vnd.eszigno3+xml\t\t\tes3 et3\napplication/vnd.ezpix-album\t\t\tez2\napplication/vnd.ezpix-package\t\t\tez3\napplication/vnd.fdf\t\t\t\tfdf\napplication/vnd.fdsn.mseed\t\t\tmseed\napplication/vnd.fdsn.seed\t\t\tseed dataless\napplication/vnd.flographit\t\t\tgph\napplication/vnd.fluxtime.clip\t\t\tftc\napplication/vnd.framemaker\t\t\tfm frame maker book\napplication/vnd.frogans.fnc\t\t\tfnc\napplication/vnd.frogans.ltf\t\t\tltf\napplication/vnd.fsc.weblaunch\t\t\tfsc\napplication/vnd.fujitsu.oasys\t\t\toas\napplication/vnd.fujitsu.oasys2\t\t\toa2\napplication/vnd.fujitsu.oasys3\t\t\toa3\napplication/vnd.fujitsu.oasysgp\t\t\tfg5\napplication/vnd.fujitsu.oasysprs\t\tbh2\napplication/vnd.fujixerox.ddd\t\t\tddd\napplication/vnd.fujixerox.docuworks\t\txdw\napplication/vnd.fujixerox.docuworks.binder\txbd\napplication/vnd.fuzzysheet\t\t\tfzs\napplication/vnd.genomatix.tuxedo\t\ttxd\napplication/vnd.geogebra.file\t\t\tggb\napplication/vnd.geogebra.tool\t\t\tggt\napplication/vnd.geometry-explorer\t\tgex gre\napplication/vnd.geonext\t\t\t\tgxt\napplication/vnd.geoplan\t\t\t\tg2w\napplication/vnd.geospace\t\t\tg3w\napplication/vnd.gmx\t\t\t\tgmx\napplication/vnd.google-earth.kml+xml\t\tkml\napplication/vnd.google-earth.kmz\t\tkmz\napplication/vnd.grafeq\t\t\t\tgqf gqs\napplication/vnd.groove-account\t\t\tgac\napplication/vnd.groove-help\t\t\tghf\napplication/vnd.groove-identity-message\t\tgim\napplication/vnd.groove-injector\t\t\tgrv\napplication/vnd.groove-tool-message\t\tgtm\napplication/vnd.groove-tool-template\t\ttpl\napplication/vnd.groove-vcard\t\t\tvcg\napplication/vnd.hal+xml\t\t\t\thal\napplication/vnd.handheld-entertainment+xml\tzmm\napplication/vnd.hbci\t\t\t\thbci\napplication/vnd.hhe.lesson-player\t\tles\napplication/vnd.hp-hpgl\t\t\t\thpgl\napplication/vnd.hp-hpid\t\t\t\thpid\napplication/vnd.hp-hps\t\t\t\thps\napplication/vnd.hp-jlyt\t\t\t\tjlt\napplication/vnd.hp-pcl\t\t\t\tpcl\napplication/vnd.hp-pclxl\t\t\tpclxl\napplication/vnd.hydrostatix.sof-data\t\tsfd-hdstx\napplication/vnd.ibm.minipay\t\t\tmpy\napplication/vnd.ibm.modcap\t\t\tafp listafp list3820\napplication/vnd.ibm.rights-management\t\tirm\napplication/vnd.ibm.secure-container\t\tsc\napplication/vnd.iccprofile\t\t\ticc icm\napplication/vnd.igloader\t\t\tigl\napplication/vnd.immervision-ivp\t\t\tivp\napplication/vnd.immervision-ivu\t\t\tivu\napplication/vnd.insors.igm\t\t\tigm\napplication/vnd.intercon.formnet\t\txpw xpx\napplication/vnd.intergeo\t\t\ti2g\napplication/vnd.intu.qbo\t\t\tqbo\napplication/vnd.intu.qfx\t\t\tqfx\napplication/vnd.ipunplugged.rcprofile\t\trcprofile\napplication/vnd.irepository.package+xml\t\tirp\napplication/vnd.is-xpr\t\t\t\txpr\napplication/vnd.isac.fcs\t\t\tfcs\napplication/vnd.jam\t\t\t\tjam\napplication/vnd.jcp.javame.midlet-rms\t\trms\napplication/vnd.jisp\t\t\t\tjisp\napplication/vnd.joost.joda-archive\t\tjoda\napplication/vnd.kahootz\t\t\t\tktz ktr\napplication/vnd.kde.karbon\t\t\tkarbon\napplication/vnd.kde.kchart\t\t\tchrt\napplication/vnd.kde.kformula\t\t\tkfo\napplication/vnd.kde.kivio\t\t\tflw\napplication/vnd.kde.kontour\t\t\tkon\napplication/vnd.kde.kpresenter\t\t\tkpr kpt\napplication/vnd.kde.kspread\t\t\tksp\napplication/vnd.kde.kword\t\t\tkwd kwt\napplication/vnd.kenameaapp\t\t\thtke\napplication/vnd.kidspiration\t\t\tkia\napplication/vnd.kinar\t\t\t\tkne knp\napplication/vnd.koan\t\t\t\tskp skd skt skm\napplication/vnd.kodak-descriptor\t\tsse\napplication/vnd.las.las+xml\t\t\tlasxml\napplication/vnd.llamagraphics.life-balance.desktop\tlbd\napplication/vnd.llamagraphics.life-balance.exchange+xml\tlbe\napplication/vnd.lotus-1-2-3\t\t\t123\napplication/vnd.lotus-approach\t\t\tapr\napplication/vnd.lotus-freelance\t\t\tpre\napplication/vnd.lotus-notes\t\t\tnsf\napplication/vnd.lotus-organizer\t\t\torg\napplication/vnd.lotus-screencam\t\t\tscm\napplication/vnd.lotus-wordpro\t\t\tlwp\napplication/vnd.macports.portpkg\t\tportpkg\napplication/vnd.mcd\t\t\t\tmcd\napplication/vnd.medcalcdata\t\t\tmc1\napplication/vnd.mediastation.cdkey\t\tcdkey\napplication/vnd.mfer\t\t\t\tmwf\napplication/vnd.mfmp\t\t\t\tmfm\napplication/vnd.micrografx.flo\t\t\tflo\napplication/vnd.micrografx.igx\t\t\tigx\napplication/vnd.mif\t\t\t\tmif\napplication/vnd.mobius.daf\t\t\tdaf\napplication/vnd.mobius.dis\t\t\tdis\napplication/vnd.mobius.mbk\t\t\tmbk\napplication/vnd.mobius.mqy\t\t\tmqy\napplication/vnd.mobius.msl\t\t\tmsl\napplication/vnd.mobius.plc\t\t\tplc\napplication/vnd.mobius.txf\t\t\ttxf\napplication/vnd.mophun.application\t\tmpn\napplication/vnd.mophun.certificate\t\tmpc\napplication/vnd.mozilla.xul+xml\t\t\txul\napplication/vnd.ms-artgalry\t\t\tcil\napplication/vnd.ms-cab-compressed\t\tcab\napplication/vnd.ms-excel\t\t\txls xlm xla xlc xlt xlw\napplication/vnd.ms-excel.addin.macroenabled.12\t\txlam\napplication/vnd.ms-excel.sheet.binary.macroenabled.12\txlsb\napplication/vnd.ms-excel.sheet.macroenabled.12\t\txlsm\napplication/vnd.ms-excel.template.macroenabled.12\txltm\napplication/vnd.ms-fontobject\t\t\teot\napplication/vnd.ms-htmlhelp\t\t\tchm\napplication/vnd.ms-ims\t\t\t\tims\napplication/vnd.ms-lrm\t\t\t\tlrm\napplication/vnd.ms-officetheme\t\t\tthmx\napplication/vnd.ms-pki.seccat\t\t\tcat\napplication/vnd.ms-pki.stl\t\t\tstl\napplication/vnd.ms-powerpoint\t\t\tppt pps pot\napplication/vnd.ms-powerpoint.addin.macroenabled.12\t\tppam\napplication/vnd.ms-powerpoint.presentation.macroenabled.12\tpptm\napplication/vnd.ms-powerpoint.slide.macroenabled.12\t\tsldm\napplication/vnd.ms-powerpoint.slideshow.macroenabled.12\t\tppsm\napplication/vnd.ms-powerpoint.template.macroenabled.12\t\tpotm\napplication/vnd.ms-project\t\t\tmpp mpt\napplication/vnd.ms-word.document.macroenabled.12\tdocm\napplication/vnd.ms-word.template.macroenabled.12\tdotm\napplication/vnd.ms-works\t\t\twps wks wcm wdb\napplication/vnd.ms-wpl\t\t\t\twpl\napplication/vnd.ms-xpsdocument\t\t\txps\napplication/vnd.mseq\t\t\t\tmseq\napplication/vnd.musician\t\t\tmus\napplication/vnd.muvee.style\t\t\tmsty\napplication/vnd.mynfc\t\t\t\ttaglet\napplication/vnd.neurolanguage.nlu\t\tnlu\napplication/vnd.nitf\t\t\t\tntf nitf\napplication/vnd.noblenet-directory\t\tnnd\napplication/vnd.noblenet-sealer\t\t\tnns\napplication/vnd.noblenet-web\t\t\tnnw\napplication/vnd.nokia.n-gage.data\t\tngdat\napplication/vnd.nokia.n-gage.symbian.install\tn-gage\napplication/vnd.nokia.radio-preset\t\trpst\napplication/vnd.nokia.radio-presets\t\trpss\napplication/vnd.novadigm.edm\t\t\tedm\napplication/vnd.novadigm.edx\t\t\tedx\napplication/vnd.novadigm.ext\t\t\text\napplication/vnd.oasis.opendocument.chart\t\todc\napplication/vnd.oasis.opendocument.chart-template\totc\napplication/vnd.oasis.opendocument.database\t\todb\napplication/vnd.oasis.opendocument.formula\t\todf\napplication/vnd.oasis.opendocument.formula-template\todft\napplication/vnd.oasis.opendocument.graphics\t\todg\napplication/vnd.oasis.opendocument.graphics-template\totg\napplication/vnd.oasis.opendocument.image\t\todi\napplication/vnd.oasis.opendocument.image-template\toti\napplication/vnd.oasis.opendocument.presentation\t\todp\napplication/vnd.oasis.opendocument.presentation-template\totp\napplication/vnd.oasis.opendocument.spreadsheet\t\tods\napplication/vnd.oasis.opendocument.spreadsheet-template\tots\napplication/vnd.oasis.opendocument.text\t\t\todt\napplication/vnd.oasis.opendocument.text-master\t\todm\napplication/vnd.oasis.opendocument.text-template\tott\napplication/vnd.oasis.opendocument.text-web\t\toth\napplication/vnd.olpc-sugar\t\t\txo\napplication/vnd.oma.dd2+xml\t\t\tdd2\napplication/vnd.openofficeorg.extension\t\toxt\napplication/vnd.openxmlformats-officedocument.presentationml.presentation\tpptx\napplication/vnd.openxmlformats-officedocument.presentationml.slide\tsldx\napplication/vnd.openxmlformats-officedocument.presentationml.slideshow\tppsx\napplication/vnd.openxmlformats-officedocument.presentationml.template\tpotx\napplication/vnd.openxmlformats-officedocument.spreadsheetml.sheet\txlsx\napplication/vnd.openxmlformats-officedocument.spreadsheetml.template\txltx\napplication/vnd.openxmlformats-officedocument.wordprocessingml.document\tdocx\napplication/vnd.openxmlformats-officedocument.wordprocessingml.template\tdotx\napplication/vnd.osgeo.mapguide.package\t\tmgp\napplication/vnd.osgi.dp\t\t\t\tdp\napplication/vnd.osgi.subsystem\t\t\tesa\napplication/vnd.palm\t\t\t\tpdb pqa oprc\napplication/vnd.pawaafile\t\t\tpaw\napplication/vnd.pg.format\t\t\tstr\napplication/vnd.pg.osasli\t\t\tei6\napplication/vnd.picsel\t\t\t\tefif\napplication/vnd.pmi.widget\t\t\twg\napplication/vnd.pocketlearn\t\t\tplf\napplication/vnd.powerbuilder6\t\t\tpbd\napplication/vnd.previewsystems.box\t\tbox\napplication/vnd.proteus.magazine\t\tmgz\napplication/vnd.publishare-delta-tree\t\tqps\napplication/vnd.pvi.ptid1\t\t\tptid\napplication/vnd.quark.quarkxpress\t\tqxd qxt qwd qwt qxl qxb\napplication/vnd.realvnc.bed\t\t\tbed\napplication/vnd.recordare.musicxml\t\tmxl\napplication/vnd.recordare.musicxml+xml\t\tmusicxml\napplication/vnd.rig.cryptonote\t\t\tcryptonote\napplication/vnd.rim.cod\t\t\t\tcod\napplication/vnd.rn-realmedia\t\t\trm\napplication/vnd.rn-realmedia-vbr\t\trmvb\napplication/vnd.route66.link66+xml\t\tlink66\napplication/vnd.sailingtracker.track\t\tst\napplication/vnd.seemail\t\t\t\tsee\napplication/vnd.sema\t\t\t\tsema\napplication/vnd.semd\t\t\t\tsemd\napplication/vnd.semf\t\t\t\tsemf\napplication/vnd.shana.informed.formdata\t\tifm\napplication/vnd.shana.informed.formtemplate\titp\napplication/vnd.shana.informed.interchange\tiif\napplication/vnd.shana.informed.package\t\tipk\napplication/vnd.simtech-mindmapper\t\ttwd twds\napplication/vnd.smaf\t\t\t\tmmf\napplication/vnd.smart.teacher\t\t\tteacher\napplication/vnd.solent.sdkm+xml\t\t\tsdkm sdkd\napplication/vnd.spotfire.dxp\t\t\tdxp\napplication/vnd.spotfire.sfs\t\t\tsfs\napplication/vnd.stardivision.calc\t\tsdc\napplication/vnd.stardivision.draw\t\tsda\napplication/vnd.stardivision.impress\t\tsdd\napplication/vnd.stardivision.math\t\tsmf\napplication/vnd.stardivision.writer\t\tsdw vor\napplication/vnd.stardivision.writer-global\tsgl\napplication/vnd.stepmania.package\t\tsmzip\napplication/vnd.stepmania.stepchart\t\tsm\napplication/vnd.sun.xml.calc\t\t\tsxc\napplication/vnd.sun.xml.calc.template\t\tstc\napplication/vnd.sun.xml.draw\t\t\tsxd\napplication/vnd.sun.xml.draw.template\t\tstd\napplication/vnd.sun.xml.impress\t\t\tsxi\napplication/vnd.sun.xml.impress.template\tsti\napplication/vnd.sun.xml.math\t\t\tsxm\napplication/vnd.sun.xml.writer\t\t\tsxw\napplication/vnd.sun.xml.writer.global\t\tsxg\napplication/vnd.sun.xml.writer.template\t\tstw\napplication/vnd.sus-calendar\t\t\tsus susp\napplication/vnd.svd\t\t\t\tsvd\napplication/vnd.symbian.install\t\t\tsis sisx\napplication/vnd.syncml+xml\t\t\txsm\napplication/vnd.syncml.dm+wbxml\t\t\tbdm\napplication/vnd.syncml.dm+xml\t\t\txdm\napplication/vnd.tao.intent-module-archive\ttao\napplication/vnd.tcpdump.pcap\t\t\tpcap cap dmp\napplication/vnd.tmobile-livetv\t\t\ttmo\napplication/vnd.trid.tpt\t\t\ttpt\napplication/vnd.triscape.mxs\t\t\tmxs\napplication/vnd.trueapp\t\t\t\ttra\napplication/vnd.ufdl\t\t\t\tufd ufdl\napplication/vnd.uiq.theme\t\t\tutz\napplication/vnd.umajin\t\t\t\tumj\napplication/vnd.unity\t\t\t\tunityweb\napplication/vnd.uoml+xml\t\t\tuoml\napplication/vnd.vcx\t\t\t\tvcx\napplication/vnd.visio\t\t\t\tvsd vst vss vsw\napplication/vnd.visionary\t\t\tvis\napplication/vnd.vsf\t\t\t\tvsf\napplication/vnd.wap.wbxml\t\t\twbxml\napplication/vnd.wap.wmlc\t\t\twmlc\napplication/vnd.wap.wmlscriptc\t\t\twmlsc\napplication/vnd.webturbo\t\t\twtb\napplication/vnd.wolfram.player\t\t\tnbp\napplication/vnd.wordperfect\t\t\twpd\napplication/vnd.wqd\t\t\t\twqd\napplication/vnd.wt.stf\t\t\t\tstf\napplication/vnd.xara\t\t\t\txar\napplication/vnd.xfdl\t\t\t\txfdl\napplication/vnd.yamaha.hv-dic\t\t\thvd\napplication/vnd.yamaha.hv-script\t\thvs\napplication/vnd.yamaha.hv-voice\t\t\thvp\napplication/vnd.yamaha.openscoreformat\t\t\tosf\napplication/vnd.yamaha.openscoreformat.osfpvg+xml\tosfpvg\napplication/vnd.yamaha.smaf-audio\t\tsaf\napplication/vnd.yamaha.smaf-phrase\t\tspf\napplication/vnd.yellowriver-custom-menu\t\tcmp\napplication/vnd.zul\t\t\t\tzir zirz\napplication/vnd.zzazz.deck+xml\t\t\tzaz\napplication/voicexml+xml\t\t\tvxml\napplication/widget\t\t\t\twgt\napplication/winhlp\t\t\t\thlp\napplication/wsdl+xml\t\t\t\twsdl\napplication/wspolicy+xml\t\t\twspolicy\napplication/x-7z-compressed\t\t\t7z\napplication/x-abiword\t\t\t\tabw\napplication/x-ace-compressed\t\t\tace\napplication/x-apple-diskimage\t\t\tdmg\napplication/x-authorware-bin\t\t\taab x32 u32 vox\napplication/x-authorware-map\t\t\taam\napplication/x-authorware-seg\t\t\taas\napplication/x-bcpio\t\t\t\tbcpio\napplication/x-bittorrent\t\t\ttorrent\napplication/x-blorb\t\t\t\tblb blorb\napplication/x-bzip\t\t\t\tbz\napplication/x-bzip2\t\t\t\tbz2 boz\napplication/x-cbr\t\t\t\tcbr cba cbt cbz cb7\napplication/x-cdlink\t\t\t\tvcd\napplication/x-cfs-compressed\t\t\tcfs\napplication/x-chat\t\t\t\tchat\napplication/x-chess-pgn\t\t\t\tpgn\napplication/x-conference\t\t\tnsc\napplication/x-cpio\t\t\t\tcpio\napplication/x-csh\t\t\t\tcsh\napplication/x-debian-package\t\t\tdeb udeb\napplication/x-dgc-compressed\t\t\tdgc\napplication/x-director\t\t\tdir dcr dxr cst cct cxt w3d fgd swa\napplication/x-doom\t\t\t\twad\napplication/x-dtbncx+xml\t\t\tncx\napplication/x-dtbook+xml\t\t\tdtb\napplication/x-dtbresource+xml\t\t\tres\napplication/x-dvi\t\t\t\tdvi\napplication/x-envoy\t\t\t\tevy\napplication/x-eva\t\t\t\teva\napplication/x-font-bdf\t\t\t\tbdf\napplication/x-font-ghostscript\t\t\tgsf\napplication/x-font-linux-psf\t\t\tpsf\napplication/x-font-pcf\t\t\t\tpcf\napplication/x-font-snf\t\t\t\tsnf\napplication/x-font-type1\t\t\tpfa pfb pfm afm\napplication/x-freearc\t\t\t\tarc\napplication/x-futuresplash\t\t\tspl\napplication/x-gca-compressed\t\t\tgca\napplication/x-glulx\t\t\t\tulx\napplication/x-gnumeric\t\t\t\tgnumeric\napplication/x-gramps-xml\t\t\tgramps\napplication/x-gtar\t\t\t\tgtar\napplication/x-hdf\t\t\t\thdf\napplication/x-install-instructions\t\tinstall\napplication/x-iso9660-image\t\t\tiso\napplication/x-java-jnlp-file\t\t\tjnlp\napplication/x-latex\t\t\t\tlatex\napplication/x-lzh-compressed\t\t\tlzh lha\napplication/x-mie\t\t\t\tmie\napplication/x-mobipocket-ebook\t\t\tprc mobi\napplication/x-ms-application\t\t\tapplication\napplication/x-ms-shortcut\t\t\tlnk\napplication/x-ms-wmd\t\t\t\twmd\napplication/x-ms-wmz\t\t\t\twmz\napplication/x-ms-xbap\t\t\t\txbap\napplication/x-msaccess\t\t\t\tmdb\napplication/x-msbinder\t\t\t\tobd\napplication/x-mscardfile\t\t\tcrd\napplication/x-msclip\t\t\t\tclp\napplication/x-msdownload\t\t\texe dll com bat msi\napplication/x-msmediaview\t\t\tmvb m13 m14\napplication/x-msmetafile\t\t\twmf wmz emf emz\napplication/x-msmoney\t\t\t\tmny\napplication/x-mspublisher\t\t\tpub\napplication/x-msschedule\t\t\tscd\napplication/x-msterminal\t\t\ttrm\napplication/x-mswrite\t\t\t\twri\napplication/x-netcdf\t\t\t\tnc cdf\napplication/x-nzb\t\t\t\tnzb\napplication/x-pkcs12\t\t\t\tp12 pfx\napplication/x-pkcs7-certificates\t\tp7b spc\napplication/x-pkcs7-certreqresp\t\t\tp7r\napplication/x-rar-compressed\t\t\trar\napplication/x-research-info-systems\t\tris\napplication/x-sh\t\t\t\tsh\napplication/x-shar\t\t\t\tshar\napplication/x-shockwave-flash\t\t\tswf\napplication/x-silverlight-app\t\t\txap\napplication/x-sql\t\t\t\tsql\napplication/x-stuffit\t\t\t\tsit\napplication/x-stuffitx\t\t\t\tsitx\napplication/x-subrip\t\t\t\tsrt\napplication/x-sv4cpio\t\t\t\tsv4cpio\napplication/x-sv4crc\t\t\t\tsv4crc\napplication/x-t3vm-image\t\t\tt3\napplication/x-tads\t\t\t\tgam\napplication/x-tar\t\t\t\ttar\napplication/x-tcl\t\t\t\ttcl\napplication/x-tex\t\t\t\ttex\napplication/x-tex-tfm\t\t\t\ttfm\napplication/x-texinfo\t\t\t\ttexinfo texi\napplication/x-tgif\t\t\t\tobj\napplication/x-ustar\t\t\t\tustar\napplication/x-wais-source\t\t\tsrc\napplication/x-x509-ca-cert\t\t\tder crt\napplication/x-xfig\t\t\t\tfig\napplication/x-xliff+xml\t\t\t\txlf\napplication/x-xpinstall\t\t\t\txpi\napplication/x-xz\t\t\t\txz\napplication/x-zmachine\t\t\t\tz1 z2 z3 z4 z5 z6 z7 z8\napplication/xaml+xml\t\t\t\txaml\napplication/xcap-diff+xml\t\t\txdf\napplication/xenc+xml\t\t\t\txenc\napplication/xhtml+xml\t\t\t\txhtml xht\napplication/xml\t\t\t\t\txml xsl\napplication/xml-dtd\t\t\t\tdtd\napplication/xop+xml\t\t\t\txop\napplication/xproc+xml\t\t\t\txpl\napplication/xslt+xml\t\t\t\txslt\napplication/xspf+xml\t\t\t\txspf\napplication/xv+xml\t\t\t\tmxml xhvml xvml xvm\napplication/yang\t\t\t\tyang\napplication/yin+xml\t\t\t\tyin\napplication/zip\t\t\t\t\tzip\naudio/adpcm\t\t\t\t\tadp\naudio/basic\t\t\t\t\tau snd\naudio/midi\t\t\t\t\tmid midi kar rmi\naudio/mp4\t\t\t\t\tm4a mp4a\naudio/mpeg\t\t\t\t\tmpga mp2 mp2a mp3 m2a m3a\naudio/ogg\t\t\t\t\toga ogg spx\naudio/s3m\t\t\t\t\ts3m\naudio/silk\t\t\t\t\tsil\naudio/vnd.dece.audio\t\t\t\tuva uvva\naudio/vnd.digital-winds\t\t\t\teol\naudio/vnd.dra\t\t\t\t\tdra\naudio/vnd.dts\t\t\t\t\tdts\naudio/vnd.dts.hd\t\t\t\tdtshd\naudio/vnd.lucent.voice\t\t\t\tlvp\naudio/vnd.ms-playready.media.pya\t\tpya\naudio/vnd.nuera.ecelp4800\t\t\tecelp4800\naudio/vnd.nuera.ecelp7470\t\t\tecelp7470\naudio/vnd.nuera.ecelp9600\t\t\tecelp9600\naudio/vnd.rip\t\t\t\t\trip\naudio/webm\t\t\t\t\tweba\naudio/x-aac\t\t\t\t\taac\naudio/x-aiff\t\t\t\t\taif aiff aifc\naudio/x-caf\t\t\t\t\tcaf\naudio/x-flac\t\t\t\t\tflac\naudio/x-matroska\t\t\t\tmka\naudio/x-mpegurl\t\t\t\t\tm3u\naudio/x-ms-wax\t\t\t\t\twax\naudio/x-ms-wma\t\t\t\t\twma\naudio/x-pn-realaudio\t\t\t\tram ra\naudio/x-pn-realaudio-plugin\t\t\trmp\naudio/x-wav\t\t\t\t\twav\naudio/xm\t\t\t\t\txm\nchemical/x-cdx\t\t\t\t\tcdx\nchemical/x-cif\t\t\t\t\tcif\nchemical/x-cmdf\t\t\t\t\tcmdf\nchemical/x-cml\t\t\t\t\tcml\nchemical/x-csml\t\t\t\t\tcsml\nchemical/x-xyz\t\t\t\t\txyz\nfont/collection\t\t\t\t\tttc\nfont/otf\t\t\t\t\totf\nfont/ttf\t\t\t\t\tttf\nfont/woff\t\t\t\t\twoff\nfont/woff2\t\t\t\t\twoff2\nimage/bmp\t\t\t\t\tbmp\nimage/cgm\t\t\t\t\tcgm\nimage/g3fax\t\t\t\t\tg3\nimage/gif\t\t\t\t\tgif\nimage/ief\t\t\t\t\tief\nimage/jpeg\t\t\t\t\tjpeg jpg jpe\nimage/ktx\t\t\t\t\tktx\nimage/png\t\t\t\t\tpng\nimage/prs.btif\t\t\t\t\tbtif\nimage/sgi\t\t\t\t\tsgi\nimage/svg+xml\t\t\t\t\tsvg svgz\nimage/tiff\t\t\t\t\ttiff tif\nimage/vnd.adobe.photoshop\t\t\tpsd\nimage/vnd.dece.graphic\t\t\t\tuvi uvvi uvg uvvg\nimage/vnd.djvu\t\t\t\t\tdjvu djv\nimage/vnd.dvb.subtitle\t\t\t\tsub\nimage/vnd.dwg\t\t\t\t\tdwg\nimage/vnd.dxf\t\t\t\t\tdxf\nimage/vnd.fastbidsheet\t\t\t\tfbs\nimage/vnd.fpx\t\t\t\t\tfpx\nimage/vnd.fst\t\t\t\t\tfst\nimage/vnd.fujixerox.edmics-mmr\t\t\tmmr\nimage/vnd.fujixerox.edmics-rlc\t\t\trlc\nimage/vnd.ms-modi\t\t\t\tmdi\nimage/vnd.ms-photo\t\t\t\twdp\nimage/vnd.net-fpx\t\t\t\tnpx\nimage/vnd.wap.wbmp\t\t\t\twbmp\nimage/vnd.xiff\t\t\t\t\txif\nimage/webp\t\t\t\t\twebp\nimage/x-3ds\t\t\t\t\t3ds\nimage/x-cmu-raster\t\t\t\tras\nimage/x-cmx\t\t\t\t\tcmx\nimage/x-freehand\t\t\t\tfh fhc fh4 fh5 fh7\nimage/x-icon\t\t\t\t\tico\nimage/x-mrsid-image\t\t\t\tsid\nimage/x-pcx\t\t\t\t\tpcx\nimage/x-pict\t\t\t\t\tpic pct\nimage/x-portable-anymap\t\t\t\tpnm\nimage/x-portable-bitmap\t\t\t\tpbm\nimage/x-portable-graymap\t\t\tpgm\nimage/x-portable-pixmap\t\t\t\tppm\nimage/x-rgb\t\t\t\t\trgb\nimage/x-tga\t\t\t\t\ttga\nimage/x-xbitmap\t\t\t\t\txbm\nimage/x-xpixmap\t\t\t\t\txpm\nimage/x-xwindowdump\t\t\t\txwd\nmessage/rfc822\t\t\t\t\teml mime\nmodel/iges\t\t\t\t\tigs iges\nmodel/mesh\t\t\t\t\tmsh mesh silo\nmodel/vnd.collada+xml\t\t\t\tdae\nmodel/vnd.dwf\t\t\t\t\tdwf\nmodel/vnd.gdl\t\t\t\t\tgdl\nmodel/vnd.gtw\t\t\t\t\tgtw\nmodel/vnd.mts\t\t\t\t\tmts\nmodel/vnd.vtu\t\t\t\t\tvtu\nmodel/vrml\t\t\t\t\twrl vrml\nmodel/x3d+binary\t\t\t\tx3db x3dbz\nmodel/x3d+vrml\t\t\t\t\tx3dv x3dvz\nmodel/x3d+xml\t\t\t\t\tx3d x3dz\ntext/cache-manifest\t\t\t\tappcache\ntext/calendar\t\t\t\t\tics ifb\ntext/css\t\t\t\t\tcss\ntext/csv\t\t\t\t\tcsv\ntext/html\t\t\t\t\thtml htm\ntext/n3\t\t\t\t\t\tn3\ntext/plain\t\t\t\t\ttxt text conf def list log in\ntext/prs.lines.tag\t\t\t\tdsc\ntext/richtext\t\t\t\t\trtx\ntext/sgml\t\t\t\t\tsgml sgm\ntext/tab-separated-values\t\t\ttsv\ntext/troff\t\t\t\t\tt tr roff man me ms\ntext/turtle\t\t\t\t\tttl\ntext/uri-list\t\t\t\t\turi uris urls\ntext/vcard\t\t\t\t\tvcard\ntext/vnd.curl\t\t\t\t\tcurl\ntext/vnd.curl.dcurl\t\t\t\tdcurl\ntext/vnd.curl.mcurl\t\t\t\tmcurl\ntext/vnd.curl.scurl\t\t\t\tscurl\ntext/vnd.dvb.subtitle\t\t\t\tsub\ntext/vnd.fly\t\t\t\t\tfly\ntext/vnd.fmi.flexstor\t\t\t\tflx\ntext/vnd.graphviz\t\t\t\tgv\ntext/vnd.in3d.3dml\t\t\t\t3dml\ntext/vnd.in3d.spot\t\t\t\tspot\ntext/vnd.sun.j2me.app-descriptor\t\tjad\ntext/vnd.wap.wml\t\t\t\twml\ntext/vnd.wap.wmlscript\t\t\t\twmls\ntext/x-asm\t\t\t\t\ts asm\ntext/x-c\t\t\t\t\tc cc cxx cpp h hh dic\ntext/x-fortran\t\t\t\t\tf for f77 f90\ntext/x-java-source\t\t\t\tjava\ntext/x-nfo\t\t\t\t\tnfo\ntext/x-opml\t\t\t\t\topml\ntext/x-pascal\t\t\t\t\tp pas\ntext/x-setext\t\t\t\t\tetx\ntext/x-sfv\t\t\t\t\tsfv\ntext/x-uuencode\t\t\t\t\tuu\ntext/x-vcalendar\t\t\t\tvcs\ntext/x-vcard\t\t\t\t\tvcf\nvideo/3gpp\t\t\t\t\t3gp\nvideo/3gpp2\t\t\t\t\t3g2\nvideo/h261\t\t\t\t\th261\nvideo/h263\t\t\t\t\th263\nvideo/h264\t\t\t\t\th264\nvideo/jpeg\t\t\t\t\tjpgv\nvideo/jpm\t\t\t\t\tjpm jpgm\nvideo/mj2\t\t\t\t\tmj2 mjp2\nvideo/mp4\t\t\t\t\tmp4 mp4v mpg4\nvideo/mpeg\t\t\t\t\tmpeg mpg mpe m1v m2v\nvideo/ogg\t\t\t\t\togv\nvideo/quicktime\t\t\t\t\tqt mov\nvideo/vnd.dece.hd\t\t\t\tuvh uvvh\nvideo/vnd.dece.mobile\t\t\t\tuvm uvvm\nvideo/vnd.dece.pd\t\t\t\tuvp uvvp\nvideo/vnd.dece.sd\t\t\t\tuvs uvvs\nvideo/vnd.dece.video\t\t\t\tuvv uvvv\nvideo/vnd.dvb.file\t\t\t\tdvb\nvideo/vnd.fvt\t\t\t\t\tfvt\nvideo/vnd.mpegurl\t\t\t\tmxu m4u\nvideo/vnd.ms-playready.media.pyv\t\tpyv\nvideo/vnd.uvvu.mp4\t\t\t\tuvu uvvu\nvideo/vnd.vivo\t\t\t\t\tviv\nvideo/webm\t\t\t\t\twebm\nvideo/x-f4v\t\t\t\t\tf4v\nvideo/x-fli\t\t\t\t\tfli\nvideo/x-flv\t\t\t\t\tflv\nvideo/x-m4v\t\t\t\t\tm4v\nvideo/x-matroska\t\t\t\tmkv mk3d mks\nvideo/x-mng\t\t\t\t\tmng\nvideo/x-ms-asf\t\t\t\t\tasf asx\nvideo/x-ms-vob\t\t\t\t\tvob\nvideo/x-ms-wm\t\t\t\t\twm\nvideo/x-ms-wmv\t\t\t\t\twmv\nvideo/x-ms-wmx\t\t\t\t\twmx\nvideo/x-ms-wvx\t\t\t\t\twvx\nvideo/x-msvideo\t\t\t\t\tavi\nvideo/x-sgi-movie\t\t\t\tmovie\nvideo/x-smv\t\t\t\t\tsmv\nx-conference/x-cooltalk\t\t\t\tice\n";

const map = new Map();
mime_raw.split('\n').forEach((row) => {
    const match = /(.+?)\t+(.+)/.exec(row);
    if (!match)
        return;
    const type = match[1];
    const extensions = match[2].split(' ');
    extensions.forEach(ext => {
        map.set(ext, type);
    });
});
function lookup(file) {
    const match = /\.([^\.]+)$/.exec(file);
    return match && map.get(match[1]);
}

function middleware(opts = {}) {
    const { store, ignore } = opts;
    let emitted_basepath = false;
    return compose_handlers([
        ignore && ((req, res, next) => {
            req[IGNORE] = should_ignore(req.path, ignore);
            next();
        }),
        (req, res, next) => {
            if (req[IGNORE])
                return next();
            if (req.baseUrl === undefined) {
                let { originalUrl } = req;
                if (req.url === '/' && originalUrl[originalUrl.length - 1] !== '/') {
                    originalUrl += '/';
                }
                req.baseUrl = originalUrl
                    ? originalUrl.slice(0, -req.url.length)
                    : '';
            }
            if (!emitted_basepath && process.send) {
                process.send({
                    __sapper__: true,
                    event: 'basepath',
                    basepath: req.baseUrl
                });
                emitted_basepath = true;
            }
            if (req.path === undefined) {
                req.path = req.url.replace(/\?.*/, '');
            }
            next();
        },
        fs.existsSync(path.join(build_dir, 'index.html')) && serve({
            pathname: '/index.html',
            cache_control: 'no-cache'
        }),
        fs.existsSync(path.join(build_dir, 'service-worker.js')) && serve({
            pathname: '/service-worker.js',
            cache_control: 'no-cache, no-store, must-revalidate'
        }),
        fs.existsSync(path.join(build_dir, 'service-worker.js.map')) && serve({
            pathname: '/service-worker.js.map',
            cache_control: 'no-cache, no-store, must-revalidate'
        }),
        serve({
            prefix: '/client/',
            cache_control: 'no-cache'
        }),
        get_server_route_handler(manifest.server_routes),
        get_page_handler(manifest, store)
    ].filter(Boolean));
}
function compose_handlers(handlers) {
    return (req, res, next) => {
        let i = 0;
        function go() {
            const handler = handlers[i];
            if (handler) {
                handler(req, res, () => {
                    i += 1;
                    go();
                });
            }
            else {
                next();
            }
        }
        go();
    };
}
function should_ignore(uri, val) {
    if (Array.isArray(val))
        return val.some(x => should_ignore(uri, x));
    if (val instanceof RegExp)
        return val.test(uri);
    if (typeof val === 'function')
        return val(uri);
    return uri.startsWith(val.charCodeAt(0) === 47 ? val : `/${val}`);
}
function serve({ prefix, pathname, cache_control }) {
    const filter = pathname
        ? (req) => req.path === pathname
        : (req) => req.path.startsWith(prefix);
    const read = (file) => fs.readFileSync(path.resolve(build_dir, file));
    return (req, res, next) => {
        if (req[IGNORE])
            return next();
        if (filter(req)) {
            const type = lookup(req.path);
            try {
                const file = decodeURIComponent(req.path.slice(1));
                const data = read(file);
                res.setHeader('Content-Type', type);
                res.setHeader('Cache-Control', cache_control);
                res.end(data);
            }
            catch (err) {
                res.statusCode = 404;
                res.end('not found');
            }
        }
        else {
            next();
        }
    };
}

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

polka() // You can also use Express
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		middleware()
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
