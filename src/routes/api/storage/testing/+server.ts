import { error, type RequestEvent, type RequestHandler } from '@sveltejs/kit';

function errorResponse(objectName: string, error :any): Response {
    return new Response(`Excpetion Occured: R2 object ${objectName} could not be created. \nError:: ${error.name}: ${error.message}`, {
      status: 404,
      headers: {
        'content-type': 'text/plain; charset=UTF-8'
      }
    })
}

function getExtension(path: string) {
    const lastPart = path.split(".").pop()
    return lastPart ? `.${lastPart}` : ""
}

/** @type {import('./$types').RequestHandler} */
export async function POST(event: RequestEvent) { 
    const cacheKey = new Request(event.url.href.toString());
    console.log(event.url.href)
    const data = await event.request.formData()
    const objectName = data.get('filename') as string

    console.log(objectName)

    const extension = getExtension(objectName)
    const file = data.get('file') 

    if (!file) {
        let e = new Error("missing file or invalid file")
        return errorResponse(objectName, error)
    }

    console.log(file)
    
    return new Response(JSON.stringify(`Uploaded object ${objectName} to bucket. Object was in cache. Removed from cache. It will be added to cache the next time it is accessed`), {
        status: 200,
        headers: {
          'content-type': 'text/plain; charset=UTF-8',
        }
      })
  
  
}
