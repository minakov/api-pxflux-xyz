import { TypedHandler } from './index.js'
import { getServiceConfig } from '@/config'
import { JsonResponse } from '@/utils/json-response'

const { VERSION } = getServiceConfig()
const BODY = new JsonResponse({ version: VERSION })

export const version: TypedHandler = function () {
  return BODY
}
