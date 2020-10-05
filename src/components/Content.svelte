<script>
  /**
   * @typedef { import("../lib/Type").Reports } Reports
   */

  import { TEXT, TYPE } from "../data/Data";
  import { inspectionIcon } from "../lib/Inspection";
  import { minutesToText } from "../lib/Time";

  /** @type {Reports} */
  export let reports;

  /** @type {number} */
  export let total = 0;
</script>

<style>
</style>

<section class="section">
  <slot />
  <div class="container is-centered">
    {#if total == 0}
      <section id="welcome" class="has-text-centered">
        <h1 class="title">{TEXT.CONTENT.TITLE}</h1>
        <h2 class="subtitle">{TEXT.CONTENT.SUBTITLE}</h2>
        <p>{TEXT.CONTENT.DESCRIPTION}</p>
        <p>{TEXT.CONTENT.HELP}</p>
      </section>
    {:else}
      <section class="has-text-centered">
        {#each reports as item, index}
          {#if item.type == TYPE.LUNCH}
            <div class="notification is-warning">
              <div class="columns is-mobile">
                <div class="column has-text-centered" style="margin: auto;">
                  {index + 1}
                </div>
                <div class="column has-text-centered" style="margin: auto;">
                  <span class="icon is-size-3" style="margin: auto;">
                    <i class="fas fa-{inspectionIcon(item)}" />
                  </span>
                </div>
                <div class="column has-text-centered">
                  <p>{TEXT.ENTERED}:</p>
                  <p class="is-size-4">{minutesToText(item.start)}</p>
                </div>
                <div class="column has-text-centered">
                  <p>{TEXT.EXITED}:</p>
                  <p class="is-size-4">{minutesToText(item.end)}</p>
                </div>
                <div class="column has-text-centered">
                  <span class="icon is-size-4 has-text-danger">
                    <i class="fas fa-trash" />
                  </span>
                </div>
              </div>
            </div>
          {:else if item.type == TYPE.RAIN}
            <div class="notification is-info">
              <div class="columns is-mobile">
                <div class="column has-text-centered">{index + 1}</div>
                <div class="column has-text-centered">
                  <span class="icon is-size-3">
                    <i class="fas fa-{inspectionIcon(item)}" />
                  </span>
                </div>
                <div class="column has-text-centered">
                  <p>{TEXT.ENTERED}:</p>
                  <p class="is-size-4">{minutesToText(item.start)}</p>
                </div>
                <div class="column has-text-centered">
                  <p>{TEXT.EXITED}:</p>
                  <p class="is-size-4">{minutesToText(item.end)}</p>
                </div>
                <div class="column has-text-centered">
                  <span class="icon is-size-4 has-text-danger">
                    <i class="fas fa-trash" />
                  </span>
                </div>
              </div>
            </div>
          {:else}
            <div class="box">
              <div class="columns is-mobile">
                <div class="column has-text-centered">{index + 1}</div>
                <div class="column has-text-centered">
                  <span class="icon is-size-3">
                    <i class="fas fa-{inspectionIcon(item)}" />
                  </span>
                </div>
                <div class="column has-text-centered">
                  <p>{TEXT.ENTERED}:</p>
                  <p class="is-size-4">{minutesToText(item.start)}</p>
                </div>
                <div class="column has-text-centered">
                  <p>{TEXT.EXITED}:</p>
                  <p class="is-size-4">{minutesToText(item.end)}</p>
                </div>
                <div class="column has-text-centered">
                  <span class="icon is-size-4 has-text-danger">
                    <i class="fas fa-trash" />
                  </span>
                </div>
              </div>
            </div>
          {/if}
        {/each}
        <br />
      </section>
    {/if}
  </div>
</section>
