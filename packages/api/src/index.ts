import { Router } from 'itty-router'
import { errorHandler } from './utils/error-handler'

const router = Router()

router.all('*', () => new Response('Not found', { status: 404 }))

const worker: ExportedHandler<Bindings> = {
  async fetch(request, env, ctx) {
    try {
      return await router.handle(request, env, ctx)
    } catch (err) {
      return errorHandler(err as HTTPError)
    }
  },
}

export default worker
