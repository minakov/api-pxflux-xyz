export function errorHandler(err: HTTPError) {
  console.error(err.stack)
  const status = err.status || 500
  return new Response(err.message || 'Server Error', {
    status,
    headers: {
      'content-type': err.contentType || 'text/plain',
    },
  })
}
