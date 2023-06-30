<script lang="ts">
    type ActionsFunction = (data: {[k:string]: string}) => {
        color: string,
        href: string,
        method: string,
        title: string,
    }[];
    type TableData = {[k:string]: any}[];
    import { inertia } from "@inertiajs/inertia-svelte";

    export let headers: string[];
    export let data: TableData;
    export let actions: ActionsFunction | null = null;

    let searchName = crypto.randomUUID();
    let paginateName = crypto.randomUUID();

    let filterQuery: string = '';
    let pagination: number = 5;
    let page: number = 1;
    let sortKey: string = '';
    let sortOrder: string = 'asc';
    
    let filteredData: TableData = [];
    let sortedData: TableData = [];
    let selectedData: TableData = [];
    runUpdate();

    function searchUpdate(event: Event) {
        //@ts-ignore
        let value = event.target.value.toLowerCase() as string;
        filterQuery = value;
        runUpdate();
    }

    function paginationUpdate(event: Event) {
        //@ts-ignore
        let value = event.target.value;
        pagination = parseInt(value);
        page = 1;
        runUpdate();
    }

    function sortUpdate(event: Event) {
        //@ts-ignore
        let value = event.target.innerText;
        sortKey = value.toLowerCase();
        sortOrder = (sortOrder === 'asc') ? 'desc' : 'asc';
        runUpdate();
    }

    function setPageFromP(event: Event) {
        //@ts-ignore
        let number = parseInt(event.target.innerText);
        page = number;
        runUpdate();
    }

    function setPageFromDiv(event: Event) {
        //@ts-ignore
        let element = event.target.querySelector('p');
        //@ts-ignore
        let number = parseInt(element.innerText);
        page = number;
        runUpdate();
    }

    function runUpdate() {
        filteredData = data.filter(filter);
        sortedData = filteredData.sort(sort)
        let start = (page - 1) * pagination;
        let end = page * pagination;
        selectedData = sortedData.slice(start, end);
    }

    function filter(row) {
        if (filterQuery === "") {
            return true;
        }
        let keys = Object.keys(row);
            
        for (let i = 0; i < keys.length; i++) {
            let valueToCheck = row[keys[i]];
            if (typeof valueToCheck === "string" && valueToCheck.toLocaleLowerCase().includes(filterQuery)) {
                return true;
            }
        }
        return false;
    }

    function sort(a, b) {
        if (sortKey === "") {
            return 0;
        }

        let aValue = a[sortKey];
        let bValue = b[sortKey];

        if (aValue < bValue) {
            return (sortOrder) ? -1 : 1;
        }

        if (aValue > bValue) {
            return (sortOrder) ? 1 : -1;
        }

        return 0;
    }
</script>
<div class="relative overflow-x-auto overflow-y-auto">
    <div class="flow-root mb-4">
        <div class="float-left">
            <label
                for={searchName}
            >
                Search
            </label>
            <input
                on:input={searchUpdate}
                class="ml-4 w-96 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                type="text"
                name={searchName}
                id={searchName}
            />
        </div>
    
        <div class="float-right">
            <label
                for={paginateName}
            >
                Rows
            </label>
            <select
                class="ml-4 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                name={paginateName}
                id={paginateName}
                on:change={paginationUpdate}
            >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="25">25</option>
            </select>
        </div>
    </div>

    <table class="w-full text-sm text-left text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
            {#each headers as header}
                <th on:click={sortUpdate} scope="col" class="px-6 py-3">{header}</th>
            {/each}
            {#if actions !== null}
                <th scope="col" class="px-6 py-3">Actions</th>
            {/if}
            </tr>
        </thead>
        <tbody>
            {#each selectedData as row}
                <tr class="bg-white border-b">
                    {#each headers as header, index}
                        {#if index === 0}
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{row[header]}</th>
                        {:else}
                            <td class="px-6 py-4">{row[header]}</td>
                        {/if}
                    {/each}
                    {#if actions !== null}
                    {@const actionButtons = actions(row)}
                        <td class="px-6 py-4">
                            {#each actionButtons as button}
                            {@const actionClass = `inline-flex mt-4 items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-${button.color}-600 hover:bg-${button.color}-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${button.color}-500`}
                            <button
                                class={actionClass}
                                use:inertia={{
                                    href: button.href,
                                    method: button.method,
                                }}
                            >
                                {button.title}
                            </button>
                            {/each}
                        </td>
                    {/if}
                </tr>
            {/each}
        </tbody>
    </table>
    <div class="mt-3 flex overflow-x-auto">
        {#if filteredData.length > 0}
            {#if filteredData.length <= pagination}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div on:click={setPageFromDiv} class="border-spacing-1 border-indigo-400 p-1 ml-1">
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <p class="ml-4 text-indigo-500 border-spacing-1" on:click={setPageFromP}>1</p>
                </div>
            {:else}
                {#each Array(Math.ceil(filteredData.length / pagination)) as _, i}
                    {@const containerClass = page === i + 1 ? 'p-2 ml-1 bg-indigo-600 text-white hover:bg-indigo-800 hover:text-white' : 'p-2 ml-1 text-gray-800 hover:bg-indigo-800 hover:text-white'}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <div on:click={setPageFromDiv} class={containerClass}>
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <p on:click={setPageFromP}>{i + 1}</p>
                    </div>
                {/each}
            {/if}
        {/if}
    </div>
</div>