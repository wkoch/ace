<script>
  /**
   * @typedef { import("../lib/Tipos").Relatórios } Relatórios
   */

  import { TEXTO } from "../data/Constantes.js";

  /** @type {Relatórios} */
  export let relatorio;

  /** @type {number} */
  export let total = 0;
</script>

<style>
</style>

<section class="section">
  <slot />
  <div class="container is-centered">
    {#if total == 0}
      <section id="boas-vindas" class="has-text-centered">
        <h1 class="title">{TEXTO.CONTEÚDO.TÍTULO}</h1>
        <h2 class="subtitle">{TEXTO.CONTEÚDO.SUBTÍTULO}</h2>
        <p>{TEXTO.CONTEÚDO.DESCRIÇÃO}</p>
        <p>{TEXTO.CONTEÚDO.AJUDA}</p>
      </section>
    {:else}
      <section id="vistorias" class="has-text-centered">
        <table class="table is-striped is-narrow is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th>Id</th>
              <th>{TEXTO.TIPO}</th>
              <th>{TEXTO.INÍCIO}</th>
              <th>{TEXTO.TÉRMINO}</th>
              <th>{TEXTO.OPÇÕES}</th>
            </tr>
          </thead>
          <tbody>
            {#each relatorio as item, indice}
              {#if item.tipo == TEXTO.CHUVA || item.tipo == TEXTO.ALMOÇO}
                <tr>
                  <th>{indice}</th>
                  <td>{item.tipo}</td>
                  <td>{item.inicio}</td>
                  <td>{item.fim}</td>
                  <td>Editar/Excluir</td>
                </tr>
              {:else}
                <tr>
                  <th>{indice}</th>
                  <td>{item.tipo}</td>
                  <td>{item.inicio}</td>
                  <td>{item.fim}</td>
                  <td>Editar/Excluir</td>
                </tr>
              {/if}
            {/each}
          </tbody>
        </table>
      </section>
    {/if}
  </div>
</section>
