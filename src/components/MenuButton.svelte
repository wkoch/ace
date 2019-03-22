<script>
	export let name = "";
	export let type = "";
	export let count = 0;
	export let action = "";
	export let content = "";
</script>

<button id="{name}" class="{type} data-{count}" data-count={count} on:click="{action}">
	<span class="{content}"></span>
</button>

<style>
	button {
	  background-color: transparent;
	  border: none;
	  margin: 0px 10px 0px 10px;
	  vertical-align: middle;
	  touch-action: manipulation;
	}

	.icon {
	  font-size: 62px;
	}

	button.badge {
	  position: relative;
	}

	button.badge:before {
	  content: attr(data-count);
	  width: 20px;
	  height: 20px;
	  line-height: 20px;
	  display: block;
	  border-radius: 50%;
	  background: rgb(67, 151, 232);
	  border: 1px solid #ddd;
	  color: #fff;
	  position: absolute;
	  bottom: 10px;
	  right: 4px;
	}
</style>