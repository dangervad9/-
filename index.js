const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');
const mustache= require('mustache');                                          //подключение усов
const hostname = '127.0.0.1';
const port = 3000;
const templates ={
    nav: fs.readFileSync(".\\templates\\navTemplate.mustache").toString(),
    footer: fs.readFileSync(".\\templates\\footerTemplate.mustache").toString()
    }
const objective={
        array: [{href:"gallery.html", title:"Фотогалерея", text:"Галерея"}, 
        {href:"contacts.html", title:"Контактная информация", text:"Контакты"}, 
        {href:"blog.html", title:"Блог", text:"Блог"}, 
        {href:"shop.html", title:"Магазин", text:"Магазин"}],
        array2: [{network:"Facebook", image:"img/social/001-facebook.png"},
        {network:"LinkedIn", image:"img/social/004-linkedin.png"},
        {network:"Instagram", image:"img/social/005-instagram.png"},
        {network:"Twitter", image:"img/social/007-twitter.png"},
        {network:"Tumblr", image:"img/social/010-tumblr.png"},]
    }
const server = http.createServer((req, res) => {
    let main=[{
        src:'img/icon-1.png',
        header:"Lorem ipsum dolor",
        description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      },{
        src:'img/icon-2.png',
        header:"Lorem ipsum dolor",
        description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      },{
        src:'img/icon-3.png',
        header:"Lorem ipsum dolor",
        description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      },{
        src:'img/icon-4.png',
        header:"Lorem ipsum dolor",
        description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      },{
        src:'img/icon-5.png',
        header:"Lorem ipsum dolor",
        description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      },{
        src:'img/icon-6.png',
        header:"Lorem ipsum dolor",
        description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    }];
    let reviews=[{
        src:'img/testimonials/01.jpg',
        name: 'Angelina Glory',
        date:'25/02/2021',
        text:'Lorem ipsum sit amet consectetur adipisicing elit. Obcaecati ipsam laudantium iste consequuntur accusantium alias. Sequi corporis impedit aut mollitia dolorum! Sed at repudiandae minima quas sapiente possimus distinctio obcaecati.'
    },{
        src:'img/testimonials/01.jpg',
        name: 'Angelin Gory',
        date:'26/03/2021',
        text:'Lorem ipsum amet consectetur adipisicing elit. Obcaecati ipsam laudantium iste consequuntur accusantium alias. Sequi corporis impedit aut mollitia dolorum! Sed at repudiandae minima quas sapiente possimus distinctio obcaecati.'
    },{
        src:'img/testimonials/01.jpg',
        name: 'Anelina Glor',
        date:'27/04/2021',
        text:'Lorem ipsum consectetur adipisicing elit. Obcaecati ipsam laudantium iste consequuntur accusantium alias. Sequi corporis impedit aut mollitia dolorum! Sed at repudiandae minima quas sapiente possimus distinctio obcaecati.'
    },{
        src:'img/testimonials/01.jpg',
        name: 'Angelna Gly',
        date:'28/08/2021',
        text:'Lorem ipsum adipisicing elit. Obcaecati ipsam laudantium iste consequuntur accusantium alias. Sequi corporis impedit aut mollitia dolorum! Sed at repudiandae minima quas sapiente possimus distinctio obcaecati.'
    },{
        src:'img/testimonials/01.jpg',
        name: 'Agelina Gry',
        date:'29/09/2021',
        text:'Lorem ipsum elit. Obcaecati ipsam laudantium iste consequuntur accusantium alias. Sequi corporis impedit aut mollitia dolorum! Sed at repudiandae minima quas sapiente possimus distinctio obcaecati.'
    },{
        src:'img/testimonials/01.jpg',
        name: 'Angela Glory',
        date:'30/10/2021',
        text:'Lorem ipsum Obcaecati ipsam laudantium iste consequuntur accusantium alias. Sequi corporis impedit aut mollitia dolorum! Sed at repudiandae minima quas sapiente possimus distinctio obcaecati.'
  },];
    const url=req.url;
    let contentType='text/plain';
    let filePath = path.join(__dirname, 'front-end', url);
    if (url==='/'){
        filePath = path.join(__dirname, 'front-end', 'index.html');
        contentType='text/html';
    }
    if (url === '/main') {
        const jsonData = JSON.stringify(main);
        res.setHeader('Content-Type', 'application/json');
        res.end(jsonData);
        return;
    }
    if (url === '/navtemp') {                                     
        res.setHeader('Content-Type', 'text/html');
        res.end(mustache.render(templates.nav, objective));  //templates.nav - шаблон HTML документа, и objective - данные, которые будут вставлены в шаблон
        return;
    }
    if (url === '/footemp') {
        res.setHeader('Content-Type', 'text/html');
        res.end(mustache.render(templates.footer, objective));
        return;
        
    }
    if (url === '/review') {
      const jsonData = JSON.stringify(reviews);
      res.setHeader('Content-Type', 'application/json');
      res.end(jsonData);
      return;
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
    //console.log(mustache.render(templates.default, objective));
});
