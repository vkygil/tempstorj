// import { createClient } from '@supabase/supabase-js'
//  const { v4 } = require('uuid');
require('dotenv').config({ path: '.env.local' })

const express = require('express');
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const multer = require('multer');
var storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const { createClient } = require('@supabase/supabase-js')
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SECRET_SERVICE)
var supabaseH = require('./supabaseH.js')
let fs = require('fs');


app.prepare().then(() => {
    const server = express();
    server.use(express.json())
    server.use(express.urlencoded());

    server.get('/api/download-file/:code', async (req, res) => {
        const { data, fileOriginalName } = await supabaseH.getFile(req.params.code)
        if (data) {
            const buffer = Buffer.from(await data.arrayBuffer());
            res.writeHead(200, {
                "Content-Disposition": "attachment;filename=" + fileOriginalName
            });
            res.end(buffer)
        } else {
            res.send("No hay nada bro")
        }
    });

    server.post('/api/upload-file', upload.single('file'), async (req, res) => {
        console.log("upload atempt");
        try {
            if (!req.file) {
                res.send({
                    status: false,
                    message: 'No file uploaded'
                });
            } else {
                let avatar = req.file;
                var fileExt = req.file.originalname.split('.').pop();

                let id = await supabaseH.uploadFile(req.file, fileExt)
                res.send({
                    status: true,
                    message: 'File is uploaded',
                    data: {
                        name: req.file.originalname,
                        id: id,
                        size: avatar.size
                    }
                });
            }
        } catch (err) {
            res.status(500).send(err);
        }
    });

    server.get('*', (req, res) => {
        return handle(req, res);
    });
    let port = process.env.PORT || 3000

    server.listen(port, err => {
        if (err) throw err;
        console.log(`> Ready on Port 8700`);
    });
});