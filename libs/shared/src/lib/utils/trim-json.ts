import { isPlainObject } from './is-plain-object';

export const trimJSON = <T>(payload: T): T => {
    if (typeof payload == 'string') return payload.trim() as any;
    if (isPlainObject(payload))
        return Object.entries(payload).reduce(
            (current, [key, value]) => {
                current[key] = trimJSON(value);
                return current;
            },
            {} as any
        );
    if (Array.isArray(payload))
        return payload.map(item => trimJSON(item)) as any;
    return payload;
};
