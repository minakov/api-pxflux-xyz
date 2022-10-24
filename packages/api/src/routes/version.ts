import { getServiceConfig } from '@/config'
import { JsonResponse } from '@/utils/json-response'
import { RouteHandler } from 'itty-router'

const { VERSION } = getServiceConfig()
const BODY = new JsonResponse({ version: VERSION })

export const version: RouteHandler<Request> = function () {
  return BODY
}
