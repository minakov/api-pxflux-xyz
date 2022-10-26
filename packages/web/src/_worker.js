addEventListener('fetch', function (event) {
  return event.respondWith(
    new Response('<h1>hello from webworker</h1>', {
      headers: {
        'content-type': 'text/html',
      },
    })
  )
})
