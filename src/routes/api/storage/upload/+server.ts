import type { RequestEvent } from "@sveltejs/kit"

function errorResponse(key: string, filetype: string, error :any): Response {
    return new Response(JSON.stringify(`Excpetion Occured: R2 object ${key} of type ${filetype} could not be created. \nError:: ${error.name}: ${error.message}`), {
      status: 404,
      headers: {
        'content-type': 'text/plain; charset=UTF-8'
      }
    })
}

/** @type {import('./$types').RequestHandler} */
export async function POST(event: RequestEvent) {
  let bodyformat, filename, filetype: string, filesize, filekey: string, file
  try{
  const headers = await event.request.headers

  // bytes or file
  bodyformat = headers.get('rp-body-format') 
  filename = headers.get('rp-file-name') 
  filetype = headers.get('rp-file-type') as string
  filesize = headers.get('rp-file-size')
  filekey = headers.get('rp-file-key') as string

  if(bodyformat == 'arrayBuffer'){
    const data = await event.request.arrayBuffer()
    file = new Uint8Array (data)
  }
  else if(bodyformat == 'formData'){
    const formdata = await event.request.formData()
    let fileBase64 = await formdata.get('fileBase64') as string
      file = new Uint8Array(atob(fileBase64).split("").map(function(c) {
        return c.charCodeAt(0); }));      
  }
  else{
      let e = new Error("did not find bufferArray or file in body of request")
      return errorResponse(filekey!, filetype!, e)
  }
  if (!file) {
    let e = new Error("missing file or invalid file")
    return errorResponse(filekey!, filetype!, e)
  }
  //
    // if(file.byteLength !== parseInt(filesize)){
    //   console.log("header.filesize doesn't match with number of bytes received in request.body")
    // }
    let response
    let cache = event.platform.caches.default
    let cacheKey = `${event.url.origin}/api/storage/download?file=${filekey}`
    
    
        let cacheAvailability = await cache.match(cacheKey);
        if(cacheAvailability){
          await cache.delete(cacheKey, {'ignoreMethod':true})
          await event.platform.env.MY_R2.delete(filekey)
          
          //event.platform.context.waitUntil(cache.delete(cacheKey, {'ignoreMethod':true}))
          response =  new Response(JSON.stringify(`Uploaded object: ${filekey} of type: ${filetype} and size: ${filesize} bytes to bucket. Object was in cache. Removed from cache. It will be added back to cache the next time it is accessed`), {
            status: 200,
            headers: {
              'content-type': 'text/plain; charset=UTF-8',
            }
          })
        }
        else{
          response = new Response(JSON.stringify(`Uploaded object ${filekey} of type ${filetype} and size: ${filesize} bytes to bucket. Object was not in cache. It will be added to cache the next time it is accessed`), {
            status: 200,
            headers: {
              'content-type': 'text/plain; charset=UTF-8',
            }
          })
        }
        const object = await event.platform.env.MY_R2.put(filekey, file, {
          httpMetadata: {
            ...event.request.headers,
            contentType: filetype,
          },
          customMetadata: {
            // Store the original filename
            filename: filename,
          },          
        })

        response.headers.set('etag', object.httpEtag)
        return response
        
    }
    catch (error: any) {
        return errorResponse(filekey!, filetype! ,error)
    }
}
