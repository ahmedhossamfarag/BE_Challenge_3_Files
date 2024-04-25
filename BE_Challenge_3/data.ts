type Tree = {
    name: string,
    folders: Tree[],
    files: string[]
}

type Course = {
    name: string
}

type Folder = {
    course: string,
    folder: string[] | undefined,
    name: string
}


type Files = {
    course: string,
    folder: string[] | undefined,
    names: string[] | undefined
}


export {
    Tree,
    Course,
    Folder,
    Files,
}

function isName(str: any) {
    if (typeof str == 'object')
        if (str.length != 1)
            return false;
        else
            str = str[0]
    return typeof str == 'string' &&
        new RegExp(/^\w[\w\s&]+([.][a-z0-9]+)?$/g).test(str)
}

function isNameArr(arr: any): boolean {
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

export function isCrs(fields: any): boolean {
    return typeof fields == 'object' &&
        isName(fields.name);
}

export function isFld(fields: any): boolean {
    return typeof fields == 'object' &&
        isName(fields.course) &&
        isNameArr(fields.folder) &&
        isName(fields.name);
}

export function isFls(fields: any): boolean {
    return typeof fields == 'object' &&
        isName(fields.course) &&
        isNameArr(fields.folder) &&
        isNameArr(fields.names);
}
