<script>
</script>

<style>
  .full-width {
    width: 100%;
  }

  .sombra {
    box-shadow: -2px 0px 15px lightgray;
  }
</style>

<section>
  <nav class="is-fixed-bottom navbar sombra is-centered">
    <div class="container is-centered flex">
      <div class="is-centered buttons full-width">
        <slot />
      </div>
    </div>
  </nav>
</section>
