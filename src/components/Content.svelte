<script lang="ts">
  import { TEXT } from "../data/Data";
</script>

<div class="flex justify-center">
  <section
    class="bg-white rounded-md shadow-lg self-auto m-auto w-auto inline-block text-center p-4 md:p-6 mt-10 text-gray-700">
    <p class="text-xl font-bold py-4">
      {TEXT.CONTENT.SUBTITLE}
      v.{TEXT.VERSION}.
    </p>
    <p class="py-4">{TEXT.CONTENT.DESCRIPTION}</p>
    <p class="text-gray-500 py-4">{TEXT.CONTENT.HELP}</p>
  </section>
</div>
