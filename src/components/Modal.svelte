<script>
  /**
   * @typedef { import("../lib/Tipos").Intervalos } Intervalos
   */

  import { TEXTO } from "../../src/data/Constantes";
  import { horarioEmMinutos } from "../lib/Horarios";

  /** @type {boolean} */
  export let estadoModal;

  /** @type {Intervalos} */
  export let chuvas;

  /** @type {string} */
  let inicio;

  /** @type {string} */
  let fim;

  /** @type {boolean} */
  let erro = false;

  function redefinir() {
    inicio = "";
    fim = "";
    erro = false;
  }

  function cancelar() {
    estadoModal = false;
    redefinir();
  }

  function salvar() {
    if (inicio == "" || fim == "") {
      erro = true;
    } else {
      let novoChuvas = chuvas;
      novoChuvas.push({
        tipo: TEXTO.CHUVA,
        inicio: horarioEmMinutos(inicio),
        fim: horarioEmMinutos(fim),
      });
      chuvas = { ...novoChuvas };
      cancelar();
    }
  }

  $: exibir = estadoModal ? "is-active" : "";
</script>

<style>
  .modal-card {
    width: 350px;
  }
</style>

<div class="modal {exibir}">
  <div class="modal-background" />
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">{TEXTO.MODAL.TÍTULO}</p>
      <button
        id={TEXTO.FECHAR}
        class="delete"
        aria-label="close"
        on:click={cancelar} />
    </header>
    <section class="modal-card-body">
      <p>{TEXTO.MODAL.TEXTO}</p>
      <br />
      <div class="columns is-mobile">
        <div class="column has-text-weight-bold">
          <label for="inicio">{TEXTO.INÍCIO}</label>
          <div class="field">
            <p class="control has-icons-left">
              <input
                class="is-small is-rounded input"
                id="inicio"
                type="time"
                bind:value={inicio} />
              <span class="is-small icon is-left">
                <i class="fas fa-clock" />
              </span>
            </p>
          </div>
        </div>
        <div class="column has-text-weight-bold">
          <label for="fim">{TEXTO.FIM}</label>
          <div class="field">
            <p class="control has-icons-left">
              <input
                class="is-small is-rounded input"
                id="fim"
                type="time"
                bind:value={fim} />
              <span class="is-small icon is-left">
                <i class="fas fa-clock" />
              </span>
            </p>
          </div>
        </div>
      </div>
      {#if erro}
        <article class="message is-danger">
          <div class="message-body">{TEXTO.MODAL.ERRO}</div>
        </article>
      {/if}
    </section>
    <footer class="modal-card-foot">
      <button
        id={TEXTO.SALVAR}
        class="button is-link"
        on:click={salvar}>{TEXTO.SALVAR}</button>
      <button
        id={TEXTO.CANCELAR}
        class="button"
        on:click={cancelar}>{TEXTO.CANCELAR}</button>
    </footer>
  </div>
</div>
