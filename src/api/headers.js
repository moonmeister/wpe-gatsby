export default function(req, reply) {
  reply.send({reqHeaders: req.headers, reqHost: req.host, reqMethod: req.method, reqPath: req.path, reqProtocol: req.protocol, reqQuery: req.query, reqUrl: req.url});
}