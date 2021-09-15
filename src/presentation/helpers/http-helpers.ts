import { HttpResponse } from '../protocols/http';

const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data,
});

export { ok };
