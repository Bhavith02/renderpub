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
export async function DELETE(event: RequestEvent) { 
    let response
    const objectName = event.url.searchParams.get('file')
    let cache = event.platform.caches.default
    let cacheKey = `${event.url.origin}/api/storage/download?file=${objectName}`
    try{
        await event.platform.env.MY_R2.delete(objectName)
        let res = await cache.delete(cacheKey, {'ignoreMethod':true})
        if(res){
          response = new Response(`Successfully deleted ${objectName} from R2. The object was in cache but is now deleted.`, {
            status: 200,
            headers: {
              'content-type': 'text/plain; charset=UTF-8'
            }
          })
        }
        else{
          response = new Response(`Successfully deleted   ${objectName} from R2. The object was not in cache.`, {
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
