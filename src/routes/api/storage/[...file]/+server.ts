import type { RequestEvent } from "@sveltejs/kit"
 
function parseRange(encoded: string | null): undefined | { offset: number, end: number, length: number } {
    if (encoded === null) {
      return
    }
  
    const parts = encoded.split("bytes=")[1]?.split("-") ?? []
    if (parts.length !== 2) {
      throw new Error('Not supported to skip specifying the beginning/ending byte at this time')
    }
  
    return {
      offset: Number(parts[0]),
      end:    Number(parts[1]),
      length: Number(parts[1]) + 1 - Number(parts[0]),
    }
  }
  
  function errorResponse(objectName: string, error: any): Response {
    return new Response(`Excpetion Occured: R2 object ${objectName} could not be fetched. \nError:: ${error.name}: ${error.message}`, {
      status: 404,
      headers: {
        'content-type': 'text/plain; charset=UTF-8'
      }
    })
}
  
/** @type {import('./$types').RequestHandler} */
export async function GET(event: RequestEvent) {

    const objectName = event.params.file
    let cacheKey = `${event.url.origin}/api/storage/${objectName}`
    try{
        let cache = event.platform.caches.default
        const range = parseRange(event.request.headers.get('range'))
        const cachedResponse = await cache.match(cacheKey)

        if (cachedResponse) {
            return cachedResponse
        }

        let object = await event.platform.env.MY_R2.get(objectName, {range})
        
        if (object === null) {
          const error = new Error('RPCustomError: R2 Object Not Found')
          return errorResponse(objectName!, error)
        }

        const headers = new Headers()
        object.writeHttpMetadata(headers)
        headers.set('etag', object.httpEtag)
        headers.set('Cache-Control', "public, max-age=31536000, immutable")
        if (range) {
          headers.set("content-range", `bytes ${range.offset}-${range.end}/${object.size}`)
        }
        const status = object.body ? (range ? 206 : 200) : 304
        
        const response = new Response(object.body, {
            headers,
            status
          })

        event.platform.context.waitUntil(cache.put(cacheKey, response.clone()))

        return response
    }
    catch (error: any) {
        return errorResponse(objectName!, error)
    }
}



