"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFls = exports.isFld = exports.isCrs = void 0;
function isName(str) {
    if (typeof str == 'object')
        if (str.length != 1)
            return false;
        else
            str = str[0];
    return typeof str == 'string' &&
        new RegExp(/^\w[\w\s&]+([.][a-z0-9]+)?$/g).test(str);
}
function isNameArr(arr) {
    if (!arr)
        return true;
    if (typeof arr != 'object')
        return false;
    for (var k in arr) {
        if (!Number.isInteger(Number(k)) || !isName(arr[k]))
            return false;
    }
    return true;
}
function isCrs(fields) {
    return typeof fields == 'object' &&
        isName(fields.name);
}
exports.isCrs = isCrs;
function isFld(fields) {
    return typeof fields == 'object' &&
        isName(fields.course) &&
        isNameArr(fields.folder) &&
        isName(fields.name);
}
exports.isFld = isFld;
function isFls(fields) {
    return typeof fields == 'object' &&
        isName(fields.course) &&
        isNameArr(fields.folder) &&
        isNameArr(fields.names);
}
exports.isFls = isFls;
//# sourceMappingURL=data.js.map