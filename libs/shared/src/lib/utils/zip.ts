import { longest } from './longest';

export const zip = <T>(...rest: T[][]) => {
    const array = longest(...rest);
    const arrays = rest.filter(a => a != array);

    return array.map((val, i) =>
        arrays.reduce((a, arr) => [...a, arr[i]], [val])
    );
};
