const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');
const mustache= require('mustache');                                          //подключение усов
const hostname = '127.0.0.1';
const port = 3000;
const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

    const server = http.createServer((req, res) => {
    const url=req.url;
    let contentType='text/plain';
    let filePath = path.join(__dirname, 'front-end', url);
    if (url==='/shop'){
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
