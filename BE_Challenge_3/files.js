"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFiles = exports.deleteFolder = exports.deleteCourse = exports.addFiles = exports.createFolder = exports.createCourse = exports.getCourse = exports.createEntry = void 0;
const fs = require("fs");
const test = require("./validation");
const tree = require("./tree");
const path = require("./path");
function createEntry() {
    if (!fs.existsSync(path.ParentFolder)) {
        fs.mkdir(path.ParentFolder, () => { });
    }
    console.log('Courses Dir Is Ready');
}
exports.createEntry = createEntry;
function getCourse(searchParams, res) {
    test.vldGetCrs(searchParams);
    const crsNm = path.getCourseName(searchParams);
    const result = tree.readDir(crsNm, searchParams.get('name'));
    res.end(JSON.stringify(result));
}
exports.getCourse = getCourse;
function createCourse(fields, res) {
    test.vldtCrtCrs(fields);
    const crs = path.getCourse(fields);
    fs.mkdirSync(crs);
    created(res);
}
exports.createCourse = createCourse;
function createFolder(fields, res) {
    test.vldtCrtFld(fields);
    const fld = path.getFolder(fields);
    fs.mkdirSync(fld);
    created(res);
}
exports.createFolder = createFolder;
function addFiles(fields, files, res) {
    test.vldAddFls(fields, files);
    const parent = path.getFilesFolder(fields) + '/';
    for (var fl of files.files) {
        var oldpath = fl.filepath;
        var newpath = parent + fl.originalFilename;
        fs.renameSync(oldpath, newpath);
    }
    success(res);
}
exports.addFiles = addFiles;
function deleteCourse(fields, res) {
    test.vldtDelCrs(fields);
    const crs = path.getCourse(fields);
    fs.rmdirSync(crs);
    success(res);
}
exports.deleteCourse = deleteCourse;
function deleteFolder(fields, res) {
    test.vldtDelFld(fields);
    const fld = path.getFolder(fields);
    fs.rmdirSync(fld);
    success(res);
}
exports.deleteFolder = deleteFolder;
function deleteFiles(fields, res) {
    test.vldtDelFls(fields);
    const fls = path.getFiles(fields);
    for (var fl of fls)
        fs.rmSync(fl);
    success(res);
}
exports.deleteFiles = deleteFiles;
function created(res) {
    res.writeHead(201);
    res.end();
}
function success(res) {
    res.writeHead(202);
    res.end();
}
//# sourceMappingURL=files.js.map