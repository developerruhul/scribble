import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface IApiError {
  statusCode: number;
  message: string;
}

export interface IApiZodError {
  message: string;
  path?: string[];
}

export const getErrorMessage = (err: IApiError | IApiZodError[]) => {
  // if it is zodError for some reason. Even though we validate the
  // inputs from the frontend using the same zod schema as the backend
  // and so there's no way zodError can occure in the backend
  // we'll still handle it
  if (Array.isArray(err)) return 'There was a validation error!';
  else return err?.message;
};
