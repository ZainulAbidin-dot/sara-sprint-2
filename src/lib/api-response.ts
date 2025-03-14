import { CookieOptions } from 'express';

import HttpError from './http-error.js';

export class ApiSuccessResponse<T> {
  statusCode: number;
  data: T;
  message: string;
  cookies?: { name: string; value: string; options: CookieOptions }[];

  constructor({
    statusCode,
    message,
    data,
    cookies,
  }: {
    statusCode: number;
    message: string;
    data: T;
    cookies?: { name: string; value: string; options: CookieOptions }[];
  }) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.cookies = cookies;
  }
}

export class ApiErrorResponse {
  statusCode: number;
  name: string;
  message: string;
  error?: { [key: string]: string };

  constructor(error: HttpError) {
    this.name = error.name;
    this.statusCode = error.statusCode;
    this.message = error.message;
    console.log(error);
    if (error.error) this.error = error.error;
  }
}
