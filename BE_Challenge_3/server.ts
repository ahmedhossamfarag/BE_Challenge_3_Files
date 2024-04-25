import http = require('http');
import files = require('./files')
import formidable = require('formidable');

const port = process.env.port || 1337

files.createEntry();

http.createServer(function (req, res) {
    const notFound = () => {
        res.writeHead(404);
        res.end();
    }
    const badRequest = (ex) => {
        res.writeHead(400);
        res.end(ex.toString());
    }
    try {
        const url = new URL(req.url, `http://localhost:${port}`);
        switch (req.method) {
            case 'GET':
                if (url.pathname == '/')
                    files.getCourse(url.searchParams, res);
                else
                    notFound;
                break;
            case 'POST':
                {
                    const form = new formidable.IncomingForm();
                    form.parse(req, function (err, fields, formFiles) {
                        try {
                            if (err)
                                badRequest(err);
                            else if (url.pathname == '/CreateCourse')
                                files.createCourse(fields, res);
                            else if (url.pathname == '/CreateFolder')
                                files.createFolder(fields, res);
                            else if (url.pathname == '/DeleteCourse')
                                files.deleteCourse(fields, res);
                            else if (url.pathname == '/DeleteFolder')
                                files.deleteFolder(fields, res);
                            else if (url.pathname == '/DeleteFiles')
                                files.deleteFiles(fields, res);
                            else if (url.pathname == '/AddFiles')
                                files.addFiles(fields, formFiles, res);
                            else
                                notFound();
                        } catch (ex) {
                            badRequest(ex);
                        }
                    });
                }
                break;
            default:
                notFound();
                break;
        }
    } catch (ex) {
        badRequest(ex);
    }
}).listen(port);