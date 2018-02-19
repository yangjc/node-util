/**
 * YJC <https://github.com/yangjc> @2018-02-19
 */

'use strict';

const { fileHash } = require('./index');
const { promisify } = require('util');
const { stat } = require('fs');
const { resolve } = require('path');

(async (file) => {
    if (!file) {
        return console.log(`File name required.`);
    }
    const list = [
        'md5',
        'md5',
        'sha1',
        'sha256',
        'sha512',
    ];
    file = resolve(process.cwd(), file);
    console.log(file);
    console.log(`size: ${(await promisify(stat)(file)).size}`)
    for (let a of list) {
        console.time(a);
        const hash = await fileHash(file, a);
        console.timeEnd(a);
    }
})(process.argv[2]).catch(console.error);
