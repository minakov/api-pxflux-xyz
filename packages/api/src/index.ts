import router from './routes'
import { errorHandler } from './utils/error-handler'

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
