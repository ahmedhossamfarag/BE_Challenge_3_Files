import fs = require('fs');
import {Tree} from './data'
export function readDir(path: string, name: string): Tree {
    const paths = fs.readdirSync(path)
    const trs = []
    const fls = []
    for (var f of paths) {
        const fn = path + '/' + f
        if (fs.lstatSync(fn).isDirectory())
            trs.push(readDir(fn, f));
        else
            fls.push(f);
    }
    return {name: name, folders: trs, files: fls}
}
