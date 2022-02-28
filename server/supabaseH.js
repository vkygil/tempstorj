const { createClient } = require('@supabase/supabase-js')
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SECRET_SERVICE)


module.exports = new function () {
    this.data = []

    this.getFile = async (code) => {
        let fileName, fileOriginalName;
        try {
            const { data, error } = await supabase
                .from('filesInfo')
                .select('ext, name')
                .match({ id: code })
            if (error) throw error
            if (!data[0]) return false
            fileName = code + "." + data[0].ext
            fileOriginalName = data[0].name
            // return data;
        } catch (err) {
            console.log(err);
        }

        const { data, error } = await supabase
            .storage
            .from('storj')
            .download("files/" + fileName)
        if (error) console.log(error);
        return { data, fileOriginalName }
    }
    this.uploadFile = async (file, ext) => {
        let id = this.createId(3)

        // console.log(file);
        //Insert File
        try {
            const { data, error } = await supabase
                .storage
                .from('storj')
                .upload("/files/" + id + '.' + ext, file.buffer, {
                    cacheControl: '3600',
                    upsert: false
                })
            if (error) throw error
            console.log(data);

        } catch (err) {
            console.log(err);
        }
        //Insert record to db
        try {
            const { error } = await supabase
                .from('filesInfo')
                .upsert([
                    {
                        id: id,
                        ext: ext,
                        name: file.originalname,
                        expiry: 24
                    }
                ])
            if (error) throw error

        } catch (err) {
            console.log(err);
        }

        return id
    }
    this.createId = function (length) {
        let result = "";
        const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
        for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }



}

