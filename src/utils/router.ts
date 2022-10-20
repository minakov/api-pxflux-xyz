import { parse } from 'regexparam'

interface RouterOptions {
  onNotFound?: BasicHandler
  onError?: ErrorHandler
}

interface Route<T> {
  methodCondition: Condition
  routeCondition: Condition
  handler: Handler<T>
  postHandlers: ResponseHandler[]
}

type HttpMethod = 'options' | 'get'

type Condition = (req: Request) => boolean | Record<string, string>

type BasicHandler = (req: Request) => Response
type ResponseHandler = (req: Request, rsp: Response) => Response
type ErrorHandler = (req: Request, err: Error) => Response
export type Handler<T> = (req: Request, params: Record<string, string>, env: T) => Promise<Response> | Response

/**
 * Match route params
 */
function matchParams(path: string, result: { keys: string[]; pattern: RegExp }) {
  let i = 0
  const out: Record<string, string> = {}
  const { keys, pattern } = result
  let matches = pattern.exec(path)
  if (!matches) {
    return out
  }
  while (i < keys.length) {
    out[keys[i]] = matches[++i]
  }
  return out
}

export default class Router<T> {
  private readonly routes: Route<T>[] = []
  private readonly onNotFound: BasicHandler
  private readonly onError: ErrorHandler

  constructor({ onNotFound, onError }: RouterOptions = {}) {
    this.onNotFound =
      onNotFound ??
      function () {
        return new Response(null, {
          status: 404,
          statusText: 'Not Found',
        })
      }
    this.onError =
      onError ??
      function () {
        return new Response(null, {
          status: 500,
          statusText: 'Internal Server Error',
        })
      }
  }

  /**
   * Add route
   *
   * @example Route example
   * ```text
   * Static (/foo, /foo/bar)
   * Parameter (/:title, /books/:title, /books/:genre/:title)
   * Parameter w/ Suffix (/movies/:title.mp4, /movies/:title.(mp4|mov))
   * Optional Parameters (/:title?, /books/:title?, /books/:genre/:title?)
   * Wildcards (*, /books/*, /books/:genre/*)
   * ```
   * @see https://github.com/lukeed/regexparam
   */
  add(method: HttpMethod, route: string, handler: Handler<T>, postHandlers: ResponseHandler[] = []) {
    const methodCondition = (req: Request) => {
      const m = method.trim().toLowerCase()
      if (m === 'all') {
        return true
      }
      return req.method.toLowerCase() === m
    }

    const parsed = parse(route)
    const routeCondition = (req: Request) => {
      const url = new URL(req.url)
      const path = url.pathname
      const match = parsed.pattern.test(path)
      if (match) {
        return matchParams(path, parsed)
      }
      return false
    }

    this.routes.push({
      methodCondition,
      routeCondition,
      handler,
      postHandlers,
    })
  }

  options(route: string, handler: Handler<T>, postHandlers?: ResponseHandler[]) {
    this.add('options', route, handler, postHandlers)
  }

  get(route: string, handler: Handler<T>, postHandlers?: ResponseHandler[]) {
    this.add('get', route, handler, postHandlers)
  }

  async route(req: Request, env: T) {
    const [handler, params, postHandlers] = this.resolve(req)
    let rsp
    if (handler) {
      try {
        rsp = await handler(req, params, env)
      } catch (err: unknown) {
        rsp = this.onError(req, err as Error)
      }
    } else {
      rsp = this.onNotFound(req)
    }

    return postHandlers.reduce((r, handler) => handler(req, r), rsp)
  }

  /**
   * Resolve returns the matching route for a request that returns true for all conditions (if any).
   */
  private resolve(req: Request): [Handler<T> | false, Record<string, string>, ResponseHandler[]] {
    for (let i = 0; i < this.routes.length; i++) {
      const { methodCondition, routeCondition, handler, postHandlers } = this.routes[i]
      const method = methodCondition(req)
      const routeParams = routeCondition(req)
      if (method && typeof routeParams !== 'boolean') {
        return [handler, routeParams, postHandlers]
      }
    }
    return [false, {}, []]
  }
}
