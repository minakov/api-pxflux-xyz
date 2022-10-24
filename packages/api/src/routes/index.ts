import { Router } from 'itty-router'
import { favicon } from './favicon'
import { robots } from './robots'
import { version } from './version'

export interface TypedHandler {
    (request: Request, env: Bindings): any
}

const r = Router()

r.get('/favicon.ico', favicon)
r.get('/robots.txt', robots)

r.get('/version', version)

r.all('*', () => new Response('Not found', { status: 404 }))

export default r
