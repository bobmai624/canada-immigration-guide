from pathlib import Path
import json,hashlib,sys,re,xml.etree.ElementTree as ET
from urllib.parse import urlsplit,unquote
from bs4 import BeautifulSoup
from report_terms import scan_text
R=Path(__file__).resolve().parents[1];errors=[];stats={};allow_pdf='--before-pdf' in sys.argv
for region in ['bc','ab']:
 folder=R/'reports'/region;pages=list(folder.glob('*.html'));stats[region]={'pages':len(pages),'diagrams':len(list((folder/'diagrams').glob('*.svg')))}
 if len(pages)!=11:errors.append(f'{region}: expected 11 pages')
 for p in pages:
  s=BeautifulSoup(p.read_text(),'html.parser')
  if not s.select_one('[data-print-report]') or not s.select_one('.print-meta'):errors.append(f'{p}: missing print controls')
  for t in s.find_all(string=True):
   if t.parent.name in ['script','style','code'] or str(t).startswith('http'):continue
   for token in scan_text(str(t)):errors.append(f'{p.name}: unexplained {token}: {str(t)[:120]}')
  for el in s.select('[href],[src]'):
   u=urlsplit(el.get('href') or el.get('src'));v=unquote(u.path)
   if u.scheme or u.netloc or not v:continue
   dest=(p.parent/v).resolve()
   if allow_pdf and dest.suffix=='.pdf' and dest.parent.name=='pdf':continue
   if not dest.exists():errors.append(f'{p}: broken link {v}')
   elif u.fragment and dest.suffix=='.html':
    d=BeautifulSoup(dest.read_text(),'html.parser')
    if not d.find(id=unquote(u.fragment)) and not d.find(attrs={'name':u.fragment}):errors.append(f'{p}: missing anchor {v}#{u.fragment}')
 for p in (folder/'diagrams').glob('*.svg'):
  for el in ET.parse(p).getroot().iter():
   if el.tag.endswith('text') or el.tag.endswith('tspan'):
    for t in scan_text(el.text or ''):errors.append(f'{p}: unexplained {t}')
 if region=='ab':
  sources=json.loads((folder/'sources.json').read_text());stats[region]['sources']=len(sources)
  for src in sources:
   if src['status']!='downloaded':errors.append('Unarchived source '+src['id']);continue
   f=folder/'evidence'/src['file']
   if hashlib.sha256(f.read_bytes()).hexdigest()!=src['sha256']:errors.append('Hash mismatch '+src['id'])
   for shot in src.get('screenshots',[]):
    if hashlib.sha256((folder/'evidence'/shot['file']).read_bytes()).hexdigest()!=shot['sha256']:errors.append('Image hash mismatch '+src['id'])
  groups=json.loads((folder/'occupation-groups.json').read_text());counts={g['id']:len(g['rows']) for g in groups};expected={'abos':34,'abrural':17,'abtour':18,'technology':44,'law':3,'health':11}
  if counts!=expected:errors.append('Occupation list counts '+str(counts))
  stats[region]['distinct_occupations']=len({x['code'] for g in groups for x in g['rows']})
  for g in groups:
   for row in g['rows']:
    if not re.fullmatch(r'\d{5}',row['code']):errors.append('Invalid occupational code '+row['code'])
  stat=json.loads((folder/'program-research.json').read_text())
  if len(stat['streams'])!=8:errors.append('Stream inventory incomplete')
  if len(json.loads((folder/'schools-research.json').read_text()))!=10:errors.append('School matrix incomplete')
print(json.dumps({'statistics':stats,'errors':errors[:50],'error_count':len(errors)},ensure_ascii=False,indent=2))
(R/'qa/province-reports/semantic.json').write_text(json.dumps({'statistics':stats,'errors':errors},ensure_ascii=False,indent=2));sys.exit(bool(errors))
