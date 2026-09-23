from pathlib import Path
from bs4 import BeautifulSoup, Doctype, Comment
from report_terms import expand_text,CONTROLLED_TERMS,full
import re,xml.etree.ElementTree as ET
R=Path(__file__).resolve().parents[1]
for path in (R/'reports/bc').glob('*.html'):
 s=BeautifulSoup(path.read_text(),'html.parser')
 for t in list(s.find_all(string=True)):
  if isinstance(t,(Doctype,Comment)) or t.parent.name in ['script','style','code'] or str(t).startswith('http'):continue
  text=str(t)
  # Old compact forms are expanded without changing URL/file identifiers.
  text=re.sub(r'\b(CLB|TEER|CIP|IELTS|CAD)(?=\d)',lambda m:full(m[1])+' ',text)
  text=text.replace('CELPIP-General',full('CELPIP')+' General')
  text=expand_text(text)
  t.replace_with(text)
 for img in s.select('img[alt]'):img['alt']=expand_text(img['alt'])
 if not s.select_one('[data-print-report]'):
  title=s.h1.get_text();url='https://bobmai624.github.io/canada-immigration-guide/reports/bc/'+path.name
  toolbar=BeautifulSoup('<div class="print-toolbar"><button class="print-action" data-print-report>打印 / 保存 A4 PDF</button><a class="pdf-download" href="pdf/'+path.stem+'.pdf" download>下载本页 A4 PDF</a><span class="print-hint">政策核对仍为2026-09-22；术语及打印版更新2026-09-24。折叠内容打印时完整展开。</span></div><div class="print-meta">'+title+'<br>政策核对：2026-09-22 · 排版更新：2026-09-24<br>'+url+'</div>','html.parser')
  s.select_one('.report-title').insert_after(toolbar)
 path.write_text(str(s))
# The same diagrams and layout are retained. Long abbreviations become full Chinese labels,
# with English+abbreviation explanations in the HTML figure captions.
for path in (R/'reports/bc/diagrams').glob('*.svg'):
 s=path.read_text()
 for k in sorted(CONTROLLED_TERMS,key=len,reverse=True):
  s=re.sub(r'(?<![A-Za-z0-9_-])'+re.escape(k)+r'(?![A-Za-z0-9_-])',CONTROLLED_TERMS[k][0],s)
 path.write_text(s)
print('Revised 11 BC pages and 5 diagrams')
