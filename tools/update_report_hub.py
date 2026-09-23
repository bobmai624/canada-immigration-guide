from pathlib import Path
from bs4 import BeautifulSoup
R=Path(__file__).resolve().parents[1]
for file,prefix in [('index.html','reports/'),('reports/index.html','')]:
 p=R/file;s=BeautifulSoup(p.read_text(),'html.parser');grid=s.select_one('.report-grid')
 if not grid.select_one('[data-alberta]'):
  card=BeautifulSoup(f'<a class="feature-card" data-alberta href="{prefix}ab/index.html"><span class="tag">新增专题 · 政策核对2026.09.24</span><h2>阿尔伯塔省<br>八类入口，逐关核条件</h2><p>七章＋附录 · 5张流程图 · 110个职业代码<br>10个学校项目 · 官方留存证据 · A4下载</p><b>进入阿尔伯塔省深度报告 →</b></a>','html.parser');grid.insert(0,card)
 bc=grid.select_one('a[href$="bc/index.html"]')
 if bc:
  bc.select_one('.tag').string='政策核对2026.09.22 · 术语/打印更新09.24'
  bc.select_one('b').string='进入不列颠哥伦比亚省深度报告 →'
  para=bc.find('p');para.string='七章＋附录 · 5张流程图 · 109个职业代码 · 10项学校对照；术语完整解释，支持A4下载。'
 stack=grid.select_one('.report-stack')
 if stack:grid.insert_after(stack.extract())
 for text in list(s.find_all(string=True)):
  if '本轮更新范围' in text:continue
  if 'BC 专题政策核对至' in text:text.replace_with('：阿尔伯塔专题政策核对至2026-09-24；不列颠哥伦比亚专题政策核对至2026-09-22，术语和打印于09-24更新；安省、萨省保留原报告及各自日期。')
 for sm in s.select('.regions a[href$="inventory-ab.html"] small'):sm.string='新增完整深度专题'
 p.write_text(str(s))
