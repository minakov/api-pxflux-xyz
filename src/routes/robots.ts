import { TypedHandler } from './index.js'

const BODY = `
User-agent: *
Disallow: /
`

export const robots: TypedHandler = function () {
  return new Response(BODY, {
    headers: {
      'content-type': 'text/plain',
    },
  })
}
