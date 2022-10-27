<svelte:head>
	<title>Spaces</title>
</svelte:head>

<script>
    import { page } from '$app/stores';
    import Viewer from '$lib/viewer/Viewer.svelte';
</script>


    <Viewer userID={$page.params.userID} projectID={$page.params.projectID} startScene=0 startHotspot="Hotspot0" />


 