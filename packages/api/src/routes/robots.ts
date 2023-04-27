import { RouteHandler } from 'itty-router'

const BODY = `
User-agent: *
Disallow: /
`

export const robots: RouteHandler = function () {
  return new Response(BODY, {
    headers: {
      'content-type': 'text/plain',
    },
  })
}
