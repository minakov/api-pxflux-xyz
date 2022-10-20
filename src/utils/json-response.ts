export class JsonResponse extends Response {
  constructor(body: unknown, init: ResponseInit = {}) {
    const headers = {
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
    };
    super(JSON.stringify(body), { ...init, ...headers });
  }
}
