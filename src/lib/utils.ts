import path from 'path';
import { fileURLToPath } from 'url';
import type { ZodError } from 'zod';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function getPublicPath() {
  return path.resolve(__dirname, '..', '..', 'public');
}

export default function formatZodError(error: ZodError) {
  const fieldErrors = error.issues;

  const errorObject: Record<string, string> = {};

  fieldErrors.forEach((fieldError) => {
    const path = fieldError.path.join('.');
    errorObject[path] = fieldError.message;
  });

  const conciseErrorMessages = Object.entries(errorObject)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n');

  return { conciseErrorMessages, errorObject };
}
