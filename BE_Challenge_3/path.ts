import { Course, Files, Folder } from './data'

export const ParentFolder = "Courses"

export function getCourseName(searchParams: URLSearchParams): string {
    return `${ParentFolder}/${searchParams.get('name')}`
}

export function getCourse(arg0: Course): string {
    return `${ParentFolder}/${arg0.name}`
}

export function getFolder(arg0: Folder): string {
    const fld = arg0.folder ? ('/' +  arg0.folder.join('/')) : '';
    return `${ParentFolder}/${arg0.course}${fld}/${arg0.name}`
}

export function getFilesFolder(arg0: Files): string {
    const fld = arg0.folder ? ('/' + arg0.folder.join('/')) : '';
    return `${ParentFolder}/${arg0.course}${fld}`
}

export function getFiles(arg0: Files): string[] {
    const pth = getFilesFolder(arg0) + '/';
    return arg0.names.map(nm => pth + nm);
}
