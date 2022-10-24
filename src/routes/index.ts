import { Router } from 'itty-router'
import { createCors } from 'itty-cors'
import { favicon } from './favicon'
import { robots } from './robots'
import { version } from './version'

const { preflight } = createCors()

const r = Router()

// r.all('*', preflight)

r.get('/favicon.ico', favicon)
r.get('/robots.txt', robots)

r.get('/version', version)

export default r
