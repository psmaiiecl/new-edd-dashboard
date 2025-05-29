export function renameObjectKey(object, oldKey, newKey){
    if (oldKey !== newKey && object[oldKey] && !object[newKey]){
        Object.defineProperty(object, newKey,
        Object.getOwnPropertyDescriptor(object, oldKey));
        delete object [oldKey];
    }
    return object;
}