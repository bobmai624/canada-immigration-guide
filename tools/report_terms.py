"""Expand each policy abbreviation; archived originals are deliberately untouched."""
import re
CONTROLLED_TERMS={
'BC PNP':('不列颠哥伦比亚省省提名计划','British Columbia Provincial Nominee Program'),
'AAIP':('阿尔伯塔优势移民计划','Alberta Advantage Immigration Program'),
'IRCC':('加拿大移民、难民及公民部','Immigration, Refugees and Citizenship Canada'),
'PNP':('省提名计划','Provincial Nominee Program'),'BC':('不列颠哥伦比亚省','British Columbia'),
'EEBC':('不列颠哥伦比亚省快速通道衔接选项','Express Entry British Columbia'),
'ELSS':('入门及半技术工人类别','Entry Level and Semi-Skilled'),
'SIRS':('技能移民注册系统','Skills Immigration Registration System'),
'SI':('技能移民','Skills Immigration'),'SW':('技术工人类别','Skilled Worker'),'HA':('卫生局类别','Health Authority'),
'EOI':('意向表达','Expression of Interest'),'WEOI':('工人意向表达','Worker Expression of Interest'),
'ITA':('申请邀请','Invitation to Apply'),'NOI':('意向通知','Notification of Interest'),
'NOC':('国家职业分类','National Occupational Classification'),
'TEER':('培训、教育、经验与职责等级','Training, Education, Experience and Responsibilities'),
'CLB':('加拿大语言基准','Canadian Language Benchmarks'),
'NCLC':('加拿大法语语言基准','Niveaux de compétence linguistique canadiens'),
'LMIA':('劳动力市场影响评估','Labour Market Impact Assessment'),
'PGWP':('毕业后工作许可证','Post-Graduation Work Permit'),
'BOWP':('过渡性开放工作许可证','Bridging Open Work Permit'),
'PR':('永久居民','Permanent Resident'),'EE':('快速通道','Express Entry'),
'CEC':('加拿大经验类移民','Canadian Experience Class'),'FSW':('联邦技术工人计划','Federal Skilled Worker Program'),
'FSWP':('联邦技术工人计划','Federal Skilled Worker Program'),'FST':('联邦技工计划','Federal Skilled Trades Program'),
'FSTP':('联邦技工计划','Federal Skilled Trades Program'),'CRS':('综合排名系统','Comprehensive Ranking System'),
'ECA':('学历认证评估','Educational Credential Assessment'),'DLI':('指定学习机构','Designated Learning Institution'),
'CIP':('教学项目分类','Classification of Instructional Programs'),
'RCIP':('乡村社区移民试点','Rural Community Immigration Pilot'),
'FCIP':('法语社区移民试点','Francophone Community Immigration Pilot'),
'CAD':('加元','Canadian Dollar'),'AOR':('收件确认','Acknowledgement of Receipt'),
'PAL':('省级证明信','Provincial Attestation Letter'),'TAL':('地区级证明信','Territorial Attestation Letter'),
'IELTS':('雅思考试','International English Language Testing System'),
'CELPIP':('加拿大英语能力指数考试','Canadian English Language Proficiency Index Program'),
'PTE':('培生英语考试','Pearson Test of English'),
'TEF':('法语评估考试','Test d’évaluation de français'),'TCF':('法语知识考试','Test de connaissance du français'),
'ECE':('幼儿教育工作者','Early Childhood Educator'),'ECEA':('幼儿教育助理','Early Childhood Educator Assistant'),
'HCA':('健康护理助理','Health Care Aide'),'LPN':('执业护士','Licensed Practical Nurse'),'RN':('注册护士','Registered Nurse'),
'NP':('高阶执业护士','Nurse Practitioner'),'BPA':('商业履约协议','Business Performance Agreement'),
'RES':('乡村企业家类别','Rural Entrepreneur Stream'),'GES':('毕业生企业家类别','Graduate Entrepreneur Stream'),
'FGES':('海外毕业生企业家类别','Foreign Graduate Entrepreneur Stream'),'AOS':('阿尔伯塔机会类别','Alberta Opportunity Stream'),
'RRS':('乡村振兴类别','Rural Renewal Stream'),'EDO':('经济发展组织','Economic Development Organization'),
'NAICS':('北美行业分类系统','North American Industry Classification System'),
'AIT':('阿尔伯塔学徒与行业培训体系','Alberta Apprenticeship and Industry Training'),
'PG':('研究生层级','Post-Graduate'),'VCC':('温哥华社区学院','Vancouver Community College'),
'BCIT':('不列颠哥伦比亚理工学院','British Columbia Institute of Technology'),
'UBC':('不列颠哥伦比亚大学','University of British Columbia'),
'SFU':('西蒙弗雷泽大学','Simon Fraser University'),'VIU':('温哥华岛大学','Vancouver Island University'),
'TRU':('汤普森河大学','Thompson Rivers University'),'KPU':('昆特兰理工大学','Kwantlen Polytechnic University'),
'UVic':('维多利亚大学','University of Victoria'),'CNC':('计算机数控','Computer Numerical Control'),
'BCACC':('不列颠哥伦比亚省临床咨询师协会','British Columbia Association of Clinical Counsellors'),
'BCCNM':('不列颠哥伦比亚省护士与助产士监管学院','British Columbia College of Nurses and Midwives'),
'BCCSW':('不列颠哥伦比亚省社会工作者监管学院','British Columbia College of Social Workers'),
'JAL':('职位批准函','Job Approval Letter'),'SINP':('萨斯喀彻温省移民提名计划','Saskatchewan Immigrant Nominee Program'),
'EPA':('雇佣职位评估','Employment Position Assessment'),
}
CONTROLLED_TERMS.update({
'EI':('企业家移民','Entrepreneur Immigration'),'WCB':('工伤赔偿委员会','Workers’ Compensation Board'),
'NIC':('北岛学院','North Island College'),'NLC':('北光学院','Northern Lights College'),'CST':('计算机系统技术','Computer Systems Technology'),
'PLAR':('先前学习评估与认可','Prior Learning Assessment and Recognition'),'CRC':('犯罪记录检查','Criminal Record Check'),
'TB':('结核病','Tuberculosis'),'CPR-C':('C级心肺复苏','Cardiopulmonary Resuscitation Level C'),'CPR-BLS':('心肺复苏及基础生命支持','Cardiopulmonary Resuscitation – Basic Life Support'),
'CPR':('心肺复苏','Cardiopulmonary Resuscitation'),'BSN':('护理学学士','Bachelor of Science in Nursing'),'PPE':('个人防护装备','Personal Protective Equipment'),
'FOODSAFE':('食品安全培训','FOODSAFE Food Safety Training'),'DPECES':('幼儿教育文凭项目代码','Early Childhood Education Diploma program code'),
'PDEP':('营养教育与实践合作组织','Partnership for Dietetic Education and Practice'),'CDRE':('加拿大营养师注册考试','Canadian Dietetic Registration Exam'),
'EPPP':('心理学专业执业考试','Examination for Professional Practice in Psychology'),'CAGC':('加拿大遗传咨询师协会','Canadian Association of Genetic Counsellors'),
'CACPT':('加拿大心肺技术人员协会','Canadian Association of Cardio-pulmonary Technologists'),'CMRTO':('安省医学放射技术人员监管学院（原名称）','College of Medical Radiation Technologists of Ontario'),
'ACVIM':('美国兽医内科学会','American College of Veterinary Internal Medicine'),'ABVP':('美国兽医执业委员会','American Board of Veterinary Practitioners'),
'LEED':('能源与环境设计先锋认证','Leadership in Energy and Environmental Design'),'CWC':('认证在职主厨','Certified Working Chef'),'CCC':('认证行政主厨','Certified Chef de Cuisine'),
'CCI':('加拿大烹饪学院','Canadian Culinary Institute'),'CCF':('加拿大烹饪联合会','Canadian Culinary Federation'),'APR':('认证公共关系资格','Accredited in Public Relations'),
'CISA':('认证信息系统审计师','Certified Information Systems Auditor'),'CISM':('认证信息安全经理','Certified Information Security Manager'),'CIA':('认证内部审计师','Certified Internal Auditor'),
'CBCPO':('加拿大假肢及矫形师认证委员会','Canadian Board of Certification of Prosthetists and Orthotists'),'CAPO':('加拿大假肢及矫形师协会','Canadian Association of Prosthetists and Orthotists'),
'CMRP':('认证市场研究专业人员','Certified Marketing Research Professional'),'CHRP':('认证人力资源专业人员','Certified Human Resources Professional'),
'CLHA':('阿省执业护士与健康护理助理监管学院','College of Licensed Practical Nurses and Health Care Aides of Alberta'),
'IT':('信息技术','Information Technology'),'HR':('人力资源','Human Resources'),
'CAD-CAM':('计算机辅助设计与制造','Computer-Aided Design and Computer-Aided Manufacturing'),
})
def full(k):
 zh,en=CONTROLLED_TERMS[k];return f'{zh}（{en}，{k}）'
pattern=re.compile(r'(?<![A-Za-z0-9_-])('+'|'.join(re.escape(k) for k in sorted(CONTROLLED_TERMS,key=len,reverse=True))+r')(?![A-Za-z_-])')
def protect(text):
 saved=[]
 def hold(m):saved.append(m.group());return f'\uE000{len(saved)-1}\uE001'
 # protect complete explanations, URLs, and stable evidence identifiers
 text=re.sub('|'.join(re.escape(full(k)) for k in sorted(CONTROLLED_TERMS,key=len,reverse=True)),hold,text)
 text=re.sub(r'https?://[^\s<>]+',hold,text)
 return text,saved
def expand_text(text):
 text=text.replace('computer numerical control (CNC)', '计算机数控（Computer Numerical Control，数控）').replace('computer numerical control (新喀里多尼亚学院（College of New Caledonia，CNC）)', '计算机数控（Computer Numerical Control，数控）')
 text,saved=protect(text)
 text=pattern.sub(lambda m:full(m.group()),text)
 return re.sub(r'\uE000(\d+)\uE001',lambda m:saved[int(m[1])],text)
def scan_text(text):
 text,_=protect(text);return [m.group() for m in pattern.finditer(text)]
