"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFiles = exports.getFilesFolder = exports.getFolder = exports.getCourse = exports.getCourseName = exports.ParentFolder = void 0;
exports.ParentFolder = "Courses";
function getCourseName(searchParams) {
    return `${exports.ParentFolder}/${searchParams.get('name')}`;
}
exports.getCourseName = getCourseName;
function getCourse(arg0) {
    return `${exports.ParentFolder}/${arg0.name}`;
}
exports.getCourse = getCourse;
function getFolder(arg0) {
    const fld = arg0.folder ? ('/' + arg0.folder.join('/')) : '';
    return `${exports.ParentFolder}/${arg0.course}${fld}/${arg0.name}`;
}
exports.getFolder = getFolder;
function getFilesFolder(arg0) {
    const fld = arg0.folder ? ('/' + arg0.folder.join('/')) : '';
    return `${exports.ParentFolder}/${arg0.course}${fld}`;
}
exports.getFilesFolder = getFilesFolder;
function getFiles(arg0) {
    const pth = getFilesFolder(arg0) + '/';
    return arg0.names.map(nm => pth + nm);
}
exports.getFiles = getFiles;
//# sourceMappingURL=path.js.map