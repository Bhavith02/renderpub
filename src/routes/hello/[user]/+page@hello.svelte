<svelte:head>
	<title>User</title>
	<meta name="description" content="About this app" />
</svelte:head>

<script>
    import { page } from '$app/stores';
</script>

<div class="content">
	<h1>Hello and welcome, {$page.params.user}</h1>
</div>

<style>
	.content {
		width: 100%;
		max-width: var(--column-width);
		margin: var(--column-margin-top) auto 0 auto;
	}
</style>
