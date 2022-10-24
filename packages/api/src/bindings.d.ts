interface HTTPError extends Error {
  status?: number
  code?: string
  contentType?: string
}

interface Bindings {
  MAGIC_SECRET_KEY: string;
  COUNTER: DurableObjectNamespace;
}
