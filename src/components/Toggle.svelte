<script>
    export let id;
    export let checked = false;
    export let disabled = false;
    $: rotate = checked ? "" : "rotate";
    $: color = checked ? "#00D1B2" : "#B5B5B5";
    $: value = checked ? "on" : "off";
</script>

<style>
    .rotate {
        transform: rotate(180deg);
    }
    .disabled {
        color: #eee;
    }
</style>

<div {id} on:click={() => (checked = !checked)} {value}>
    <svg
        class={rotate}
        xmlns="http://www.w3.org/2000/svg"
        width="3em"
        height="3em"
        fill={color}
        viewBox="0 0 512 512">
        <path
            d="M368,112H144C64.6,112,0,176.6,0,256S64.6,400,144,400H368c79.4,0,144-64.6,144-144S447.4,112,368,112Zm0,256A112,112,0,1,1,480,256,112.12,112.12,0,0,1,368,368Z" /></svg>
</div>
