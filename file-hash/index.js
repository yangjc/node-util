/**
 * YJC <https://github.com/yangjc> @2018-02-19
 */

'use strict';

const { createHash } = require('crypto');
const { createReadStream } = require('fs');

function fileHash(filePath, algorithm) {
    const hash = createHash(algorithm).setEncoding('hex');
    return new Promise((resolve, reject) => {
        createReadStream(filePath)
            .on('end', () => {
                hash.end();
                resolve(hash.read());
            })
            .on('error', reject)
            .pipe(hash);
    });
}
exports.fileHash = fileHash;
