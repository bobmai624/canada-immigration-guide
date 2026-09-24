"""Branching policy architecture matching the user's supplied BC visual reference."""
from html import escape
from pathlib import Path

def build_architecture(path):
 ns='http://www.w3.org/2000/svg'
 out=[f'<svg xmlns="{ns}" viewBox="0 0 1320 1430" role="img" aria-labelledby="title desc"><title id="title">阿尔伯塔省：工人与企业家类别、专项通路及联邦衔接</title><desc id="desc">从阿尔伯塔优势移民计划分为四个工人主类别和四个企业家主类别。科技、执法及医疗快速通道属于省快速通道；医疗另有非快速通道选项。满足适用条件取得省提名后，联邦独立审批永久居民。横向类别为备选，不是连续办理。</desc><defs><marker id="arrow" markerWidth="9" markerHeight="9" refX="7" refY="4" orient="auto"><path d="M0 0L8 4L0 8" fill="none" stroke="#55776e" stroke-width="1.5"/></marker></defs><rect width="1320" height="1430" fill="#fff"/><g font-family="system-ui,PingFang SC,Microsoft YaHei,sans-serif" fill="#193e37">']
 def text(x,y,t,size=19,weight=400,anchor='middle',color='#193e37'):
  out.append(f'<text x="{x}" y="{y}" font-size="{size}" font-weight="{weight}" text-anchor="{anchor}" fill="{color}">{escape(t)}</text>')
 def box(x,y,w,ht,lines,kind='worker'):
  fill,stroke={'worker':('#edf3fc','#a4b8d4'),'business':('#fff6e5','#d8bd81'),'green':('#ecf5ee','#a0bcaa'),'neutral':('#f2f3f2','#bcc4bf')}[kind]
  out.append(f'<rect x="{x}" y="{y}" width="{w}" height="{ht}" rx="12" fill="{fill}" stroke="{stroke}"/>')
  lineh=26;start=y+ht/2-(len(lines)-1)*lineh/2+6
  for i,line in enumerate(lines):
   if isinstance(line,tuple):t,sz=line
   else:t,sz=line,20 if i==0 else 18
   text(x+w/2,start+i*lineh,t,sz,650 if i==0 else 400)
 def arrow(d,dashed=False):out.append(f'<path d="{d}" stroke="#55776e" stroke-width="2" fill="none"'+(' stroke-dasharray="7 5"' if dashed else '')+' marker-end="url(#arrow)"/>')
 text(40,47,'图1｜阿尔伯塔省：两类入口、八个主类别与联邦衔接',29,700,'start')
 text(40,78,'沿分支向下阅读；同一排是不同选项，不是需要依次办理的步骤。',18,400,'start','#62756d')
 box(295,105,730,90,['阿尔伯塔优势移民计划',('阿尔伯塔优势移民计划（Alberta Advantage Immigration Program，AAIP）',17),'省政府负责选择与提名；联邦决定最终永久居民身份'],'green')
 arrow('M510 195 L405 228');arrow('M810 195 L1045 228')
 box(50,230,710,75,['工人类别（Streams for workers）','按工作、雇主、经验、语言与职业资格选择'])
 box(830,230,450,75,['企业家类别（Streams for entrepreneurs）','按背景、资金、商业方案与实际经营选择'],'business')
 # Four peer streams per side; outside connectors do not pass through any card.
 for left,right,center in [(50,760,405),(830,1280,1055)]:
  for y in [392,542]:
   arrow(f'M{center} 305 V318 H{left-15} V{y} H{left}')
   arrow(f'M{center} 305 V318 H{right+15} V{y} H{right}')
 box(50,335,345,115,['阿尔伯塔机会类别',('Alberta Opportunity Stream',18),'已在阿省持合格工签工作','核学历、相关经验和雇主'])
 box(415,335,345,115,['阿尔伯塔快速通道类别',('Alberta Express Entry Stream',18),'先符合联邦快速通道资格','再符合阿省选择条件'])
 box(50,485,345,115,['乡村振兴类别',('Rural Renewal Stream',18),'指定社区职位＋社区背书','境内外申请的职业范围不同'])
 box(415,485,345,115,['旅游与酒店类别',('Tourism and Hospitality Stream',18),'指定工签＋合格行业/雇主','同一雇主至少连续工作6个月'])
 box(830,335,215,115,['乡村企业家类别',('Rural Entrepreneur',17),('Stream',17),'社区支持＋真实经营'],'business')
 box(1065,335,215,115,['毕业生企业家类别',('Graduate Entrepreneur',17),('Stream',17),'阿省合格毕业生创业'],'business')
 box(830,485,215,115,['海外毕业生企业家',('Foreign Graduate',17),('Entrepreneur Stream',17),'境外学位＋机构推荐'],'business')
 box(1065,485,215,115,['农场类别',('Farm Stream',17),'农业能力＋资金','初级农业生产投资'],'business')
 # A labelled detail layer avoids placing the non-Express-Entry medical option under Express Entry.
 text(50,641,'工人类别的专项通路：分清所属类别与联邦衔接',21,700,'start')
 box(50,665,710,112,['省快速通道内：科技、执法、医疗快速通道',('Accelerated Tech / Law Enforcement / Dedicated Health Care',17),'科技核职业与雇主行业；执法核指定招聘；医疗核专业执业能力','它们是所属类别内的通路，不另计为三个主类别'])
 # Connector from Express Entry uses the central gap, clear of other stream cards.
 arrow('M587 450 V467 H405 V616 H780 V721 H760',True)
 box(50,799,710,105,['医疗另有非快速通道选项',('Dedicated Health Care Pathway — Non-Express Entry',18),'只在不符合省快速通道且满足该选项条件时研究','符合快速通道要求者须使用快速通道选项'],'neutral')
 text(50,932,'两种医疗选项不可互相替代；专业、职位及监管要求另核。',17,400,'start','#62756d')
 arrow('M1055 600 V655')
 box(830,660,450,137,['三类企业家：按适用方案经营履约','意向表达 → 获邀 → 商业申请','按批准方案处理工作许可、经营和报告','已实际经营的合格申请人有不同时间规则'],'business')
 box(830,819,450,85,['农场类别：按独立流程审查','农业经营能力、资金及商业可行性','不套用另外三类企业家的意向表达池'],'business')
 arrow('M1172 600 V622 H1304 V861 H1280',True)
 box(50,959,710,83,['工人申请：满足资格 → 意向表达 → 获邀 → 完整申请','名额、分数和选择重点影响邀请；入池不保证提名'])
 box(830,959,450,83,['企业家申请：真实经营与适用条件核验','完成对应类别审查后，才可能获得省提名'],'business')
 arrow('M405 1042 V1073');arrow('M1055 1042 V1073')
 box(50,1075,710,104,['取得省提名：按所选类别衔接联邦','省快速通道提名 → 联邦快速通道程序','其他适用工人提名 → 联邦非快速通道省提名程序'])
 box(830,1075,450,104,['取得省提名','企业家类别衔接联邦','非快速通道省提名程序'],'business')
 arrow('M405 1179 V1200 H660 V1218');arrow('M1055 1179 V1200 H660 V1218')
 box(50,1220,1230,105,['加拿大移民、难民及公民部独立审批永久居民申请',('加拿大移民、难民及公民部（Immigration, Refugees and Citizenship Canada，IRCC）',18),'省提名 ≠ 永久居民批准；入池、申请或提名都不会自动产生或延长工作权'],'green')
 text(50,1360,'实线：主要分类与办理衔接　　虚线：专项说明；不代表新增独立主类别',18,400,'start','#62756d')
 text(50,1392,'官方来源：阿省计划总览、专设医疗及各类别申请页｜核对：2026-09-24｜本库整理示意图',17,400,'start','#62756d')
 out.append('</g></svg>');Path(path).write_text(''.join(out))
