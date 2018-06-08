var moment = require('moment');


// Painel: Configurações <|> Conteúdo
let configurar = document.querySelector("div#configurar") as HTMLDivElement;
let conteudo = document.querySelector("div#conteudo") as HTMLDivElement;
let botaoConfig = document.querySelector("button#config");

configurar.style.display = 'none';

botaoConfig.addEventListener('click', function () {
  if (configurar.style.display === 'none') {
    configurar.style.display = 'block';
    conteudo.style.display = 'none';
  } else {
    configurar.style.display = 'none';
    conteudo.style.display = 'block';
  }
});


// App

let controle = {
  folha: 1,
  linha: 1
}

let hora = {
  atual: null,
  total: 0,
  manha: {
      ativo: true,
     inicio: null,
        fim: null,
    duracao: 0
  },
  tarde: {
      ativo: true,
     inicio: null,
        fim: null,
    duracao: 0
  }
};


let duracao = {
  vistoriado: 14,
  recuperado: 16,
     fechado: 2,
    recusado: 3
}


let icone = {
  vistoriado: "thumb_up",
  recuperado: "history",
     fechado: "no_meeting_room",
    recusado: "block"
}

function parseHora(input) {
  let regExp = /^(\d{2}):(\d{2})/;
  return moment({
      hour: Number(input.value.match(regExp)[1]),
    minute: Number(input.value.match(regExp)[2])
  });
}


// Inputs de Horários
let inputInicioManha = document.querySelector("input#inicio-manha");
inputInicioManha.addEventListener("change", function() { atualizaHora(); });

let inputFimManha = document.querySelector("input#fim-manha");
inputFimManha.addEventListener("change", function() { atualizaHora(); });


let inputInicioTarde = document.querySelector("input#inicio-tarde");
inputInicioTarde.addEventListener("change", function() { atualizaHora(); });

let inputFimTarde = document.querySelector("input#fim-tarde");
inputFimTarde.addEventListener("change", function() { atualizaHora(); });



function atualizaHora() {
  if (hora.manha.ativo) {
    hora.manha.inicio = parseHora(inputInicioManha);
    hora.manha.fim = parseHora(inputFimManha);
    hora.manha.duracao = hora.manha.fim.diff(hora.manha.inicio, "minutes");
  } else {
    hora.manha.duracao = 0;
  }

  if (hora.tarde.ativo) {
    hora.tarde.inicio = parseHora(inputInicioTarde);
    hora.tarde.fim = parseHora(inputFimTarde);
    hora.tarde.duracao = hora.tarde.fim.diff(hora.tarde.inicio, "minutes");
  } else {
    hora.tarde.duracao = 0;
  }

  // Calcula total
  if (hora.manha.ativo && hora.tarde.ativo) {
    hora.total = hora.manha.duracao + hora.tarde.duracao;
    hora.atual = hora.manha.inicio.clone();
  } else if (hora.manha.ativo && !hora.tarde.ativo) {
    hora.total = hora.manha.duracao;
    hora.atual = hora.manha.inicio.clone();
  } else if (!hora.manha.ativo && hora.tarde.ativo) {
    hora.total = hora.tarde.duracao;
    hora.atual = hora.tarde.inicio.clone();
  } else {
    hora.total = 0;
    hora.atual = null;
  }
}


let checkboxManha = document.querySelector("input#manha") as HTMLInputElement;
checkboxManha.checked = true;
checkboxManha.addEventListener("change", function() {
  hora.manha.ativo = checkboxManha.checked;
  atualizaHora();
});

let checkboxTarde = document.querySelector("input#tarde") as HTMLInputElement;
checkboxTarde.checked = true;
checkboxTarde.addEventListener("change", function() {
  hora.tarde.ativo = checkboxTarde.checked;
  atualizaHora();
});




// Refatorar
let visitas = [];

let tabela = document.querySelector("#lista");

let visitado = {
  vistoriado: 0,
  recuperado: 0,
     fechado: 0,
    recusado: 0
};

let botaoVistoriado = document.querySelector("button#vistoriado");
botaoVistoriado.addEventListener("click", function() {
  visitado.vistoriado += 1;
  novaVisita("vistoriado");
  display();
});

let botaoRecuperado = document.querySelector("button#recuperado");
botaoRecuperado.addEventListener("click", function() {
  visitado.recuperado += 1;
  novaVisita("recuperado");
  display();
});

let botaoFechado = document.querySelector("button#fechado");
botaoFechado.addEventListener("click", function() {
  visitado.fechado += 1;
  novaVisita("fechado");
  display();
});

let botaoRecusado = document.querySelector("button#recusado");
botaoRecusado.addEventListener("click", function() {
  visitado.recusado += 1;
  novaVisita("recusado");
  display();
});



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

botaoAtualizar.addEventListener("click", function() {
  visitas.forEach(function(linha) {
    let totalFechado = visitado.fechado * duracao.fechado;
    let totalRecusado = visitado.recusado * duracao.recusado;
    let parcialRecuperado = visitado.recuperado * duracao.fechado;
    let tempoRestante = hora.total - (totalFechado + totalRecusado + parcialRecuperado);
    duracao.vistoriado = tempoRestante / (visitado.vistoriado + visitado.recuperado);
    duracao.recuperado = duracao.vistoriado + duracao.fechado;

    if (linha.id === "1.1") {
      hora.atual = hora.manha.inicio.clone();
      // linha.hora = hora.atual.clone();
    }
    linha.hora = hora.atual.clone();
    hora.atual.add(duracao[`${linha.tipo}`], "minutes").format("HH:mm");
    if (hora.atual >= hora.manha.fim && hora.atual < hora.tarde.inicio) {
      hora.atual = hora.tarde.inicio.clone();
    }
    display();
  }
)});


atualizaHora();