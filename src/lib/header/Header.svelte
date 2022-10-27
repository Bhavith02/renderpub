<script>
  import { onMount } from 'svelte';
	let profilePhoto= 'https://tuk-cdn.s3.amazonaws.com/assets/components/boxed_layout/bl_1.png';

  onMount(async () => {
      const body = document.getElementsByTagName('body')[0]
      body.addEventListener('click', () => {
      const single = document.getElementById('productul')
      if (!single.classList.contains('hidden'))
        single.classList.add('hidden')
      const MainList = document.getElementById('mobileul')
      const closeIcon = document.getElementsByClassName('close-m-menu')[0]
      const showIcon = document.getElementsByClassName('show-m-menu')[0]
      if (!MainList.classList.contains('hidden')) {
        MainList?.classList.add('hidden')
        showIcon.classList.remove('hidden')
        closeIcon.classList.add('hidden')
      }
    }, false)

    })
	 function dropdownHandler(event) {
      const single = event.currentTarget.getElementsByTagName('ul')[0]
      single.classList.toggle('hidden')
      event.stopPropagation()
    }
   function close() {
      const single = document.getElementById('productul')
      console.log(single?.classList)
    }

   function dropdownHandler1(event) {
      const single = event.currentTarget.parentElement
      const second = single.parentElement
      const third = second.parentElement
      const fourth = third.parentElement
      fourth.classList.toggle('hidden')
      const showIcon = document.getElementsByClassName('show-m-menu')[0]
      showIcon.classList.remove('hidden')
      const closeIcon = document.getElementsByClassName('close-m-menu')[0]
      closeIcon.classList.add('hidden')
    }
   function dropdownHandler2(event) {
      const single = event.currentTarget.parentElement
      single.classList.toggle('hidden')
      const showIcon = document.getElementsByClassName('show-m-menu')[0]
      showIcon.classList.remove('hidden')
      const closeIcon = document.getElementsByClassName('close-m-menu')[0]
      closeIcon.classList.add('hidden')
    }
    function MenuHandler(el, val) {
      const MainList = el.currentTarget.parentElement.getElementsByTagName('ul')[0]
      const closeIcon = el.currentTarget.parentElement.getElementsByClassName('close-m-menu')[0]
      const showIcon = el.currentTarget.parentElement.getElementsByClassName('show-m-menu')[0]
      if (val) {
        MainList.classList.remove('hidden')
        el.currentTarget.classList.add('hidden')
        closeIcon.classList.remove('hidden')
      }
      else {
        showIcon.classList.remove('hidden')
        MainList.classList.add('hidden')
        el.currentTarget.classList.add('hidden')
      }
      el.stopPropagation()
    }
   function scrollToTop() {
      window.scrollTo(0, 0)
    }


</script>

