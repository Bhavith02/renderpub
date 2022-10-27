import type { RequestEvent } from "@sveltejs/kit"
 
/** @type {import('./$types').RequestHandler} */
export function GET(event: RequestEvent) { 
  const cacheKey = new Request(event.url.href.toString());
  console.log(event.url.href)
  return new Response(event.url.href);
  
}
