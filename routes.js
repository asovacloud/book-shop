const fs = require('fs');

const handleRequest = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My message.</title></head>')
    res.write(`
    <body>
      <h1>You could type your message.</h1>
      <form action="/message" method="POST">
        <input type="text" name="home" placeholder="typing..." />
        <button type="submit">Send</button>
      </form>
    </body>
    `)
    res.write('</html>');
    return res.end();
  }
  if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    return req.on('end', () => {
      console.log("Buffer.concat(body)", Buffer.concat(body));
      const parsedBody = Buffer.concat(body).toString();
      const messageValue = parsedBody.split('=')[1];
      fs.writeFile(
        'message.txt',
        messageValue.split('+').join(' '),
        (err) => {
          res.statusCode = 302;
          res.setHeader('Location', '/');
          return res.end();
        }
      );
    });
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My Application!</title></head>');
  res.write('<body><h1>Yo. This is my app!!!</h1></body>');
  res.write('</html>');
  res.end();
};

module.exports = handleRequest;
