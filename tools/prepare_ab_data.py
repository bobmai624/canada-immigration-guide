from pathlib import Path
from bs4 import BeautifulSoup
import json,re,hashlib
P=Path(__file__).resolve().parents[1];A=P/'reports/ab';E=A/'evidence'
def tables(k):
 s=BeautifulSoup((E/(k+'.html.txt')).read_text(),'html.parser');return s.select('main table')
def rows(t):return [[c.get_text(' ',strip=True) for c in r.find_all(['td','th'],recursive=False)] for r in t.select('tr')]
def dump(n,o):(A/n).write_text(json.dumps(o,ensure_ascii=False,indent=2))
noc=json.loads((P/'government/occupations.json').read_text());groups=[]
for k,title,idx,kind in [('abos','阿尔伯塔机会类别：不合格职业',0,'negative'),('abrural','乡村振兴类别：不合格职业',0,'negative'),('abtour','旅游与酒店类别：合格职业',2,'positive')]:
 rr=[]
 for r in rows(tables(k)[idx]):
  if r and re.match(r'^\d{5}',r[0]):
   code=r[0][:5];rr.append(dict(code=code,scope=r[1] if k=='abtour' else r[2],partial='*' in r[0]))
 groups.append(dict(id=k,title=title,kind=kind,source=k,rows=rr))
tech=[dict(code=m[0],scope=m[1].strip(),partial=False) for m in re.findall(r'^([0-9]{5})\s+([^\n]+)',(E/'abtechlist.txt').read_text(),re.M)]
groups.append(dict(id='technology',title='加速科技通路：合格职业',kind='positive',source='abtechlist',rows=tech))
groups.append(dict(id='law',title='执法通路：三个职业类别',kind='positive',source='abee',rows=[dict(code=c,scope=noc[c]['title'],partial=False) for c in ['40040','41310','42100']]))
health=[('31100','临床及实验室专科医生'),('31101','外科医生'),('31102','全科及家庭医生'),('31301','注册护士；需核实具体注册类别'),('32101','执业护士'),('31302','高阶执业护士'),('31303','仅医师助理，不包括该代码全部职业'),('31203','作业治疗师'),('31202','物理治疗师'),('41300','仅临床社会工作者'),('31200','心理学家')]
groups.append(dict(id='health',title='专设医疗通路：九类专业及代码研究映射',kind='profession-mapping',source='abhealth',rows=[dict(code=c,scope=z,partial=True) for c,z in health]))
dump('occupation-groups.json',groups)
raw={k:[rows(t) for t in tables(k)] for k in ['abos','abrural','abtour','processing','communities']};dump('government-tables.json',raw)
# Reuse national official 2021 classification extraction, with original archive and date explicit.
origin=P.parent/'canada-kb/government/raw/noc-elements.csv';dest=E/'noc-elements.csv';dest.write_bytes(origin.read_bytes())
sources=json.loads((A/'sources.json').read_text());registry=json.loads((P/'government/source-register.json').read_text());n=registry['nocelements'];sources=[s for s in sources if s['id']!='noc-elements'];sources.append(dict(id='noc-elements',url=n['url'],title='国家职业分类2021第1.0版：职责与一般就业要求官方数据',checked_on='2026-09-17',status='downloaded',file=dest.name,sha256=hashlib.sha256(dest.read_bytes()).hexdigest(),bytes=dest.stat().st_size,limitation='沿用知识库2026-09-17留存的官方版本；一般就业描述不是阿省执照决定。'))
for s in sources:
 if s.get('file','').endswith('.html.txt'):
  html=BeautifulSoup((E/s['file']).read_text(),'html.parser');h=html.find('h1')
  if h:s['title']=h.get_text(' ',strip=True)
 s['issuer']='阿尔伯塔省政府' if 'alberta.ca' in s['url'] else ('加拿大联邦政府' if any(d in s['url'] for d in ['canada.ca','statcan.gc.ca']) else '学校或法定监管机构')
dump('sources.json',sources);(E/'manifest.json').write_text(json.dumps(sources,ensure_ascii=False,indent=2))
print('Groups',[(g['id'],len(g['rows'])) for g in groups], 'Unique',len({r['code'] for g in groups for r in g['rows']}),'sources',len(sources))
