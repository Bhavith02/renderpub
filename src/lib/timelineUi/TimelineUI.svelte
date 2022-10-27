  
<script>
    import Gutter from "$lib/gutter/Gutter.svelte";
    function myFunction() {

    }
</script>

<Gutter>
    <div  class=" pt-0 text-gray-200" on:scroll={myFunction}>
      <!-- Row 1 -->
      <div class="grid row-section">
        <div class="my-auto content-center">
          <p class="section-heading-below-large">
            Import 3D models
          </p>
          <video autoplay loop muted playsinline class="w-full">
            <source src="../../video/WEBSITE_VIDEOS_1_T_720.mp4" type="video/mp4">
          Your browser does not support the video tag.
          </video>
        </div>

        <div class="h-full content-center">
          <div class="lg:my-16">
            <p class="section-heading-above-large">
              Import 3D models
            </p>
            <p class="section-para">
              Bring in models from a wide range of supported 3d formats or
              instantly sync modeling changes from industry leading 3D modeling applications like
              <b> <i> SketchUp, Revit, 3DS Max, Navisworks, Archicad and Rhino. </i> </b>
            </p>
          </div>
        </div>
      </div>
      <!-- Row 1 -->

      <!-- Row 2 -->
      <div class="grid row-section">
        <div class="h-full content-center lg:order-first order-last">
          <div class="lg:my-16">
            <p class="section-heading-above-large">
              Build your scene
            </p>
            <p class="section-para">
              Easily create and populate scenes with the drag and drop library, mass placement and dynamic terrain editing tools.
            </p>
          </div>
        </div>
        <div class="my-auto content-center">
          <p class="section-heading-below-large">
            Build your scene
          </p>
          <!-- <img class=" lazyload" src="../../public/showcasepics/Cam_2.jpeg" alt="interior img" /> -->
           <video autoplay loop muted playsinline class="w-full">
            <source src="../../video/WEBSITE_VIDEOS_2.2_T_720.mp4" type="video/mp4">
          Your browser does not support the video tag.
          </video>
        </div>
      </div>
      <!-- Row 2 -->

      <!-- Row 3 -->
      <div class="grid row-section">
        <div class="my-auto content-center">
          <p class="section-heading-below-large">
            Light it up
          </p>
          <!-- <img class=" lazyload" src="../../public/showcasepics/Cam_2.jpeg" alt="interior img" /> -->
          <video autoplay loop muted playsinline class="w-full">
            <source src="../../video/WEBSITE_VIDEOS_3.4_T_720.mp4" type="video/mp4">
          Your browser does not support the video tag.
          </video>
        </div>

        <div class="h-full content-center">
          <div class="lg:my-16">
            <p class="section-heading-above-large">
              Light it up
            </p>
            <p class="section-para">
              Simulate natural lighting and weather conditions with HDRI lighting and dynamic sky and weathering systems.
            </p>
          </div>
        </div>
      </div>
      <!-- Row 3 -->

      <!-- Row 4 -->
      <div class="grid row-section">
        <div class="h-full content-center lg:order-first order-last">
          <div class="lg:my-16">
            <p class="section-heading-above-large">
              Apply materials
            </p>
            <p class="section-para">
              Make any scene look realistic be applying physically based materials with photo scanned textures from the curated library or
              create new materials by importing your own textures.
            </p>
          </div>
        </div>
        <div class="my-auto content-center">
          <p class="section-heading-below-large">
            Apply materials
          </p>
          <!-- <img class=" lazyload" src="../../public/showcasepics/Cam_2.jpeg" alt="interior img" /> -->
          <video autoplay loop muted playsinline class="w-full">
            <source src="../../video/WEBSITE_VIDEOS_4.3_T_720.mp4" type="video/mp4">
          Your browser does not support the video tag.
          </video>
        </div>
      </div>
      <!-- Row 4 -->

      <!-- Row 5 -->
      <div class="grid row-section">
        <div class="my-auto content-center">
          <p class="section-heading-below-large">
            Export
          </p>
          <!-- <img class=" lazyload" src="../../public/showcasepics/Cam_2.jpeg" alt="interior img" /> -->
          <video autoplay loop muted playsinline class="w-full">
            <source src="../../video/WEBSITE_VIDEOS_5.2_T_720.mp4" type="video/mp4">
          Your browser does not support the video tag.
          </video>
        </div>

        <div class="h-full content-center">
          <div class="lg:my-16">
            <p class="section-heading-above-large">
              Export
            </p>
            <p class="section-para">
              Render highly photorealistic images, image sequences and videos with support for 360-degree monoscopic and stereoscopic formats.
            </p>
            <p class="section-para">
              Publish interactive, embeddable, virtual reality walkthroughs that can be viewed on any device with a web browser.
            </p>
          </div>
        </div>
      </div>
      <!-- Row 5 -->

      <!-- Row 6 -->
      <div class="grid row-section">
        <div class="h-full content-center lg:order-first order-last">
          <div class="lg:my-16">
            <p class="section-heading-above-large">
              Present in VR
            </p>
            <p class="section-para">
              Present and showcase your designs as interactive VR walkthroughs on any device that can run a web browser.
            </p>
          </div>
        </div>

        <div class="my-auto content-center">
          <p class="section-heading-below-large">
            Present in VR
          </p>
          <!-- <img class=" lazyload" src="../../public/showcasepics/ipad-10.png" alt="interior img"> -->
          <video autoplay loop muted playsinline class="w-full">
            <source src="../../video/WebWalkthroughFinal.mp4" type="video/mp4">
          Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  </Gutter>

<style>
* {
  box-sizing: border-box;
  color:white;
}

.row-section{
  @apply lg:grid-cols-2 grid-cols-1 gap-2 md:gap-4 lg:gap-8 pt-9 md:pt-8 my-5 md:my-8 lg:my-16 xl:pb-12 content-center 
}

.section-para{
  @apply py-1 xl:py-2 text-sm md:text-xl xl:text-lg text-center
}

.section-heading-above-large{
  @apply pb-2 text-center text-xl md:text-2xl xl:text-3xl font-bold m-auto hidden lg:block
}

.section-heading-below-large{
  @apply pb-4 text-center text-xl md:text-2xl xl:text-3xl font-bold m-auto lg:hidden block
}


</style>