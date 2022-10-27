<script>
import Gutter from "$lib/gutter/Gutter.svelte";
export const clickmenu=(e)=>{
        const target = e.currentTarget.parentNode.parentNode
         console.log(target)
        const plusIcon = target.querySelector('[data-plus]')
        const minusIcon = target.querySelector('[data-minus]')
        const content = target.querySelector('[data-content]')
        console.log(content)
        content.classList.toggle('hidden')
        if (content.classList.contains('hidden')) {
        plusIcon.style.display = 'block'
        minusIcon.style.display = 'none'
        }
        else {
        plusIcon.style.display = 'none'
        minusIcon.style.display = 'block'
        }
    }
</script>

<div class="w-full">
<Gutter>
    <div class="xl:pb-24 pb-12 sm:pt-0 pt-6">
      <div class="w-full">
        <ul>
          <li class="faq1 py-6 border-gray-200 border-solid border-b">
            <div class="flex justify-between items-center cursor-pointer">
              <p class="text-gray-200 text-base md:text-xl xl:text-2xl w-10/12 dark:text-gray-200" on:click={clickmenu}>
                What is Renderpub?
              </p>
              <div data-menu class="cursor-pointer" on:click={clickmenu}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  data-plus
                  class="hidden icon icon-tabler icon-tabler-circle-plus"
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#A0AEC0"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-label="Open"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <circle cx="12" cy="12" r="9" />
                  <line x1="9" y1="12" x2="15" y2="12" />
                  <line x1="12" y1="9" x2="12" y2="15" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  data-minus
                  class="icon icon-tabler icon-tabler-circle-minus"
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#A0AEC0"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-label="Close"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <circle cx="12" cy="12" r="9" />
                  <line x1="9" y1="12" x2="15" y2="12" />
                </svg>
              </div>
            </div>
            <div data-content id="noclick" class="pt-2 md:pt-3 lg:pt-5 px-4 md:px-8 text-gray-200 text-sm md:text-base xl:text-lg rounded-b-lg dark:text-gray-200">
              Renderpub is a software suite built for architectural visualization use cases. It consists of
              <ol class="px-4 md:px-8 text-gray-200 text-sm md:text-base xl:text-lg rounded-b-lg dark:text-gray-200"> 
                  <li>Renderpub Studio - A real time, ray traced, rendering application to produce highly photorealistic images, videos and interactive VR experiences from 3D models.</li>
                  <li>Renderpub Spaces - A web platform to experience architectural spaces interactively and immersively in VR</li>
                  <li>Renderpub Stitch - An application to convert 3D models to interactive VR walkthroughs using pre rendered panoramic images.</li>
              </ol>
            </div>
          </li>
          <li class="faq1 py-6 border-gray-200 border-solid border-b">
            <div class="flex justify-between items-center cursor-pointer">
              <p class="text-gray-200 text-base md:text-xl xl:text-2xl w-10/12 dark:text-gray-200" on:click={clickmenu}>
                How do I get started?
              </p>
              <div data-menu class="cursor-pointer" on:click={clickmenu}>
                <svg
                  data-plus
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-circle-plus"
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#A0AEC0"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-label="Open"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <circle cx="12" cy="12" r="9" />
                  <line x1="9" y1="12" x2="15" y2="12" />
                  <line x1="12" y1="9" x2="12" y2="15" />
                </svg>
                <svg
                  data-minus
                  xmlns="http://www.w3.org/2000/svg"
                  class="hidden icon icon-tabler icon-tabler-circle-minus"
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#A0AEC0"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-label="Close"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <circle cx="12" cy="12" r="9" />
                  <line x1="9" y1="12" x2="15" y2="12" />
                </svg>
              </div>
            </div>
            <p data-content id="noclick" class="hidden pt-2 md:pt-3 lg:pt-5 text-gray-200 px-4 md:px-8 text-sm md:text-base xl:text-lg rounded-b-lg dark:text-gray-200">
              The best way to get started with the Renderpub Suite is by downloading the launcher which will be made available at beta launch time.
            </p>
          </li>
          <li class="faq1 py-6 border-gray-200 border-solid border-b">
            <div class="flex justify-between items-center cursor-pointer">
              <p class="text-gray-200 text-base md:text-xl xl:text-2xl w-10/12 dark:text-gray-200" on:click={clickmenu}>
                How does Renderpub integrate with other software?
              </p>
              <div data-menu class="cursor-pointer" on:click={clickmenu}>
                <svg
                  data-plus
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-circle-plus"
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#A0AEC0"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-label="Open"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <circle cx="12" cy="12" r="9" />
                  <line x1="9" y1="12" x2="15" y2="12" />
                  <line x1="12" y1="9" x2="12" y2="15" />
                </svg>
                <svg
                  data-minus
                  xmlns="http://www.w3.org/2000/svg"
                  class="hidden icon icon-tabler icon-tabler-circle-minus"
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#A0AEC0"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-label="Close"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <circle cx="12" cy="12" r="9" />
                  <line x1="9" y1="12" x2="15" y2="12" />
                </svg>
              </div>
            </div>
            <p data-content id="noclick" class="hidden pt-2 md:pt-3 lg:pt-5 text-gray-200 px-4 md:px-8 text-sm md:text-base xl:text-lg rounded-b-lg dark:text-gray-200">
              Renderpub Studio can import 3D models created in any 3D modeling software when exported to fbx, obj, dae, gltf, 3ds and 3dm formats. In addition to importing, there are DirectLink Plugins for real time syncing of scenes between Renderpub Studio and 3D modeling applications like SketchUp, Archicad, Rhino, Revit, and 3ds Max. 
            </p>
          </li>
          <li class="faq1 py-6 border-gray-200 border-solid border-b">
            <div class="flex justify-between items-center cursor-pointer">
              <p class="text-gray-200 text-base md:text-xl xl:text-2xl w-10/12 dark:text-gray-200" on:click={clickmenu}>
                What is the pricing model?
              </p>
              <div data-menu class="cursor-pointer" on:click={clickmenu}>
                <svg
                  data-plus
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-circle-plus"
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#A0AEC0"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-label="Open"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <circle cx="12" cy="12" r="9" />
                  <line x1="9" y1="12" x2="15" y2="12" />
                  <line x1="12" y1="9" x2="12" y2="15" />
                </svg>
                <svg
                  data-minus
                  xmlns="http://www.w3.org/2000/svg"
                  class="hidden icon icon-tabler icon-tabler-circle-minus"
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#A0AEC0"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-label="Close"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <circle cx="12" cy="12" r="9" />
                  <line x1="9" y1="12" x2="15" y2="12" />
                </svg>
              </div>
            </div>
            <p data-content id="noclick" class="hidden pt-2 md:pt-3 lg:pt-5 text-gray-200 px-4 md:px-8 text-sm md:text-base xl:text-lg rounded-b-lg dark:text-gray-200">
              All products in the Renderpub Suite are free for all purposes during the beta run. Definitive pricing will be made available before production release.  
            </p>
          </li>
          <li class="faq1 py-6 border-gray-200 border-solid border-b">
            <div class="flex justify-between items-center cursor-pointer">
              <p class="text-gray-200 text-base md:text-xl xl:text-2xl w-10/12 dark:text-gray-200" on:click={clickmenu}>
                What are the minimum system requirements to run Renderpub Suite?
              </p>
              <div data-menu class="cursor-pointer" on:click={clickmenu}>
                <svg
                  data-plus
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-circle-plus"
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#A0AEC0"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-label="Open"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <circle cx="12" cy="12" r="9" />
                  <line x1="9" y1="12" x2="15" y2="12" />
                  <line x1="12" y1="9" x2="12" y2="15" />
                </svg>
                <svg
                  data-minus
                  xmlns="http://www.w3.org/2000/svg"
                  class="hidden icon icon-tabler icon-tabler-circle-minus"
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#A0AEC0"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-label="Close"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <circle cx="12" cy="12" r="9" />
                  <line x1="9" y1="12" x2="15" y2="12" />
                </svg>
              </div>
            </div>
            <div data-content id="noclick" class="hidden pt-2 md:pt-3 lg:pt-5 text-gray-200 px-4 md:px-8 text-sm md:text-base xl:text-lg rounded-b-lg dark:text-gray-200"> 
              <ul class="pt-2 md:pt-3 lg:pt-5 text-gray-200 px-4 md:px-8 text-sm md:text-base xl:text-lg rounded-b-lg dark:text-gray-200">
                <li>Renderpub Studio:<br>
                  <ol>
                    <li>OS: 64bit Windows10</li>
                    <li>GPU: GTX 1060 6GB or higher, DX12 and RTX compatible</li>
                    <li>Memory: 16GB RAM, 40GB Disk Space</li>
                    <li>CPU: Benchmark score > 2000</li>
                  </ol>
                </li>
                <li class="pt-6">
                  Renderpub Spaces:<br>
                  Any device that can run a modern web browser
                </li>
                <li class="pt-6">Renderpub Stitch:<br>
                  <ol>
                    <li>OS: Windows10 v1809 and higher with DirectX 12</li>
                    <li>GPU: DirectX 11 compatible</li>
                    <li>Memory: 8GB RAM, 2GB Disk Space</li>
                    <li>CPU: Benchmark score > 2000</li>
                  </ol>
                </li>
                
              </ul>
            </div>
          </li>
          <li class="faq1 py-6 border-gray-200 border-solid border-b">
            <div class="flex justify-between items-center cursor-pointer">
              <p class="text-gray-200 text-base md:text-xl xl:text-2xl w-10/12 dark:text-gray-200" on:click={clickmenu}>
                Do I need a Head Mounted Display (HMD) to use Renderpub?
              </p>
              <div data-menu class="cursor-pointer" on:click={clickmenu}>
                <svg
                  data-plus
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-circle-plus"
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#A0AEC0"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-label="Open"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <circle cx="12" cy="12" r="9" />
                  <line x1="9" y1="12" x2="15" y2="12" />
                  <line x1="12" y1="9" x2="12" y2="15" />
                </svg>
                <svg
                  data-minus
                  xmlns="http://www.w3.org/2000/svg"
                  class="hidden icon icon-tabler icon-tabler-circle-minus"
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#A0AEC0"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-label="Close"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <circle cx="12" cy="12" r="9" />
                  <line x1="9" y1="12" x2="15" y2="12" />
                </svg>
              </div>
            </div>
            <p data-content id="noclick" class="hidden pt-2 md:pt-3 lg:pt-5 text-gray-200 px-4 md:px-8 text-sm md:text-base xl:text-lg rounded-b-lg dark:text-gray-200">
              While an HMD is not necessary, the interactive walkthroughs on Renderpub Spaces can be viewed immersively in VR using an HMD.
            </p>
          </li>
          <li class="faq1 py-6 border-gray-200 border-solid border-b">
            <div class="flex justify-between items-center cursor-pointer">
              <p class="text-gray-200 text-base md:text-xl xl:text-2xl w-10/12 dark:text-gray-200" on:click={clickmenu}>
                Where can I find support?
              </p>
              <div data-menu class="cursor-pointer" on:click={clickmenu}>
                <svg
                  data-plus
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-circle-plus"
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#A0AEC0"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-label="Open"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <circle cx="12" cy="12" r="9" />
                  <line x1="9" y1="12" x2="15" y2="12" />
                  <line x1="12" y1="9" x2="12" y2="15" />
                </svg>
                <svg
                  data-minus
                  xmlns="http://www.w3.org/2000/svg"
                  class="hidden icon icon-tabler icon-tabler-circle-minus"
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#A0AEC0"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-label="Close"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <circle cx="12" cy="12" r="9" />
                  <line x1="9" y1="12" x2="15" y2="12" />
                </svg>
              </div>
            </div>
            <p data-content id="noclick" class="hidden pt-2 md:pt-3 lg:pt-5 text-gray-200 px-4 md:px-8 text-sm md:text-base xl:text-lg rounded-b-lg dark:text-gray-200">
              The best place to find community and support is the <a id="noclick" href="https://discord.com/invite/ASXjnaWn2X" target="_blank" style="text-decoration: underline; color:#6ab8e6">Renderpub Discord Server.</a> Additionally, you can reach us at <a style="text-decoration: underline; color:#6ab8e6" href="mailto:info@renderpub.com?subject=Renderpub Enquiry">info@renderpub.com</a> for correspondence.
            </p>
          </li>
          <li class="faq1 py-6 border-gray-200 border-solid border-b">
            <div class=" flex justify-between items-center cursor-pointer">
              <p class="text-gray-200 text-base md:text-xl xl:text-2xl w-10/12 dark:text-gray-200" on:click={clickmenu}>
                Where can I find learning resources?
              </p>
              <div data-menu class="cursor-pointer" on:click={clickmenu}>
                <svg
                  data-plus
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-circle-plus"
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#A0AEC0"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-label="Open"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <circle cx="12" cy="12" r="9" />
                  <line x1="9" y1="12" x2="15" y2="12" />
                  <line x1="12" y1="9" x2="12" y2="15" />
                </svg>
                <svg
                  data-minus
                  xmlns="http://www.w3.org/2000/svg"
                  class="hidden icon icon-tabler icon-tabler-circle-minus"
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#A0AEC0"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-label="Close"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <circle cx="12" cy="12" r="9" />
                  <line x1="9" y1="12" x2="15" y2="12" />
                </svg>
              </div>
            </div>
            <p data-content id="noclick" class="hidden pt-2 md:pt-3 lg:pt-5 text-gray-200 px-4 md:px-8 text-sm md:text-base xl:text-lg rounded-b-lg dark:text-gray-200">
              A video tutorial series will be posted on youtube that will help users get familiar with the tools. Documentation and in-app tutorials are also being worked on and will be made available during the beta phase.
            </p>
          </li>
        </ul>
      </div>
    </div>
</Gutter>
</div>

<style scoped>
  ol li::before {
  content: "\2022";
  color: white;
  font-weight: bold;
  font-size: 24px;
  display: inline-block;
  width: 1em;
 }

</style>
