const cluster = require('cluster');

if (cluster.isMaster) {
    cluster.fork();
    cluster.fork();
    cluster.fork();
    cluster.fork();
} else {
    const express = require('express');
    const app = express();

    app.get('/', (req, res) => {
        doWork(5000);
        res.send('Hi there');
    });

    app.get('/fast', (req, res) => {
        res.send('This was fast!');
    });

    app.listen(3000);

    function doWork(duration) {
        const start = Date.now();
        while (Date.now() - start < duration) {}
    }
}

/*
const https = require('https');
const crypto = require('crypto');
const fs = require('fs');

const start = Date.now();

function doRequest() {
    https
        .request('https://www.google.com', res => {
            res.on('data', () => {});
            res.on('end', () => {
                console.log(Date.now() - start);
            });
        })
        .end()
    ;
}

function doHash(counter) {
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
        console.log(`${counter}: ${Date.now() - start}`);
    });
}

doRequest();

fs.readFile('server.js', 'utf-8', () => {
    console.log(`FS: ${Date.now() - start}`);
});

doHash(1);
doHash(2);
doHash(3);
doHash(4);*/
