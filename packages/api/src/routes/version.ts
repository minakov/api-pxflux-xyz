import { getServiceConfig } from '@/config'
import { JsonResponse } from '@/utils/json-response'
import { TypedHandler } from '.'

const { VERSION } = getServiceConfig()
const BODY = new JsonResponse({ version: VERSION })

export const version: TypedHandler = function (request, env: Bindings) {
  console.log(env)
  return BODY
}
