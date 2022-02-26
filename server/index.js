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


app.prepare().then(() => {
    const server = express();
    server.use(express.json())
    server.use(express.urlencoded());

    server.get('/api/test', async (req, res) => {
        // const { user, session, error } = await supabase.auth.signIn({
        //     email: 'user@email.com',
        //     password: 'password',
        // })
        // const { data: user, error } = await supabase.auth.api.createUser({
        //     email: 'user@email.com',
        //     password: 'password',
        //     data: { name: 'Yoda' }
        // })

        // console.log(user);
        // console.log(error);
        // supabase.from('countries')

        //     .select('*')
        //     .limit(5)
        //     .then(console.log)
        //     .catch(console.error)

        res.send("ok api")
    });

    server.post('/api/upload-file', upload.single('file'), async (req, res) => {
        console.log("upload atempt");
        // console.log(req.file);
        try {
            if (!req.file) {
                res.send({
                    status: false,
                    message: 'No file uploaded'
                });
            } else {
                let avatar = req.file;
                var fileExt = req.file.originalname.split('.').pop();

                await supabaseH.uploadFile(req.file, fileExt)
                res.send({
                    status: true,
                    message: 'File is uploaded',
                    data: {
                        name: avatar.name,
                        mimetype: avatar.mimetype,
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

    server.listen('3000', err => {
        if (err) throw err;
        console.log(`> Ready on Port 8700`);
    });
});