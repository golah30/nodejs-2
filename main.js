const http = require('http');
const yargs = require('yargs');
const argv = yargs
  .help('h')
  .alias('h', 'help')
  .demand('i')
  .nargs('i', 1)
  .describe('i', 'Enter time interval')
  .alias('i', 'interval')
  .demand('e')
  .nargs('e', 1)
  .describe('e', 'Enter time end')
  .alias('e', 'end').argv;

const port = 3000;
const time = { interval: argv.i * 1000, end: argv.e * 1000 };

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    console.log('New Request');
    let timer = setInterval(() => {
      console.log(new Date().toUTCString());
    }, time.interval);

    setTimeout(() => {
      const date = new Date().toUTCString();
      console.log(`Close request on ${date}`);
      clearInterval(timer);
      res.writeHead(200);
      res.end(date);
    }, time.end);
  } else {
    res.writeHead(404);
    res.end();
  }
});
server.listen(port, () => {
  console.log(`running on port ${port}`);
});
