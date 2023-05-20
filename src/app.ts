import http, {IncomingMessage, ServerResponse} from "http";
import {SIMPLE_SEARCH, TREE_SEARCH, Search} from "./search";
import fs from 'fs';

const port = 3000;
const getRouteUrlParameter = (path: string, index: number) => path.split('/')[index];

const server = http.createServer((request: IncomingMessage, response: ServerResponse) => {
    const url = new URL(request.url || '', `http://${request.headers.host}`);
    const path = url.pathname;
    const route = getRouteUrlParameter(path, 1);

    switch (request.method) {
        case 'GET':
            if (['search-tree', 'search-simple'].includes(route)) {
                const search = new Search();
                const type = route === 'search-tree' ? TREE_SEARCH : SIMPLE_SEARCH;
                const needle = getRouteUrlParameter(path, 2).trim();
                if (needle.length === 0) {
                    responseError(response, 'Search string is required');
                }
                search.findLongestPrefix(needle, type).then((prefix) => {
                    responseSuccess(response, prefix);
                }).catch((error) => {
                    responseError(response, error.message, 500);
                });
            } else if (route === 'print-tree') {
                const search = new Search();
                search.printTree(5).then((result) => {
                    responseSuccess(response, 'Printed to console');
                })
            } else {
                responseError(response, 'The route not found');
            }
            break;
        case 'POST':
            if (!['upload'].includes(route)) {
                responseError(response, 'The route not found');
            } else {
                const contentDisposition = request.headers['content-disposition'];
                const nameMatch = contentDisposition ? /filename="([^"]+)"/.exec(contentDisposition) : undefined;
                const filename = nameMatch ? nameMatch[1] : 'sample_prefixes';
                const filePath = `uploads/${filename}.txt`;

                let data = Buffer.from('');
                request.on('data', (chunk) => {
                    data = Buffer.concat([data, chunk]);
                });
                request.on('end', () => {
                    fs.writeFile(filePath, data, (err) => {
                        if (err) {
                            responseError(response, 'Error saving file');
                        } else {
                            responseSuccess(response, 'File uploaded successfully');
                        }
                    });
                });
            }
            break;
        default:
            responseError(response, 'The route not found');
            break;
    }
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

const responseError = (response: ServerResponse, message: string, code: number = 404) => {
    response.statusCode = code;
    response.end(message);
}

const responseSuccess = (response: ServerResponse, value: any) => {
    response.statusCode = 200;
    response.end(value);
}