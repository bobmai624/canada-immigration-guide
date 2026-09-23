from pathlib import Path
import json,hashlib,subprocess,concurrent.futures,datetime
from html.parser import HTMLParser
ROOT=Path(__file__).resolve().parents[1]; OUT=ROOT/'reports/ab'; E=OUT/'evidence';E.mkdir(exist_ok=True,parents=True)
class Text(HTMLParser):
 def __init__(self):super().__init__();self.skip=0;self.parts=[]
 def handle_starttag(self,t,a):
  if t in ['script','style']:self.skip+=1
  if t in ['p','li','h1','h2','h3','h4','tr','td','th','div']:self.parts.append('\n')
 def handle_endtag(self,t):
  if t in ['script','style']:self.skip=max(0,self.skip-1)
 def handle_data(self,d):
  if not self.skip:self.parts.append(d)
def fetch(s):
 ext='.pdf' if '.pdf' in s['url'] else '.html.txt';p=E/(s['id']+ext)
 r=subprocess.run(['curl','-L','--fail','--max-time','45','--retry','1','-sS',s['url'],'-o',str(p)],capture_output=True,text=True)
 s.update(checked_on='2026-09-24',captured_at=datetime.datetime.now(datetime.timezone.utc).isoformat())
 if r.returncode:s.update(status='download_failed',error=r.stderr[:240]);return s
 b=p.read_bytes();s.update(status='downloaded',file=p.name,sha256=hashlib.sha256(b).hexdigest(),bytes=len(b))
 if ext!='.pdf':
  parser=Text();parser.feed(b.decode('utf-8',errors='replace'));t=E/(s['id']+'.txt');t.write_text('\n'.join(x.strip() for x in ''.join(parser.parts).splitlines() if x.strip()));s['text']=t.name
 return s
if __name__=='__main__':
 sources=json.loads((OUT/'sources.json').read_text())
 with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:results=list(pool.map(fetch,sources))
 (OUT/'sources.json').write_text(json.dumps(results,ensure_ascii=False,indent=2));(E/'manifest.json').write_text(json.dumps(results,ensure_ascii=False,indent=2))
 for s in results:print(s['id'],s['status'],s.get('bytes',s.get('error')))
