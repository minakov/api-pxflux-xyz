interface HTTPError extends Error {
  status?: number
  code?: string
  contentType?: string
}

interface Bindings {
  COUNTER: DurableObjectNamespace;
}
