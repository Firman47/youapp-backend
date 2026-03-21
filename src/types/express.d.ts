import 'express';

declare module 'express' {
  interface Request {
    cookies: {
      access_token?: string;
    };
  }
}