<header class="header">
	<!-- Navigation starts -->
  <nav class="w-full grid shadow-md z-200 relative md:h-16 h-12 border-b border-gray-800" style="background:rgb(07, 07, 07);position:fixed;top:0;width:100%;z-index:99;">
    <div class="justify-between container px-10 flex items-center lg:items-stretch mx-auto">
      <div class="flex items-center">
        <router-link to="/" on:click={scrollToTop}>
          <div class="mr-10 flex items-center">
            <img src="../../logos/Renderpub/RenderpubWebsiteLogoWithFont.svg" alt="Renderpub" class="xl:4/5 lg:w-3/4 w-1/2">
          </div>
        </router-link>
        <ul class="pr-32 xl:flex hidden items-center h-full">
          
            <li class="hover:text-our-blue cursor-pointer h-full flex items-center text-gray-200 tracking-normal">
              <router-link to="/" on:click={scrollToTop}>
              Home
              </router-link>
            </li>
          
          <li class="hover:text-our-blue cursor-pointer h-full flex items-center text-gray-200 mx-10 tracking-normal relative" on:click={dropdownHandler}>
            <ul id="productul" class="shadow py-1 w-32 left-0 mt-16 ml-4 font-bold absolute hidden top-0 "  style="background:#27272a">
                <a class="removeUnderLine" id="SpacesMenuButton" href="/spaces/TestUser/sammys">
                <li id="SpacesMenuButton" class="cursor-pointer text-gray-200 text-sm leading-3 tracking-normal py-3 hover:bg-our-blue hover:text-white px-3">
                  
                  Spaces
                 
                </li>
                </a>
                <a class="removeUnderLine" id="StudioMenuButton" href="/#Studio">
                <li id="StudioMenuButton" class="cursor-pointer text-gray-200 text-sm leading-3 tracking-normal py-3 hover:bg-our-blue hover:text-white px-3">
                  
                  Studio
                  
                </li>
                </a>
                <a class="removeUnderLine" id="StitchMenuButton" href="/#Stitch">
                <li id="StitchMenuButton" class="cursor-pointer text-gray-200 text-sm leading-3 tracking-normal py-3 hover:bg-our-blue hover:text-white px-3">
                  
                  Stitch
                  
                </li>
                </a>
             
            </ul>
            Products
            <div class="ml-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-chevron-down"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                stroke-width="3"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </li>
          <!-- <li class="hover:text-our-blue cursor-pointer h-full flex items-center text-gray-200 mr-10 tracking-normal">
            Resources
          </li> -->
          <a class="removeUnderLine" href="#Showcase">
          <li class=" hover:text-our-blue cursor-pointer h-full flex items-center text-gray-200 mr-10 tracking-normal">
            
            Showcase
            
          </li>
          </a>
          <!-- <li class="hover:text-our-blue cursor-pointer h-full flex items-center text-gray-200 mr-10 tracking-normal">
              <router-link to="/careers" on:click={scrollToTop}>
              Careers
              </router-link>
            </li> -->
            <!-- <li class="hover:text-our-blue cursor-pointer h-full flex items-center text-gray-200 mr-10 tracking-normal"> -->
              <!-- <router-link to="/NFT" on:click={scrollToTop}> -->
              <!-- NFT -->
              <!-- </router-link> -->
            <!-- </li> -->
          
         
        </ul>
       
      </div>

      <!-- Dropdown Nav -->
      <div class="visible xl:hidden flex items-center">
        <ul id="mobileul" class="z-50 py-2 absolute top-0 left-0 right-0 shadow mt-12 md:mt-16 hidden" style="background:#27272a">
          <router-link to="/" on:click={()=>{scrollToTop(); dropdownHandler2()}} >
            <li class="flex xl:hidden cursor-pointer text-gray-200 text-base leading-3 tracking-normal mt-2 py-3 hover:text-our-blue focus:outline-none">
              <div class="flex items-center">
                 <span class="leading-6 ml-2 font-bold">Home</span>
              </div>
            </li>
          </router-link>
          <li class="xl:hidden flex-col cursor-pointer text-gray-200 text-base leading-3 tracking-normal py-3 hover:text-our-blue focus:outline-none flex justify-center" on:click={dropdownHandler}>
            <div class="flex items-center">
              <span class="leading-6 ml-2 font-bold">Products</span>
              <div class="ml-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-chevron-down"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  stroke-width="3"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>
            <ul class="ml-2 mt-3 hidden">
                <a class="removeUnderLine" href="#Spaces" on:click={dropdownHandler1}>
                <li id="SpacesMenuButton" class="cursor-pointer text-gray-200 text-sm leading-3 tracking-normal py-3 hover:bg-our-blue hover:text-white px-3 font-normal">
                  
                  Spaces
                  
                </li>
                </a>
                <a class="removeUnderLine" href="#Studio" on:click={dropdownHandler1}>
                <li id="StudioMenuButton" class="cursor-pointer text-gray-200 text-sm leading-3 tracking-normal py-3 hover:bg-our-blue hover:text-white px-3 font-normal">
                  
                  Studio
                  
                </li>
                </a>
              
                <a class="removeUnderLine" href="#Stitch" on:click={dropdownHandler1}>
                <li id="StitchMenuButton" class="cursor-pointer text-gray-200 text-sm leading-3 tracking-normal py-3 hover:bg-our-blue hover:text-white px-3 font-normal">
                  
                  Stitch
                  
                </li>
                </a>
            </ul>
          </li>
          <!-- <li class="xl:hidden cursor-pointer text-gray-200 text-base leading-3 tracking-normal py-3 hover:text-our-blue flex items-center focus:outline-none">
            <span class="leading-6 ml-2 font-bold">Resources</span>
          </li> -->
          <a class="removeUnderLine" href="#Showcase">
          <li class="xl:hidden cursor-pointer text-gray-200 text-base leading-3 tracking-normal py-3 hover:text-our-blue flex items-center focus:outline-none">
            <span class="leading-6 ml-2 font-bold">Showcase</span>
          </li>
          </a>
          <!-- <router-link to="/NFT" on:click={scrollToTop}> -->
            <!-- <li class="xl:hidden cursor-pointer text-gray-200 text-base leading-3 tracking-normal py-3 hover:text-our-blue flex items-center focus:outline-none">
              <span class="leading-6 ml-2 font-bold">NFT</span>
            </li> -->
          <!-- </router-link> -->
          
        </ul>
        <svg
          aria-haspopup="true"
          aria-label="Main Menu"
          xmlns="http://www.w3.org/2000/svg"
          class="show-m-menu icon icon-tabler icon-tabler-menu"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#fff"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          on:click={(event) => MenuHandler(event,true)}
        >
          <path stroke="none" d="M0 0h24v24H0z"></path>
          <line x1="4" y1="8" x2="20" y2="8"></line>
          <line x1="4" y1="16" x2="20" y2="16"></line>
        </svg>
        <div class="hidden close-m-menu" on:click={(event) => MenuHandler(event,false)}>
          <svg
            aria-label="Close"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#fff"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" />
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </div>
      </div>
    </div>
  </nav>
  <!-- Navigation ends -->
</header>

<style>
.header{
	width:100%;
}
.removeUnderLine{
  text-decoration: none;
}
</style>
