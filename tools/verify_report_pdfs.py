from pathlib import Path
import json,hashlib
from pypdf import PdfReader
P=Path(__file__).resolve().parents[1];out=[];errors=[]
for prov in ['bc','ab']:
 for p in sorted((P/'reports'/prov/'pdf').glob('*.pdf')):
  reader=PdfReader(p);bad=[i+1 for i,page in enumerate(reader.pages) if abs(float(page.mediabox.width)-595.28)>1 or abs(float(page.mediabox.height)-841.89)>1]
  if bad:errors.append(str(p)+' non-A4 '+str(bad))
  first=reader.pages[0].extract_text() or '';last=reader.pages[-1].extract_text() or ''
  if '政策核对' not in first or 'github.io' not in first:errors.append(str(p)+' missing version metadata')
  if not last.strip():errors.append(str(p)+' empty last page')
  # Local preview URLs must not leak into downloaded PDF link annotations.
  for page in reader.pages:
   for a in page.get('/Annots',[]):
    obj=a.get_object();action=obj.get('/A',{});uri=str(action.get('/URI',''))
    if '127.0.0.1' in uri or uri.startswith('file:'):errors.append(str(p)+' local-only link')
  out.append(dict(file=str(p.relative_to(P)),pages=len(reader.pages),a4=not bad,sha256=hashlib.sha256(p.read_bytes()).hexdigest(),bytes=p.stat().st_size))
assert len(out)==22
(P/'qa/province-reports/pdf-pages.json').write_text(json.dumps({'files':out,'errors':errors},ensure_ascii=False,indent=2));print('Verified',len(out),'PDFs,',sum(x['pages'] for x in out),'A4 pages. Errors:',errors);raise SystemExit(bool(errors))
