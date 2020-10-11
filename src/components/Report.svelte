<script>
    /**
     * @typedef { import("../lib/Types").Inspections } Inspections
     * @typedef { import("../lib/Types").Periods } Periods
     */
    import TableRow from "./TableRow.svelte";
    import ConfirmDelete from "./ConfirmDelete.svelte";
    import { finalReport, makeReport } from "../lib/Inspections";

    /** @type {Inspections} */
    export let inspections;

    /** @type {Periods} */
    export let periods;

    /** @type {Inspections} */
    $: initialReport = makeReport(inspections, periods, 840000);

    /** @type {Inspections} */
    $: report = finalReport(initialReport, periods);
</script>

<section>
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="flex flex-col mb-20">
            <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div
                    class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div
                        class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg bg-gray-200 lg:w-6/12 m-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th
                                        class="px-3 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                        Índice
                                    </th>
                                    <th
                                        class="px-3 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                        Vistoria
                                    </th>
                                    <th
                                        class="px-3 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider md:hidden">
                                        Horário
                                    </th>
                                    <th
                                        class="px-3 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider hidden md:table-cell">
                                        Entrada
                                    </th>
                                    <th
                                        class="px-3 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider hidden md:table-cell">
                                        Saída
                                    </th>
                                    <th
                                        class="px-3 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                        Opções
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                {#if report.length > 0}
                                    {#each report as inspection}
                                        <TableRow {inspection} />
                                    {/each}
                                {/if}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
