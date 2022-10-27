import type { RequestEvent } from "@sveltejs/kit"

function errorResponse(error: any): Response {
  return new Response(`Excpetion Occured: objects could not be listed`, {
      status: 404,
      headers: {
        'content-type': 'text/plain; charset=UTF-8'
      }
    })
}


/** @type {import('./$types').RequestHandler} */
export async function GET(event: RequestEvent) {
  let objectName
  try{
    const options: R2ListOptions = {
        prefix: event.url.searchParams.get('prefix') ?? undefined,
        delimiter: event.url.searchParams.get('delimiter') ?? undefined,
        cursor: event.url.searchParams.get('cursor') ?? undefined,
        include: ['customMetadata', 'httpMetadata'],
      }
    console.log(JSON.stringify(options))
 
    const listed  = await event.platform.env.MY_R2.list(options)
    let truncated = listed .truncated
    let cursor = truncated ? listed .cursor : undefined

    while (truncated) {
        const next = await event.platform.env.MY_R2.list({
          ...options,
          cursor: cursor,
        });
        listed.objects.push(...next.objects);
    
        truncated = next.truncated;
        cursor = next.cursor
    }

    return new Response(JSON.stringify(listed), {headers: {
        'content-type': 'application/json; charset=UTF-8',
    }})
  }
    catch (error: any) {
      return errorResponse(error)
  }
}



