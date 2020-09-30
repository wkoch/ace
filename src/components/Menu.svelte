<script>
  let config = { ativo: false, bloqueado: false, aleatoriedade: false };
  let manha = { ativo: true, inicio: false, fim: false };
  let tarde = { ativo: true, inicio: false, fim: false };
  let exibirMenu = config.ativo ? "is-active" : "";
</script>

<div class="is-right dropdown is-up {exibirMenu}">
  <div class="dropdown-trigger">
    <button
      class="is-large button is-white"
      id="Menu"
      aria-controls="config"
      aria-haspopup="true"
      on:click={() => (config.ativo = !config.ativo)}>
      <span class="is-large icon">
        <i class="fas fa-ellipsis-v" aria-hidden="true" />
      </span>
    </button>
  </div>
  <div class="dropdown-menu" id="config" role="menu">
    <div class="dropdown-content">
      <div class="dropdown-item">
        <div class="columns is-mobile is-vcentered">
          <div class="column is-large"><strong>Manhã</strong></div>
          <div class="column is-narrow">
            <div class="field is-right">
              <input
                class="is-small is-rounded switch is-primary"
                id="manhaAtivado"
                type="checkbox"
                name="manhaAtivado"
                checked={manha.ativo} />
              <label for="manhaAtivado" />
            </div>
          </div>
        </div>
        <div class="columns is-mobile is-vcentered">
          <div class="column has-text-right">Entrada</div>
          <div class="column is-narrow">
            <div class="field">
              <p class="control has-icons-left">
                <input
                  class="is-small is-rounded input"
                  id="ManhaEntrada"
                  type="time"
                  value={manha.inicio} />
                <span class="is-small icon is-left">
                  <i class="fas fa-clock" />
                </span>
              </p>
            </div>
          </div>
        </div>
        <div class="columns is-mobile is-vcentered">
          <div class="column has-text-right">Saída</div>
          <div class="column is-narrow">
            <div class="field">
              <p class="control has-icons-left">
                <input
                  class="is-small is-rounded input"
                  id="ManhaSaida"
                  type="time"
                  value={manha.fim} />
                <span class="is-small icon is-left">
                  <i class="fas fa-clock" />
                </span>
              </p>
            </div>
          </div>
        </div>
        <hr class="dropdown-divider" />
        <div class="columns is-mobile is-vcentered">
          <div class="column is-large"><strong>Tarde</strong></div>
          <div class="column is-narrow">
            <div class="field is-right">
              <input
                class="is-small is-rounded switch is-primary"
                id="tardeAtivado"
                type="checkbox"
                name="tardeAtivado"
                checked={tarde.ativo} />
              <label for="tardeAtivado" />
            </div>
          </div>
        </div>
        <div class="columns is-mobile is-vcentered">
          <div class="column has-text-right">Entrada</div>
          <div class="column is-narrow">
            <div class="field">
              <p class="control has-icons-left">
                <input
                  class="is-small is-rounded input"
                  id="TardeEntrada"
                  type="time"
                  value={tarde.inicio} />
                <span class="is-small icon is-left">
                  <i class="fas fa-clock" />
                </span>
              </p>
            </div>
          </div>
        </div>
        <div class="columns is-mobile is-vcentered">
          <div class="column has-text-right">Saída</div>
          <div class="column is-narrow">
            <div class="field">
              <p class="control has-icons-left">
                <input
                  class="is-small is-rounded input"
                  id="TardeSaida"
                  type="time"
                  value={tarde.fim} />
                <span class="is-small icon is-left">
                  <i class="fas fa-clock" />
                </span>
              </p>
            </div>
          </div>
        </div>
        <hr class="dropdown-divider" />
        <div class="columns is-mobile is-vcentered">
          <div class="column is-large"><strong>Aleatoriedade</strong></div>
          <div class="column is-narrow">
            <div class="field is-right">
              <input
                class="is-small is-rounded switch is-primary"
                id="aleatoriedade"
                type="checkbox"
                name="aleatoriedade"
                bind:checked={config.aleatoriedade} />
              <label for="aleatoriedade" />
            </div>
          </div>
        </div>
        <div class="columns is-mobile is-vcentered">
          <div class="column is-large"><strong>Bloqueio</strong></div>
          <div class="column is-narrow">
            <div class="field is-right">
              <input
                class="is-small is-rounded switch is-danger"
                id="bloqueio"
                type="checkbox"
                name="bloqueio"
                bind:checked={config.bloqueado} />
              <label for="bloqueio" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
