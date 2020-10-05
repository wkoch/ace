<script>
  /**
   * @typedef { import("../lib/Type").Interval } Interval
   */

  import { TEXT } from "../data/Data";
  import { minutesToText, timeInMinutes } from "../lib/Time";

  /** @type {boolean} */
  export let modal = false;

  /** @type {Interval} */
  export let rains;

  /** @type {string} */
  let start = "";

  /** @type {string} */
  let end = "";

  /** @type {boolean} */
  let savedEmpty = false;

  function reset() {
    start = "";
    end = "";
    savedEmpty = false;
    modal = false;
  }

  function cancel() {
    reset();
  }

  function save() {
    if (start == "" || end == "") {
      // ERROR: Both values are required.
      savedEmpty = true;
    } else {
      // Saves the rain block
      let newrains = rains;
      newrains.push({
        type: TEXT.RAIN,
        start: startSchedule,
        end: endtime,
      });
      rains = [...newrains];
      cancel();
    }
  }

  // Valores Computados

  /** @type {number} */
  $: startSchedule = timeInMinutes(start);

  /** @type {number} */
  $: endtime = timeInMinutes(end);

  /** @type {boolean} */
  $: emptyValues = start == "" && end == "";

  /** @type {boolean} */
  $: emptyValue = start == "" || end == "";

  /** @type {boolean} */
  $: sameValuesError = !emptyValues && startSchedule == endtime;

  /** @type {boolean} */
  $: invertedValuesError =
    !(start == "" || end == "") && endtime < startSchedule;

  /** @type {boolean} */
  $: emptyValuesError = savedEmpty && emptyValue ? true : false;

  // Disables the save button when any error is found.
  /** @type {boolean} */
  $: disabled =
    invertedValuesError || emptyValuesError || sameValuesError ? true : false;

  // Lógica de exibição do Modal
  /** @type {string} */
  $: visible = modal ? "is-active" : "";
</script>

<style>
  .modal-card {
    width: 350px;
  }
</style>

<div class="modal {visible}">
  <div class="modal-background" />
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">{TEXT.MODAL.TITLE}</p>
      <button
        id={TEXT.CLOSE}
        class="delete"
        aria-label="close"
        on:click={cancel} />
    </header>
    <section class="modal-card-body">
      <p>{TEXT.MODAL.TEXT}</p>
      <br />
      <div class="columns is-mobile">
        <div class="column has-text-weight-bold">
          <label for={TEXT.START}>{TEXT.START}</label>
          <div class="field">
            <p class="control has-icons-left">
              <input
                class="is-small is-rounded input"
                id={TEXT.START}
                type="time"
                bind:value={start} />
              <span class="is-small icon is-left">
                <i class="fas fa-clock" />
              </span>
            </p>
          </div>
        </div>
        <div class="column has-text-weight-bold">
          <label for={TEXT.END}>{TEXT.END}</label>
          <div class="field">
            <p class="control has-icons-left">
              <input
                class="is-small is-rounded input"
                id={TEXT.END}
                type="time"
                bind:value={end} />
              <span class="is-small icon is-left">
                <i class="fas fa-clock" />
              </span>
            </p>
          </div>
        </div>
      </div>
      {#if emptyValuesError}
        <article class="message is-danger">
          <div class="message-body">{TEXT.MODAL.ERROR_EMPTY}</div>
        </article>
      {/if}
      {#if invertedValuesError}
        <article class="message is-danger">
          <div class="message-body">{TEXT.MODAL.ERROR_INVERTED}</div>
        </article>
      {/if}
      {#if sameValuesError}
        <article class="message is-danger">
          <div class="message-body">{TEXT.MODAL.ERROR_EQUAL}</div>
        </article>
      {/if}
    </section>
    <footer class="modal-card-foot">
      <button
        id={TEXT.SAVE}
        class="button is-link"
        on:click={save}
        {disabled}>{TEXT.SAVE}</button>
      <button
        id={TEXT.CANCEL}
        class="button"
        on:click={cancel}>{TEXT.CANCEL}</button>
    </footer>
  </div>
</div>
