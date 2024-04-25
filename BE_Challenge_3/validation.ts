import fs = require('fs');
import data = require('./data')
import path = require('./path')

export function vldGetCrs(searchParams: URLSearchParams) {
    if (!searchParams.has('name'))
        throw 'Name is required'
    if (!fs.existsSync(path.getCourseName(searchParams)))
        throw 'Course does not exist'
}

export function vldtCrtCrs(fields: any) {
    if (!data.isCrs(fields))
        throw 'Invalid form'
    if (fs.existsSync(path.getCourse(fields)))
        throw 'Course already exists'
}

export function vldtCrtFld(fields: any) {
    if (!data.isFld(fields))
        throw 'Invalid form'
    if (fs.existsSync(path.getFolder(fields)))
        throw 'Folder already exists'
}

export function vldtDelCrs(fields: any) {
    if (!data.isCrs(fields))
        throw 'Invalid form'
    if (!fs.existsSync(path.getCourse(fields)))
        throw 'Course does not exist'
}

export function vldtDelFld(fields: any) {
    if (!data.isFld(fields))
        throw 'Invalid form'
    if (!fs.existsSync(path.getFolder(fields)))
        throw 'Folder does not exist'
}

export function vldtDelFls(fields: any) {
    if (!data.isFls(fields))
        throw 'Invalid form'
    const fls = fields as data.Files
    const fl = path.getFilesFolder(fields) + '/'
    for (var f of fls.names) {
        if (!fs.existsSync(fl + f))
            throw `File ${f} does not exist`
    }
}

export function vldAddFls(fields: any, files: any) {
    if (!data.isFls(fields))
        throw 'Invalid form'
    const fld = path.getFilesFolder(fields)
    if (!fs.existsSync(fld))
        throw 'Folder does not exist'
    if (!files.files)
        throw 'No files uploaded'
    const parent = fld + '/';
    for (var fl of files.files) {
        if (fs.existsSync(parent + fl.originalFilename))
            throw `File ${fl.originalFilename} already exists`
    }
}
