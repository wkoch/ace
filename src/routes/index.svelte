<script>
	import TableRow from "../components/TableRow.svelte";
</script>

<style>
</style>

<svelte:head>
	<title>ACE</title>
</svelte:head>

<!--
  Tailwind UI components require Tailwind CSS v1.8 and the @tailwindcss/ui plugin.
  Read the documentation to get started: https://tailwindui.com/documentation
-->
<div>
	<nav class="bg-white fixed bottom-0 w-full shadow border-2">
	  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between h-16">
		  <div class="flex items-center m-auto align-middle">
			<button class="p-3 border-2 border-transparent text-indigo-400 rounded-full hover:text-indigo-600 focus:outline-none" aria-label="Notifications">
				<svg class="h-10 w-10" stroke="currentColor" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
					<line x1="8" y1="19" x2="8" y2="21"></line><line x1="8" y1="13" x2="8" y2="15"></line><line x1="16" y1="19" x2="16" y2="21"></line><line x1="16" y1="13" x2="16" y2="15"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="12" y1="15" x2="12" y2="17"></line><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"></path>
				</svg>
			</button>
			<button class="p-3 border-2 border-transparent text-green-400 rounded-full hover:text-green-600 focus:outline-none" aria-label="Notifications">
				<svg class="h-10 w-10" stroke="currentColor" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
					<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
				</svg>
			</button>
			<button class="p-3 border-2 border-transparent text-red-400 rounded-full hover:text-red-600 focus:outline-none" aria-label="Notifications">
				<svg class="h-10 w-10" stroke="currentColor" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
					<circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>
				</svg>
			</button>
			<button class="p-3 border-2 border-transparent text-teal-400 rounded-full hover:text-teal-600 focus:outline-none" aria-label="Notifications">
				<svg class="h-10 w-10" stroke="currentColor" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
					<polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
				</svg>
			</button>
			<button class="p-3 border-2 border-transparent text-gray-400 rounded-full hover:text-gray-600 focus:outline-none" aria-label="Notifications">
				<svg class="h-10 w-10" stroke="currentColor" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
					<line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line>
				</svg>
			</button>
		  </div>
		</div>
	  </div>
	</nav>
  
	<header class="bg-white shadow">
	  <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
		<h1 class="text-3xl font-bold leading-tight text-gray-900 text-center text-indigo-600 tracking-tight">
		  Calculadora ACE
		</h1>
	  </div>
	</header>
	<main>
	  <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
		<!--
  Tailwind UI components require Tailwind CSS v1.8 and the @tailwindcss/ui plugin.
  Read the documentation to get started: https://tailwindui.com/documentation
-->
<div class="flex flex-col mb-20">
	<div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
	  <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
		<div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg bg-gray-200">
		  <table class="min-w-full divide-y divide-gray-200">
			<thead>
			  <tr>
				<th class="px-3 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
				  Índice
				</th>
				<th class="px-3 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
				  Vistoria
				</th>
				<th class="px-3 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
				  Horário
				</th>
				<th class="px-3 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
					Opções
				</th>
			  </tr>
			</thead>
			<tbody class="bg-white divide-y divide-gray-200">
			  <TableRow />
			  <TableRow />
			  <TableRow />
			  <TableRow />
			  <TableRow />
			  <TableRow />
			  <TableRow />
			  <TableRow />
			  <TableRow />
			  <TableRow />
			  <TableRow />
			  <TableRow />
			  <TableRow />
			  <TableRow />
			  <TableRow />
			  <TableRow />
			  <TableRow />
			  <TableRow />
			  <TableRow />
			  <TableRow />
  
			  <!-- More rows... -->
			</tbody>
		  </table>
		</div>
	  </div>
	</div>
  </div>
  
	  </div>
	</main>
  </div>
