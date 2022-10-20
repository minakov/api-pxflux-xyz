import r from '@/routes'

async function fetch(request: Request, env: Bindings) {
  return r.route(request, env)
}

const worker: ExportedHandler<Bindings> = { fetch }

export default worker
