// Dados
let controle = {
  folha: 1,
  linha: 1
}

let hora = {
  atual: moment({ hour:8, minute:40 }),
  manha: {
    inicio: moment({ hour:8, minute:40 }),
       fim: moment({ hour:11, minute:15 })
  },
  tarde: {
    inicio: moment({ hour:14, minute:30 }),
       fim: moment({ hour:17, minute:00 })
  }
};

let icone = {
  vistoriado: "thumb_up",
  recuperado: "history",
  fechado: "no_meeting_room",
  recusado: "block"
}

let duracao = {
  vistoriado: 0,
  recuperado: 0,
  fechado: 0,
  recusado: 0
}

let inputVistoriado = document.querySelector("input#vistoriado");
let inputRecuperado = document.querySelector("input#recuperado");
let inputFechado = document.querySelector("input#fechado");
let inputRecusado = document.querySelector("input#recusado");

function atualizaDuracao(input) {
  let regExp = /^\d{2}:(\d{2})/;
  return Number(input.value.match(regExp)[1]);
}

duracao.vistoriado = atualizaDuracao(inputVistoriado);
inputVistoriado.addEventListener("input", function() {
  duracao.vistoriado = atualizaDuracao(inputVistoriado);
});

duracao.recuperado = atualizaDuracao(inputRecuperado);
inputRecuperado.addEventListener("input", function() {
  duracao.recuperado = atualizaDuracao(inputRecuperado);
});

duracao.fechado = atualizaDuracao(inputFechado);
inputFechado.addEventListener("input", function() {
  duracao.fechado = atualizaDuracao(inputFechado);
});

duracao.recusado = atualizaDuracao(inputRecusado);
inputRecusado.addEventListener("input", function() {
  duracao.recusado = atualizaDuracao(inputRecusado);
});



let visitas = [];

let tabela = document.querySelector("tbody");

let botaoVistoriado = document.querySelector("button#vistoriado");
botaoVistoriado.onclick = function() {
  novaVisita("vistoriado");
  display();
};

let botaoRecuperado = document.querySelector("button#recuperado");
botaoRecuperado.onclick = function() {
  novaVisita("recuperado");
  display();
};

let botaoFechado = document.querySelector("button#fechado");
botaoFechado.onclick = function() {
  novaVisita("fechado");
  display();
};

let botaoRecusado = document.querySelector("button#recusado");
botaoRecusado.onclick = function() {
  novaVisita("recusado");
  display();
};

let painel = document.querySelector("div#painel");
let botaoConfig = document.querySelector("button#config");
painel.style.display = 'none';
botaoConfig.onclick = function() {
  if (painel.style.display === 'none') {
    painel.style.display = 'block';
  } else {
    painel.style.display = 'none';
  }
};

function novaVisita(tipo) {
  visitas.push({ id: `${controle.folha}.${controle.linha}`, folha: controle.folha, linha: controle.linha, tipo: tipo, icone: icone[`${tipo}`], hora: hora.atual.clone() });
  if (controle.linha < 20) {
    controle.linha += 1;
  } else {
    controle.folha += 1;
    controle.linha = 1;
  }
  
  hora.atual.add(duracao[`${tipo}`], "minutes").format("HH:mm");
  if (hora.atual >= hora.manha.fim && hora.atual < hora.tarde.inicio) {
    hora.atual = hora.tarde.inicio.clone();
  }
}


function criaHeader() {
  let tr = document.createElement("tr");
  let id = document.createElement("th");
  id.textContent = "ID";
  tr.appendChild(id);
  
  let tipo = document.createElement("th");
  tipo.textContent = "Tipo";
  tr.appendChild(tipo);
  
  let hora = document.createElement("th");
  hora.textContent = "Hora";
  tr.appendChild(hora);
  
  return tr;
}


function display() {
  tabela.innerHTML = '';
  
  let tableHeader = criaHeader();
  tabela.appendChild(tableHeader);
  
  visitas.forEach(function(linha) {
    let tr = document.createElement("tr");
    tr.setAttribute("id", linha.id);
    
    // ID
    let tdID = document.createElement("td");
    tdID.textContent = linha.id;
    tr.appendChild(tdID);
    
    // TIPO
    let tdTipo = document.createElement("td");
    let span = document.createElement("span");
    span.classList.add('material-icons');
    span.textContent = linha.icone;
    tdTipo.appendChild(span);
    tr.appendChild(tdTipo);
    
    // HORA
    let tdHora = document.createElement("td");
    tdHora.textContent = linha.hora.format("HH:mm");
    tr.appendChild(tdHora);
   
    tabela.appendChild(tr); 
  });
}



let botaoAtualizar = document.querySelector("button#atualizar");

botaoAtualizar.onclick = function() {
  visitas.forEach(function(linha) {
    if (linha.id === "1.1") {
      hora.atual = hora.manha.inicio.clone();
      linha.hora = hora.atual.clone();
    }
    linha.hora = hora.atual.clone();
    hora.atual.add(duracao[`${linha.tipo}`], "minutes").format("HH:mm");
    if (hora.atual >= hora.manha.fim && hora.atual < hora.tarde.inicio) {
      hora.atual = hora.tarde.inicio.clone();
    }
    display();
  }
)};