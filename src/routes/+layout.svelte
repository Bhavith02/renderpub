<script >
	 import Header from '$lib/header/Header.svelte';
	 import Footer from '$lib/footer/Footer.svelte';
	import '../app.css';
	import ScrollBase from '$lib/scrollbase/ScrollBase.svelte';
</script>

<Header />

<main >
	<slot/>
	<ScrollBase/>
</main>

<Footer/>

<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		/* padding: 1rem; */
		width: 100%;
		height:100%;
		margin: 0 auto;
		box-sizing: border-box;
	}

	/* footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 40px 0;
		}
	} */
</style>
