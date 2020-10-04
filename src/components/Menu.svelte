<script>
  import { TEXTO } from "../../src/data/Constantes";

  /** @type {boolean} */
  export let menu = false;

  /** @type {string} */
  $: exibirMenu = menu ? "is-active" : "";
</script>

<div class="is-right dropdown is-up {exibirMenu}">
  <div class="dropdown-trigger">
    <button
      class="is-large button is-white"
      id={TEXTO.MENU}
      aria-controls="config"
      aria-haspopup="true"
      on:click={() => (menu = !menu)}>
      <span class="is-large icon">
        <i class="fas fa-ellipsis-v" aria-hidden="true" />
      </span>
    </button>
  </div>
  <div class="dropdown-menu" id="config" role="menu">
    <div class="dropdown-content">
      <div class="dropdown-item">
        <div class="columns is-mobile is-vcentered">
          <div class="column is-large"><strong>{TEXTO.MANHÃ}</strong></div>
          <div class="column is-narrow">
            <div class="field is-right">
              <label class="small switch is-rounded">
                <input type="checkbox" value="false" id="manhaAtivo" />
                <span class="check" />
              </label>
            </div>
          </div>
        </div>
        <div class="columns is-mobile is-vcentered">
          <div class="column has-text-right">{TEXTO.ENTRADA}</div>
          <div class="column is-narrow">
            <div class="field">
              <p class="control has-icons-left">
                <input
                  class="is-small is-rounded input"
                  id="ManhaEntrada"
                  type="time"
                  value="" />
                <span class="is-small icon is-left">
                  <i class="fas fa-clock" />
                </span>
              </p>
            </div>
          </div>
        </div>
        <div class="columns is-mobile is-vcentered">
          <div class="column has-text-right">{TEXTO.SAÍDA}</div>
          <div class="column is-narrow">
            <div class="field">
              <p class="control has-icons-left">
                <input
                  class="is-small is-rounded input"
                  id="ManhaSaida"
                  type="time"
                  value="" />
                <span class="is-small icon is-left">
                  <i class="fas fa-clock" />
                </span>
              </p>
            </div>
          </div>
        </div>
        <hr class="dropdown-divider" />
        <div class="columns is-mobile is-vcentered">
          <div class="column is-large"><strong>{TEXTO.TARDE}</strong></div>
          <div class="column is-narrow">
            <div class="field is-right">
              <label class="small switch is-rounded">
                <input type="checkbox" value="false" id="tardeAtivo" />
                <span class="check" />
              </label>
            </div>
          </div>
        </div>
        <div class="columns is-mobile is-vcentered">
          <div class="column has-text-right">{TEXTO.ENTRADA}</div>
          <div class="column is-narrow">
            <div class="field">
              <p class="control has-icons-left">
                <input
                  class="is-small is-rounded input"
                  id="TardeEntrada"
                  type="time"
                  value="" />
                <span class="is-small icon is-left">
                  <i class="fas fa-clock" />
                </span>
              </p>
            </div>
          </div>
        </div>
        <div class="columns is-mobile is-vcentered">
          <div class="column has-text-right">{TEXTO.SAÍDA}</div>
          <div class="column is-narrow">
            <div class="field">
              <p class="control has-icons-left">
                <input
                  class="is-small is-rounded input"
                  id="TardeSaida"
                  type="time"
                  value="" />
                <span class="is-small icon is-left">
                  <i class="fas fa-clock" />
                </span>
              </p>
            </div>
          </div>
        </div>
        <hr class="dropdown-divider" />
        <div class="columns is-mobile is-vcentered">
          <div class="column is-large">
            <strong>{TEXTO.ALEATORIEDADE}</strong>
          </div>
          <div class="column is-narrow">
            <div class="field is-right">
              <label class="small switch is-rounded">
                <input type="checkbox" value="false" id={TEXTO.ALEATORIEDADE} />
                <span class="check" />
              </label>
            </div>
          </div>
        </div>
        <div class="columns is-mobile is-vcentered">
          <div class="column is-large"><strong>{TEXTO.BLOQUEIO}</strong></div>
          <div class="column is-narrow">
            <div class="field is-right">
              <label class="small switch is-rounded">
                <input type="checkbox" value="false" id={TEXTO.BLOQUEIO} />
                <span class="check" />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
