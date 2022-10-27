<script lang="ts">
	import Hero from '$lib/hero/Hero.svelte';
	import SectionHeading from '$lib/section/SectionHeading.svelte';
	import CTA1 from '$lib/cta1/CTA1.svelte';
	import TimelineUI from '$lib/timelineUi/TimelineUI.svelte';
	// import Spaces2 from '$lib/spaces2/Spaces2.svelte';
	import SpacesSection from '$lib/spacessection/SpacesSection.svelte';
	import UseCases1 from '$lib/useCases1/useCases1.svelte';
	import Showcase from '$lib/showcase/ShowCase.svelte';
	import Technology1 from '$lib/technology1/Technology1.svelte';
	import CTA2 from '$lib/cta2/CTA2.svelte';
	import FAQ from '$lib/faq/FAQ.svelte';
	
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<Hero/>
	<SectionHeading id="" sectiontitle="The Complete Architectural Visualization Toolkit" description="3D Modeling,  Realtime Rendering,  Virtual Reality" Class="lg:pb-32 sm:pb-24 pb-16" />
	<CTA1 />
	<SectionHeading id="" sectiontitle="Workflow" description="" Class="" />
    <TimelineUI />
	<!-- <SectionHeading sectiontitle="Product Suite" description="" Class="pt-16 sm:pt-12 lg:pt-8 sm:-mt-0" />
      -->

	<!-- <SpacesSection id="SpacesSection" /> -->

    <SectionHeading id="" sectiontitle="Usecases" Class="lg:pt-32 pt-16" description="" />
    <UseCases1 />
	<!-- <span id="Showcase" ></span> -->
	<SectionHeading id="Showcase" sectiontitle="Showcase" Class="" description="" />
    <Showcase />
	<SectionHeading id="" sectiontitle="Technology" Class="" description="Built with the power of Unreal Engine. Made faster with NVIDIA's Deep Learning Super Sampling (DLSS)." />
	<Technology1 />
    <CTA2 />
    <SectionHeading id="FAQ" sectiontitle="Frequently Asked Questions" description="" Class=""/>
    <FAQ />

</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}
	*{
		background-color: black;
	}

	/* h1 {
		width: 100%;
	} */

	/* .welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	} */
</style>
