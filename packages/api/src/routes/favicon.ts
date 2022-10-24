import { RouteHandler } from 'itty-router'

const BODY = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

export const favicon: RouteHandler<Request> = function () {
  return new Response(BODY, {
    headers: {
      'content-type': 'image/x-icon',
    },
  })
}
