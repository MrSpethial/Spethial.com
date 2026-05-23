export default function handler(req, res) {
  const code = req.query.code || 'No code received';
  res.setHeader('Content-Type', 'text/html');
  res.send(`<!DOCTYPE html>
<html>
<body style="font-family:monospace;padding:2rem;max-width:800px;margin:0 auto">
  <h2>Spotify Auth Code</h2>
  <p>Copy this code and paste it back into Claude:</p>
  <textarea rows="5" style="width:100%;font-size:12px" onclick="this.select()">${code}</textarea>
</body>
</html>`);
}
