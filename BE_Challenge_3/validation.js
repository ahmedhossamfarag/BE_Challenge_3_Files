"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vldAddFls = exports.vldtDelFls = exports.vldtDelFld = exports.vldtDelCrs = exports.vldtCrtFld = exports.vldtCrtCrs = exports.vldGetCrs = void 0;
const fs = require("fs");
const data = require("./data");
const path = require("./path");
function vldGetCrs(searchParams) {
    if (!searchParams.has('name'))
        throw 'Name is required';
    if (!fs.existsSync(path.getCourseName(searchParams)))
        throw 'Course does not exist';
}
exports.vldGetCrs = vldGetCrs;
function vldtCrtCrs(fields) {
    if (!data.isCrs(fields))
        throw 'Invalid form';
    if (fs.existsSync(path.getCourse(fields)))
        throw 'Course already exists';
}
exports.vldtCrtCrs = vldtCrtCrs;
function vldtCrtFld(fields) {
    if (!data.isFld(fields))
        throw 'Invalid form';
    if (fs.existsSync(path.getFolder(fields)))
        throw 'Folder already exists';
}
exports.vldtCrtFld = vldtCrtFld;
function vldtDelCrs(fields) {
    if (!data.isCrs(fields))
        throw 'Invalid form';
    if (!fs.existsSync(path.getCourse(fields)))
        throw 'Course does not exist';
}
exports.vldtDelCrs = vldtDelCrs;
function vldtDelFld(fields) {
    if (!data.isFld(fields))
        throw 'Invalid form';
    if (!fs.existsSync(path.getFolder(fields)))
        throw 'Folder does not exist';
}
exports.vldtDelFld = vldtDelFld;
function vldtDelFls(fields) {
    if (!data.isFls(fields))
        throw 'Invalid form';
    const fls = fields;
    const fl = path.getFilesFolder(fields) + '/';
    for (var f of fls.names) {
        if (!fs.existsSync(fl + f))
            throw `File ${f} does not exist`;
    }
}
exports.vldtDelFls = vldtDelFls;
function vldAddFls(fields, files) {
    if (!data.isFls(fields))
        throw 'Invalid form';
    const fld = path.getFilesFolder(fields);
    if (!fs.existsSync(fld))
        throw 'Folder does not exist';
    if (!files.files)
        throw 'No files uploaded';
    const parent = fld + '/';
    for (var fl of files.files) {
        if (fs.existsSync(parent + fl.originalFilename))
            throw `File ${fl.originalFilename} already exists`;
    }
}
exports.vldAddFls = vldAddFls;
//# sourceMappingURL=validation.js.map