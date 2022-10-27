<script>
    import Gutter from '$lib/gutter/Gutter.svelte';

</script>

<div id="spacesdiv" class="pt-20 xl:pt-24">
    <div id="SpacesContainer" class="relative w-full h-full object-cover" style="">
      <div id="SpacesContent" class="text-gray-200 bg-black bg-opacity-60 h-full lg:w-1/3 sm:w-1/2 w-5/12 md:(py-18)">
        <div id="Spaces1" class="grid grid-cols-8 items-center absolute" style="display:block; margin-top:0">
          <Gutter>
          <div class="grid inline-block align-middle w-full h-full self-center content-center col-span-3">
            <div class="sm:px-8 sm:py-12 lg:(py-24) ">
              <p class="lg:text-4xl md:text-3xl text-2xl text-center text-gray-200 dark:text-gray-200">
                RENDERPUB <span class="font-bold text-our-blue">SPACES</span>
              </p>
              <p class="md:text-md xl:text-lg text-base md:pt-4 pt-2 text-center text-gray-200 dark:text-gray-200">
                <span class="font-bold "> Photorealistic decentralized metaverse platform </span> for experiencing architectural spaces interactively in mobile, web and VR. 
              </p>
              <!-- <router-link to="/Studio" @click="scrollToTop"> -->
              <div class="flex mb-6 md:mb-8 md:mb-0 mt-4">
                <button id="SpacesPageButton" class="text-center mx-auto w-1/2 focus:outline-none hover:ring-2 hover:ring-our-blue bg-our-blue rounded text-gray-200 px-4 py-2 xl:px-4 xl:py-4 font-bold text-base md:text-lg">
                  Coming Soon
                </button>
              </div>
              <!-- </router-link> -->
            </div>
          </div>
          </Gutter>
        </div>
      </div>
    </div>
    <div id="Spaces2" class="grid grid-cols-8" style="display:none;">
      <Gutter>
      <div class="grid w-full h-full col-span-8">
        <div class="border-black lg:(py-8 px-8) py-4">
          <p class="lg:text-4xl md:text-3xl text-2xl text-center text-gray-200 dark:text-gray-200">
            RENDERPUB <span class="font-bold text-our-blue">SPACES</span>
          </p>
          <p class="md:text-md xl:text-lg text-base md:pt-4 pt-2 text-center text-gray-200 dark:text-gray-200">
            <span class="font-bold ">Realtime ray traced renderer </span> with an extensive library of render ready objects, materials, decals, visual effects and all the tools you need to create high fidelity visuals quickly.
          </p>
          <!-- <router-link to="/Studio" @click="scrollToTop"> -->
            <div class="flex mb-6 md:mb-8 md:mb-0 mt-4">
              <button id="SpacesPageButton" class="mx-auto w-1/2 focus:outline-none hover:ring-2 hover:ring-our-blue bg-our-blue rounded text-gray-200 px-4 py-2 xl:px-4 xl:py-4 font-bold text-base md:text-lg">
                Coming Soon
              </button>
            </div>
          <!-- </router-link> -->
        </div>
      </div>
      </Gutter>
    </div> 
  
  </div>