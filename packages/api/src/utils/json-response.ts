export class JsonResponse extends Response {
  constructor(body: unknown, { headers, ...init }: ResponseInit = {}) {
    super(JSON.stringify(body), {
      ...init,
      headers: {
        ...headers,
        'content-type': 'application/json;charset=UTF-8',
      },
    })
  }
}
