"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readDir = void 0;
const fs = require("fs");
function readDir(path, name) {
    const paths = fs.readdirSync(path);
    const trs = [];
    const fls = [];
    for (var f of paths) {
        const fn = path + '/' + f;
        if (fs.lstatSync(fn).isDirectory())
            trs.push(readDir(fn, f));
        else
            fls.push(f);
    }
    return { name: name, folders: trs, files: fls };
}
exports.readDir = readDir;
//# sourceMappingURL=tree.js.map