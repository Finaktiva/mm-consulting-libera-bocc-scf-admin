export const clean = function clean(obj: any) {
    let copy = Object.assign({}, obj);
    for (const key in copy) {
        if (copy[key] == null) delete copy[key];
    }
    return copy;
};
