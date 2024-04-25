import fs = require('fs');
import { ServerResponse } from 'http';
import test = require('./validation')
import data = require('./data')
import tree = require('./tree')
import path = require('./path')

export function createEntry() {
    if (!fs.existsSync(path.ParentFolder)) {
        fs.mkdir(path.ParentFolder, () => { })
    }
    console.log('Courses Dir Is Ready')
}

export function getCourse(searchParams: URLSearchParams, res: ServerResponse) {
    test.vldGetCrs(searchParams);
    const crsNm: string = path.getCourseName(searchParams)
    const result: data.Tree = tree.readDir(crsNm, searchParams.get('name'));
    res.end(JSON.stringify(result));
}


export function createCourse(fields: any, res: ServerResponse) {
    test.vldtCrtCrs(fields);
    const crs: string = path.getCourse(fields as data.Course)
    fs.mkdirSync(crs);
    created(res);
}

export function createFolder(fields: any, res: ServerResponse) {
    test.vldtCrtFld(fields);
    const fld: string = path.getFolder(fields as data.Folder)
    fs.mkdirSync(fld);
    created(res);
}

export function addFiles(fields: any, files: any, res: ServerResponse) {
    test.vldAddFls(fields, files);
    const parent = path.getFilesFolder(fields) + '/';
    for (var fl of files.files) {
        var oldpath = fl.filepath;
        var newpath = parent + fl.originalFilename;
        fs.renameSync(oldpath, newpath);
    }
    success(res);
}

export function deleteCourse(fields: any, res: ServerResponse) {
    test.vldtDelCrs(fields);
    const crs: string = path.getCourse(fields as data.Course)
    fs.rmdirSync(crs);
    success(res);
}

export function deleteFolder(fields: any, res: ServerResponse) {
    test.vldtDelFld(fields);
    const fld: string = path.getFolder(fields as data.Folder)
    fs.rmdirSync(fld);
    success(res);
}

export function deleteFiles(fields: any, res: ServerResponse) {
    test.vldtDelFls(fields);
    const fls: string[] = path.getFiles(fields as data.Files)
    for (var fl of fls)
        fs.rmSync(fl)
    success(res);
}

function created(res: ServerResponse) {
    res.writeHead(201)
    res.end()
}

function success(res: ServerResponse) {
    res.writeHead(202)
    res.end()
}
