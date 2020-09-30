<script>
  export let vistorias;
  export let total;
</script>

<style>
</style>

<section class="section">
  <slot />
  <div class="container is-centered">
    {#if total == 0}
      <section id="boas-vindas" class="has-text-centered">
        <h1 class="title">ACE v5.0.0</h1>
        <h2 class="subtitle">Calculadora de horários de vistorias</h2>
        <p>Não há vistorias no momento.</p>
        <p>Clique nos botões abaixo para adicionar novas vistorias.</p>
      </section>
    {:else}
      <section id="vistorias" class="has-text-centered">
        <table class="table is-striped is-narrow is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th>Id</th>
              <th>Tipo</th>
              <th>Início</th>
              <th>Término</th>
              <th>Opções</th>
            </tr>
          </thead>
          <tbody>
            {#each vistorias as vistoria, indice}
              <tr>
                <th>{vistoria.id}</th>
                <td>{vistoria.tipo}</td>
                <td>{vistoria.inicio}</td>
                <td>{vistoria.fim}</td>
                <td>Editar/Excluir</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </section>
    {/if}
  </div>
</section>
