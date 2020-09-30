<script>
  export let ativo = true;
  export let chuvas;
  let inicio = "";
  let fim = "";
  let erro = false;

  function redefinir() {
    (inicio = ""), (fim = "");
  }

  function cancelar() {
    ativo = !ativo;
    redefinir();
  }

  function salvar() {
    if (inicio == "" || fim == "") {
      erro = true;
    } else {
      chuvas.push({
        tipo: "chuva",
        inicio: inicio,
        fim: fim,
      });
      cancelar();
    }
  }

  $: exibir = ativo ? "is-active" : "";
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
      <p class="modal-card-title">Registrar Chuva</p>
      <button class="delete" aria-label="close" on:click={cancelar} />
    </header>
    <section class="modal-card-body">
      <p>Marque o horário do período de chuva:</p>
      <br />
      <div class="columns is-mobile">
        <div class="column has-text-weight-bold">
          <label for="inicio">Início</label>
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
          <label for="fim">Fim</label>
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
          <div class="message-body">Preencha os dois horários.</div>
        </article>
      {/if}
    </section>
    <footer class="modal-card-foot">
      <button class="button is-link" on:click={salvar}>Salvar</button>
      <button class="button" on:click={cancelar}>Cancelar</button>
    </footer>
  </div>
</div>
