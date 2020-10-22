<script lang="ts">
  export let message = "";
</script>

<div
  class="z-30 fixed top-0 right-0 m-6 flex justify-auto py-4 border border-gray-200 bg-white rounded-md text-red-400 items-center">
  <svg
    class="h-6 w-6 ml-4"
    stroke="currentColor"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round">
    <path
      d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>

  <div class="text-red-800 text-md inline-block align-middle text-left px-4">
    {message}
  </div>
</div>
