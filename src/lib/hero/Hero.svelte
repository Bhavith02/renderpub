<script>
  let scTimer= 0;
  let scY= 0;
export const mounted=()=> {
    // @ts-ignore
    window.addEventListener('scroll', this.handleScroll)
    // @ts-ignore
    document.getElementById('myvideo1').play()
  }
export const handleScroll=()=> {
      if (scTimer) return
      scTimer = window.setTimeout(() => {
        scY = window.scrollY
        clearTimeout(scTimer)
        scTimer = 0
      }, 100)
    }
</script>
<div  class="hero relative mx-auto pt-12 md:pt-16 xl:pt-0 justify-center">
    <div class="videowrapper flex flex-wrap lg:flex" style="-webkit-mask-image: -webkit-gradient(linear, left 80%, left bottom, from(rgba(0,0,0,1)), to(rgba(0,0,0,0)))">
      <!-- <span class="welcome">
			<picture>
				<source srcset="demo.webp" type="image/webp" />
				<img src="demo.png" alt="Welcome" />
			</picture>
		</span> -->
      <video
        id="myvideo1"
        loop
        autoplay = "true"
        crossorigin=true
        muted
        playsinline
        class="mx-auto object-cover"
        style="controls:hidden; width:100vw;"
      >  <source src="../../HeroVideo/HERO.mp4" type="video/mp4" />
        <track kind="captions"/>
      </video>
    </div>
    <div class="w-full flex justify-center">
      <div class="absolute text-gray-200 2xl:bottom-44 lg:bottom-24 md:bottom-8 lg:block hidden inset-x-1/2">
        {#if scY<=100}
        <div  id="scroll-down-animation">
          <span class="mouse h-12 w-6">
            <span class="move"></span>
          </span>
        </div>
        {/if}
      </div>
    </div>
    

    <div class="w-full flex justify-center">
      <!-- <div class="absolute text-gray-200 sm:bottom-1/4 bottom-4 block left-5/11 -ml-10 sm:-ml-8 lg:-ml-4 xl:-ml-1 2xl:ml-4 2xl:mb-6"> -->
      <div class="absolute text-gray-200 sm:bottom-1/4 bottom-4 block 2xl:mb-6 mx-auto"> 
        <button id="TrailerButton" class="watchbtn border-3 rounded-full p-2 font-bold">
          <a href="https://youtu.be/dRr5fF3VIh4" target="_blank">
          Watch Trailer
          </a>
        </button>
      </div>
    </div>
  </div>
<svelte:window bind:scrollY={scY} />

<style scoped>
.hero{
  width:100%;
}
/* VVV Everything you need VVV */

#scroll-down-animation {
  position: absolute;
  margin-top: -2.5em;
  /* top: 20%; */
  left: 50%;
  transform: translate(-50%,-50%);
}


.mouse {
  margin: 0 auto;
  display: block;
  border-radius: 50px;
  border: 3px solid #fff;
  position: relative;
}

.move {
  position: absolute;
  background-color: #fff;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  left: 50%;
  transform: translateX(-50%);
  animation: move 2s linear infinite;
}

@keyframes move {
  0% {
    transform: translate(-50%,5px);
    opacity: 0;
  }
  50% {
    transform: translate(-50%,20px);
    opacity: 1;
  }
  100% {
    transform: translate(-50%,30px);
    opacity: 0;
  }


}
.watchbtn{
  border:3px solid white;
}
.watchbtn a{
  text-decoration: none;
  color:white;
}


</style>
