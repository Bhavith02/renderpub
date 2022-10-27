<script>
  export let emailid="";
  export function submitBtn(){
    const myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/json')
      const eml = document.getElementById('email1')
      const raw = {
        fields: [
          {
            name: 'email',
            value: ''
          }
        ]
      }
      raw.fields[0].value = emailid
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(raw),
        redirect: 'follow'
      }
      fetch('https://api.hsforms.com/submissions/v3/integration/submit/7572988/a6a64e77-7f72-46d3-9a47-d0dab7466c5a', requestOptions)
        .then((result) => {
          if (result.ok && emailid !== null) {
            //  this.$router.push('ThankYou');
            // document.getElementById('signup').style.display = 'none'
            // document.getElementById('thankyou').style.display = 'block'
            document.getElementById('thanks').classList.replace('hidden','block')
            // document.getElementById('subscribe').classList.replace('block','hidden')
            // alert("Thankyou for subscribing!!")
            eml.ariaPlaceholder= "Thankyou!!"
            eml.value = ""
          } else {
            eml.ariaPlaceholder= "Enter Your Email"
             eml.value = ""
            throw new Error('Something went wrong')
          }
        })
        .catch((error) => { eml.ariaPlaceholder= "Invalid Email" })
  }

</script>


<div class="cta1 relative xl:pb-24 pb-12 sm:pt-0 pt-8">
    <div  id="img" class="w-full bg-fixed bg-cover xl:py-24 py-12 lazyload " src="../../static/showcasepics/Cma_1.jpg" style="background-image: URL(../../showcasepics/Cma_1.jpg); -webkit-background-size: cover; -moz-background-size: cover;position:relative">
     <!-- <div class="w-full xl:py-24 py-12 lazyload" style="background-image: URL(/showcasepics/Cma_1.jpg); -webkit-background-size: cover; -moz-background-size: cover;background-size: cover;z-index: -1;"></div> -->
      <div class="container mx-auto">
        <div id="subscribe" data-aos="zoom-out" class="xl:w-3/5 lg:w-3/5 w-10/12 mx-auto p-8 bg-black bg-opacity-60 block">
          <h1 class="xl:text-5xl lg:text-5xl text-3xl text-shadow-xl text-center text-gray-200 pb-8">
            Sign Up for the <span class="font-bold">FREE BETA</span>
          </h1>
          <p class="text-xl text-center text-gray-200 pb-16 xl:w-10/12 mx-auto">
            You can subscribe to our newsletter to get to know about our latest products and exciting offers.
          </p>
          <div class="flex flex-col xl:flex-row lg:flex-row md:flex-row w-full justify-center">
            <input id="email1"  type="text" bind:value={emailid} placeholder="Your Email" aria-label="email" class="focus:outline-none xl:w-6/12 lg:w-9/12 w-full mb-2 xl:mb-0 lg:mb-0 md:mb-0 md:w-8/12 py-3 px-4 focus:border-our-blue border border-white rounded shadow text-black" />
            <button on:click={submitBtn} id="ClickSubscribeButton1" class="focus:outline-none font-bold hidden xl:block lg:block md:block sm:block bg-our-blue focus:our-blue py-3 px-8 rounded text-gray-200 hover:ring-2 hover:ring-our-blue text-lg xl:ml-5 lg:ml-5 md:ml-5 bg-opacity-100">
              Subscribe
            </button>
            <button  on:click={submitBtn} id="ClickSubscribeMobileButton1" class="focus:outline-none font-bold block xl:hidden lg:hidden md:hidden sm:hidden bg-our-blue focus:our-blue transition duration-150 ease-in-out hover:ring-2 hover:ring-our-blue rounded text-gray-200 px-6 py-2 text-sm mt-2">
              Subscribe
            </button>
          </div>
        </div>
          <div id="thanks" data-aos="zoom-out" class="hidden xl:w-3/5 lg:w-3/5 w-10/12 mx-auto px-8 pb-8 pt-2 bg-black bg-opacity-60 content-center place-content-center">
          <h1 class="xl:text-3xl lg:text-3xl text-xl text-shadow-xl text-center text-gray-200">
          <span class="font-bold">ThankYou</span> for subscribing!!
          </h1>
        </div>
      </div>
    </div>
  </div>


<style>
.cta1{
  width:100%;
}
</style>