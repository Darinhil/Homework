import http from 'http';
import dotenv from 'dotenv';

dotenv.config({ path: './src/.env' });

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end(`Hello from Homework app at ${host}:${port}\n`);
});

server.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`);
});
