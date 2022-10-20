import { TypedHandler } from './index.js'

const BODY = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

export const favicon: TypedHandler = function () {
  return new Response(BODY, {
    headers: {
      'content-type': 'image/x-icon',
    },
  })
}
