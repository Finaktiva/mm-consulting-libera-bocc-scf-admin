export const isPlainObject = (payload): boolean =>
    typeof payload == 'object' &&
    payload !== null &&
    payload.constructor === Object &&
    Object.prototype.toString.call(payload) === '[object Object]';
