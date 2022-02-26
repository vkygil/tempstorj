// import { createClient } from '@supabase/supabase-js'
// const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
//  const { v4 } = require('uuid');

const express = require('express');
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const options = {
};

app.prepare().then(() => {
    const server = express();
    // server.use(bodyParser.json())
    server.get('/api/test', (req, res) => {
        res.send("ok api")
    });

    server.get('*', (req, res) => {
        return handle(req, res);
    });

    server.listen('3000', err => {
        if (err) throw err;
        console.log(`> Ready on Port 8700`);
    });
});