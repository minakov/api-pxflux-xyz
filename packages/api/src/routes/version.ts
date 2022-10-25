import { getServiceConfig } from '@/config'
import { JsonResponse } from '@/utils/json-response'
import { TypedHandler } from '.'

export const version: TypedHandler = function (request, env: Bindings) {
  const { VERSION } = getServiceConfig()
  return new JsonResponse({ version: VERSION })
}
