import type { RequestEvent } from "@sveltejs/kit"

function errorResponse(objectName: string, error: any): Response {
  return new Response(`Excpetion Occured: R2 object ${objectName} could not be created. \nError:: ${error.name}: ${error.message}`, {
      status: 404,
      headers: {
        'content-type': 'text/plain; charset=UTF-8'
      }
    })
}

/** @type {import('./$types').RequestHandler} */
export async function GET(event: RequestEvent){
    const objectName = event.url.searchParams.get('file')
    try{
        let cache = event.platform.caches.default
        let cacheKey = `${event.url.origin}/api/storage/download?file=${objectName}`

        const result = await cache.delete(cacheKey)

        let response
        if (result) {
            response = new Response('The response was cached but is now deleted', {
                status: 200,
                headers: {
                  'content-type': 'text/plain; charset=UTF-8'
                }
              })
        }
        else{
            response = new Response('The response was not in the cache at the time of invalidation.', {
                status: 200,
                headers: {
                  'content-type': 'text/plain; charset=UTF-8'
                }
              })
        }
        return response
    }
    catch (error: any) {
        return errorResponse(objectName!, error)
    }
  }



