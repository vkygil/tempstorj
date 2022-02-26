const { createClient } = require('@supabase/supabase-js')
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SECRET_SERVICE)


module.exports = new function () {
    this.data = []

    this.getFile = (name) => {
        return this.data;
    }
    this.uploadFile = async (file, ext) => {
        let id = this.createId(3)
        const { data, error } = await supabase
            .storage
            .from('storj')
            .upload(id + '.' + ext, file, {
                cacheControl: '3600',
                upsert: false
            })

        const { data, error } = await supabase
            .from('filesInfo')
            .upsert([
                { id: id, ext: ext, expiry: 24 }
            ])
        console.log(data);
        console.log(error);
        return id
    }
    this.createId = function (length) {
        let result = "";
        const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
        for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }



}

