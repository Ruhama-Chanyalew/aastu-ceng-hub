import sys
import os
import json
import urllib.request
import urllib.parse
from http.server import HTTPServer, SimpleHTTPRequestHandler

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class AASTUHubHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Prevent browser from caching scripts and html
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def do_POST(self):
        if self.path == '/api/chat':
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length)
            
            try:
                data = json.loads(body.decode('utf-8'))
                messages = data.get('messages', [])
                model = data.get('model', 'openai-fast')
                system_prompt = data.get('system_prompt', '')

                # Build messages array for Pollinations
                api_messages = []
                if system_prompt:
                    api_messages.append({'role': 'system', 'content': system_prompt})
                for m in messages:
                    api_messages.append({
                        'role': 'user' if m.get('role') == 'user' or m.get('sender') == 'user' else 'assistant',
                        'content': m.get('content') or m.get('text', '')
                    })

                req_data = json.dumps({
                    'messages': api_messages,
                    'model': model,
                    'temperature': 0.65
                }).encode('utf-8')

                req = urllib.request.Request(
                    'https://text.pollinations.ai/',
                    data=req_data,
                    headers={
                        'Content-Type': 'application/json',
                        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
                    }
                )

                with urllib.request.urlopen(req, timeout=30) as resp:
                    resp_data = resp.read()
                    self.send_response(200)
                    self.send_header('Content-Type', 'text/plain; charset=utf-8')
                    self.send_header('Access-Control-Allow-Origin', '*')
                    self.end_headers()
                    self.wfile.write(resp_data)
                    return

            except Exception as e:
                # If Pollinations POST fails, try Pollinations GET with latest user message
                try:
                    last_user_msg = ''
                    for m in reversed(messages):
                        if m.get('role') == 'user' or m.get('sender') == 'user':
                            last_user_msg = m.get('content') or m.get('text', '')
                            break
                    if last_user_msg:
                        encoded = urllib.parse.quote(last_user_msg)
                        get_url = f'https://text.pollinations.ai/{encoded}?model=openai-fast'
                        get_req = urllib.request.Request(
                            get_url,
                            headers={'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'}
                        )
                        with urllib.request.urlopen(get_req, timeout=20) as get_resp:
                            resp_data = get_resp.read()
                            self.send_response(200)
                            self.send_header('Content-Type', 'text/plain; charset=utf-8')
                            self.send_header('Access-Control-Allow-Origin', '*')
                            self.end_headers()
                            self.wfile.write(resp_data)
                            return
                except Exception as get_err:
                    print(f"Fallback GET error: {get_err}", file=sys.stderr)

                print(f"Chat API error: {e}", file=sys.stderr)
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({'error': str(e)}).encode('utf-8'))
        else:
            self.send_error(404, "Not Found")

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

if __name__ == '__main__':
    httpd = HTTPServer(('0.0.0.0', PORT), AASTUHubHandler)
    print(f"AASTU Hub Server with Live AI Proxy running on http://localhost:{PORT}")
    sys.stdout.flush()
    httpd.serve_forever()
