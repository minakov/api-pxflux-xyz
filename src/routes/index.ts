import { cors, postCors } from '@/middleware/cors'
import Router, { Handler } from '@/utils/router'
import { favicon } from './favicon'
import { robots } from './robots'
import { version } from './version'

export type TypedHandler = Handler<Bindings>
const r = new Router<Bindings>()

r.options('*', cors)

r.get('/favicon.ico', favicon)
r.get('/robots.txt', robots)

r.get('/version', version, [postCors])

export default r
