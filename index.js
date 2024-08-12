const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;

const publicDirectory = path.join(__dirname, 'public');
const filesDirectory = path.join(__dirname, 'files');

const server = http.createServer((req, res) => {
  const url = req.url;

  if (url === '/') {
    const filePath = path.join(publicDirectory, 'index.html');
    serveFile(filePath, res);
  } else if (url === '/files') {
    fs.readdir(filesDirectory, (err, files) => {
      if (err) {
        console.error('Error reading directory:', err);
        res.writeHead(500);
        res.end('Internal Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(files));
      }
    });
  } else if (url.startsWith('/files/')) {
    const filePath = path.join(filesDirectory, url.substring(6));
    serveFile(filePath, res);
  } else {
    const filePath = path.join(publicDirectory, url);
    serveFile(filePath, res);
  }
});

function serveFile(filePath, res) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      res.writeHead(404);
      res.end('Not Found');
    } else {
      const extname = path.extname(filePath);
      const contentType = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.txt': 'text/plain'
      };
      res.writeHead(200, { 'Content-Type': contentType[extname] || 'application/octet-stream' });
      res.end(data);
    }
  });
}

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
