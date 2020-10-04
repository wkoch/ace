<script>
  /**
   * @typedef { import("../lib/Tipos").Intervalos } Intervalos
   */

  import { TEXTO } from "../../src/data/Constantes";
  import { minutosEmTexto, horárioEmMinutos } from "../lib/Horários";

  /** @type {boolean} */
  export let modal = false;

  /** @type {Intervalos} */
  export let chuvas;

  /** @type {string} */
  let início = "";

  /** @type {string} */
  let fim = "";

  /** @type {boolean} */
  let erroMenor = false;

  /** @type {boolean} */
  let erroVazio = false;

  function redefinir() {
    início = "";
    fim = "";
    erroMenor = false;
    erroVazio = false;
  }

  function cancelar() {
    modal = false;
    redefinir();
  }

  function salvar() {
    if (início == "" || fim == "") {
      // ERRO: Campos de horário precisam ser preenchidos
      erroVazio = true;
    } else if (horárioEmMinutos(fim) < horárioEmMinutos(início)) {
      // ERRO: Final deve ser maior que Inicial
      erroMenor = true;
    } else {
      // Salva o bloco
      let novoChuvas = chuvas;
      novoChuvas.push({
        tipo: TEXTO.CHUVA,
        início: horárioEmMinutos(início),
        fim: horárioEmMinutos(fim),
      });
      chuvas = [...novoChuvas];
      cancelar();
    }
  }

  $: exibir = modal ? "is-active" : "";
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
          <label for={TEXTO.INÍCIO}>{TEXTO.INÍCIO}</label>
          <div class="field">
            <p class="control has-icons-left">
              <input
                class="is-small is-rounded input"
                id={TEXTO.INÍCIO}
                type="time"
                bind:value={início} />
              <span class="is-small icon is-left">
                <i class="fas fa-clock" />
              </span>
            </p>
          </div>
        </div>
        <div class="column has-text-weight-bold">
          <label for={TEXTO.FIM}>{TEXTO.FIM}</label>
          <div class="field">
            <p class="control has-icons-left">
              <input
                class="is-small is-rounded input"
                id={TEXTO.FIM}
                type="time"
                bind:value={fim} />
              <span class="is-small icon is-left">
                <i class="fas fa-clock" />
              </span>
            </p>
          </div>
        </div>
      </div>
      {#if erroVazio}
        <article class="message is-danger">
          <div class="message-body">{TEXTO.MODAL.ERROVAZIO}</div>
        </article>
      {/if}
      {#if erroMenor}
        <article class="message is-danger">
          <div class="message-body">{TEXTO.MODAL.ERROMENOR}</div>
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
