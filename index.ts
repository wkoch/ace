var moment = require('moment');

// Painel: Configurações <|> Conteúdo
let configurar = document.querySelector("div#configurar") as HTMLDivElement;
let conteudo = document.querySelector("div#conteudo") as HTMLDivElement;
let botaoConfig = document.querySelector("button#config");

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


let hora = {
  atual: moment({ hour:0, minute:0 }),
  manha: {
     ativo: true,
    inicio: moment({ hour:0, minute:0 }),
       fim: moment({ hour:0, minute:0 })
  },
  tarde: {
     ativo: true,
    inicio: moment({ hour:0, minute:0 }),
       fim: moment({ hour:0, minute:0 })
  }
};

function parseHora(input) {
  let regExp = /^(\d{2}):(\d{2})/;
  console.log(`${Number(input.value.match(regExp)[1])}:${Number(input.value.match(regExp)[2])}`);
  return moment({
      hour: Number(input.value.match(regExp)[0]),
    minute: Number(input.value.match(regExp)[1])
  });
}

let inputInicioManha = document.querySelector("input#inicio-manha");
let inputFimManha = document.querySelector("input#fim-manha");

let inputInicioTarde = document.querySelector("input#inicio-tarde");
let inputFimTarde = document.querySelector("input#fim-tarde");

function atualizaHora() {
  if (hora.manha.ativo) {
    hora.manha.inicio = parseHora(inputInicioManha);
    hora.manha.fim = parseHora(inputFimManha);
  }
  if (hora.tarde.ativo) {
    hora.tarde.inicio = parseHora(inputInicioTarde);
    hora.tarde.fim = parseHora(inputFimTarde);
  }
}

let checkboxManha = document.querySelector("input#manha") as HTMLInputElement;
checkboxManha.addEventListener("change", function() {
  hora.manha.ativo = checkboxManha.checked;
  atualizaHora();
  console.log(hora.manha.inicio);
});