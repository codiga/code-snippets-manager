// eslint-disable-next-line prefer-destructuring
// const Buffer = require('buffer/').Buffer;
import { Buffer } from 'buffer/';

// eslint-disable-next-line import/prefer-default-export
export function decodeIndent(code?: string) {
  if (!code) return '';

  const decodeFromBase64 = Buffer.from(code, 'base64').toString('utf-8');
  return decodeFromBase64.replace(/&\[CODIGA_INDENT\]/g, '  ');
}
