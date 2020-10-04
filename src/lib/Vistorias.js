/**
 * @typedef { import("./Tipos").Hora } Hora
 * @typedef { import("./Tipos").Vistoria } Vistoria
 * @typedef { import("./Tipos").Vistorias } Vistorias
 * @typedef { import("./Tipos").TipoVistoria } TipoVistoria
 * @typedef { import("./Tipos").Períodos } Períodos
 */

// import { TEMPO, TIPO } from "../data/Constantes";
import { ordenaPorHoraInicial } from "./Horários";


// /** @type {(vistoria: TipoVistoria | Vistoria, media: number) => Hora} */
// export function duracaoDaVistoria(vistoria, media) {
//     if (vistoria.tipo == TIPO.FECHADA) {
//         return TEMPO.FECHADAS;
//     } else if (vistoria.tipo == TIPO.NORMAL || vistoria.tipo == TIPO.RECUPERADA) {
//         return media;
//     }
// }



// /** @type {(vistorias: Vistorias, períodos: Períodos, media: number) => Vistorias} */
// export function divideVistoriasEntrePeríodos(vistorias, períodos, media) {
//     /** @type {Vistorias} */
//     let novoVistorias = [];
//     /** @type {number} */
//     let contador = 0;

//     períodos.forEach(período => {
//         /** @type {Hora} */
//         let ultimoHorario = período.início;

//         if (horaEntre(ultimoHorario, período)) {
//             vistorias.forEach(vistoria => {
//                 /** @type {Hora} */
//                 let proximoHorario = ultimoHorario + duracaoDaVistoria(vistoria, media);
//                 novoVistorias.push({
//                     id: contador,
//                     período: período.período,
//                     tipo: vistoria.tipo,
//                     início: ultimoHorario,
//                     fim: proximoHorario
//                 })
//                 contador += 1;
//                 ultimoHorario = proximoHorario;
//             });
//         }
//     });

//     return novoVistorias;
// }

// /** @type {(vistorias: Vistorias, períodos: Períodos, media: number) => Vistorias} */
export function geraRelatório(vistorias, intervalos) {
    return ordenaPorHoraInicial([...vistorias, ...intervalos]);
}