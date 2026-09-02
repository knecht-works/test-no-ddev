// A dev server for the Knecht preview: listens on 0.0.0.0 and shows which
// package manager started it.
const http = require('node:http')
const port = 3000
http.createServer((req, res) => {
  res.writeHead(200, { 'content-type': 'text/plain' })
  res.end(`hello from ${process.env.npm_config_user_agent ?? 'node'}\npreview: ${process.env.KNECHT_PREVIEW_URL ?? '(unset)'}\n`)
}).listen(port, '0.0.0.0', () => console.log(`listening on ${port}`))
