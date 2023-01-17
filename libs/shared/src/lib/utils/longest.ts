export const longest = <T>(...arrays: T[][]) => {
    if (arrays.length === 0) return null;

    return arrays
        .slice(1)
        .reduce(
            (longest, array) =>
                array.length > longest.length ? array : longest,
            arrays[0]
        );
};
