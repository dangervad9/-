const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');
const mustache= require('mustache');
const redis = require('redis');

const hostname = '127.0.0.1';
const port = 3001;


    const server = http.createServer(async(req, res) => {                     //создание асинхронного сервера
    const url=req.url;
    let contentType='text/plain';
    let filePath = path.join(__dirname, 'front-end', url);
    if (url==='/shop'){
        const data =  await setValue();                                      //вызов ф-ции
                const template = fs.readFileSync('./templates/shop.mustache', 'utf8');
                const header_mustache = fs.readFileSync('./templates/header.mustache', 'utf8');
                const footer_mustache = fs.readFileSync('./templates/footer.mustache', 'utf8');
                const html = mustache.render(template, data, {
                    header: header_mustache,
                    footer: footer_mustache
            });
                res.setHeader('Content-Type', 'text/html');
                res.end(html);
            }
    if(url==='/blog')
    {
    const data =  await setValue();
        const template = fs.readFileSync('./templates/blog.mustache', 'utf8');
        const header_mustache = fs.readFileSync('./templates/header.mustache', 'utf8');
        const footer_mustache = fs.readFileSync('./templates/footer.mustache', 'utf8');
        const html = mustache.render(template, data, {
            header: header_mustache,
            footer: footer_mustache
    });
        res.setHeader('Content-Type', 'text/html');
        res.end(html);
    }
    if(url==='/gallery')
    {
        const data =  await setValue();
        const template = fs.readFileSync('./templates/gallery.mustache', 'utf8');
        const header_mustache = fs.readFileSync('./templates/header.mustache', 'utf8');
        const footer_mustache = fs.readFileSync('./templates/footer.mustache', 'utf8');
        const html = mustache.render(template, data, {
            header: header_mustache,
            footer: footer_mustache
    });
        res.setHeader('Content-Type', 'text/html');
        res.end(html);
    }
    if(url==='/contacts')
    {
        const data =  await setValue();
        const template = fs.readFileSync('./templates/contacts.mustache', 'utf8');
        const header_mustache = fs.readFileSync('./templates/header.mustache', 'utf8');
        const footer_mustache = fs.readFileSync('./templates/footer.mustache', 'utf8');
        const achievement = fs.readFileSync('./templates/achievement.mustache', 'utf8');
        const html = mustache.render(template, data, {
            header: header_mustache,
            achievement:achievement,
            footer: footer_mustache
    });
        res.setHeader('Content-Type', 'text/html');
        res.end(html);
    }
    if (url==='/')
    {
        const data =  await setValue();
        const template = fs.readFileSync('./templates/index.mustache', 'utf8');
        const header_mustache = fs.readFileSync('./templates/header.mustache', 'utf8');
        const footer_mustache = fs.readFileSync('./templates/footer.mustache', 'utf8');
        const html = mustache.render(template, data, {
            header: header_mustache,
            footer: footer_mustache
    });
        res.setHeader('Content-Type', 'text/html');
        res.end(html);
    }
   fs.access(filePath, fs.constants.F_OK, (err) => { 
       if (err) { 
           res.statusCode = 404;
           res.end(filePath); 
           return; 
       } 
        fs.readFile(filePath, (err, data) => { 
            if (err) { 
                res.statusCode = 500;
                res.end('Error reading file'); 
                return; 
            } 
            const fileExtension = path.extname(filePath); 
            const mimeType = mime.lookup(fileExtension); 
            if (!mimeType) {
                res.statusCode = 500;
                res.end('Unknown file type');
                return;
            }
            contentType=mimeType;
            res.statusCode = 200;
            res.setHeader('Content-Type', contentType); 
            res.setHeader('Cache-Control', 'no-cache', 'no-store');
            res.end(data);          
        });    
   }); 
});
server.listen(port, hostname, () => {
    
    console.log(`Server running at http://${hostname}:${port}/`);
});


async function setValue() {
    const client = redis.createClient();
    client.connect();
    const v =JSON.parse(await client.get('key')); //получаем ответ от сервера и парсим в json
    return v;
    }