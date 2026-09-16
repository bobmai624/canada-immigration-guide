(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.CanadaIntake=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
 'use strict';
 const provinces={bc:'卑诗省',ab:'阿尔伯塔省',sk:'萨斯喀彻温省',mb:'曼尼托巴省',yt:'育空地区',nt:'西北地区',nu:'努纳武特地区'};
 const titles={federal:'联邦入口与分数',work:'工作许可与身份衔接',study:'留学、课程与毕业工签',careers:'职业执照与真实就业',regions:'地区比较',family:'配偶、子女与家庭团聚',business:'经营路线的可行性',budget:'完整预算',consultant:'复杂个案与文件复核',forecast:'未来政策与改道条件',timeline:'阶段时间表'};
 function assess(input){
  const a={...input,family:input.family||[],history:input.history||[]};
  if(!['third','hmt'].includes(a.place)){delete a.residence;delete a.thirdExpiry;delete a.country;}
  if(a.place!=='canada')delete a.currentProvince;
  if(['none','pr','citizen'].includes(a.caStatus))delete a.caExpiry;
  const r={alerts:[],routes:[],reading:[],documents:[],research:[],actions:[],cases:[],answers:a};let sequence=0;
  const alert=(id,title,text,keys=[])=>r.alerts.push({id,title,text,keys});
  const read=(slug,reason,priority=50)=>{const old=r.reading.find(x=>x.slug===slug);if(old){if(priority<old.priority){old.priority=priority;old.reason=reason;}return;}r.reading.push({slug,title:titles[slug]||provinces[slug],reason,priority,order:sequence++});};
  const doc=(id,title,text)=>{if(!r.documents.some(x=>x.id===id))r.documents.push({id,title,text});};
  const source=(key,look,output)=>{if(!r.research.some(x=>x.key===key))r.research.push({key,look,output});};
  const route=(id,title,why,missing,keys)=>r.routes.push({id,title,why,missing,keys});
  const action=(when,title,text)=>r.actions.push({when,title,text});
  doc('identity','一张身份时间线','列出所有护照、每次入境、现有居留文件、许可到期日、已递交申请和出入境计划。签证、许可、居留身份分列，不用一句“有签证”代替。');
  doc('career','一张学历与工作月份表','教育起止、学位、全日制状态；工作职责、带薪时数、所在国家、雇佣或自雇、许可依据。先整理事实，再匹配 NOC 职业代码。');
  doc('language','语言与资金原件','语言考试名称、日期、四项分数；可动用现金、债务、学费与家庭支出。未知项标为待补，不估算成已达标。');
  if(a.place==='mainland'){
   alert('mainland','你现在在中国大陆','先以境外学历、经验、语言和真实工作邀请评估。没有加拿大经历不代表必须先买留学；有其他国家经历也应完整列入。',['fsw','outsidework']);
  }else if(['third','hmt'].includes(a.place)){
   alert('residence','先把护照与现居地分开','目前住在其他国家或地区，会改变递交材料、身份连续性和办证安排；不会仅因居住在当地自动获得加拿大特殊国籍项目资格。',['outsidework','iec']);
   doc('residence','现居国家或地区的合法居留证据','居留许可或电子身份、入境记录、工作或在读证明、到期与续签计划。持有当地永居不等于持有当地国籍；其他国家的续签权也不是加拿大维持身份。');
   doc('police','多国居住记录与无犯罪证明计划','按年月列过去居住国家，区分成年前后及连续居住期；按加拿大拟申请项目与各国办证规则确定何时申请证明，避免漏报或过早过期。');
   source('outsidework','打开 Gather Documents 及申请表的现居地、合法身份部分。','记录申请国家、当地身份证据和该签证办公室清单；不是只写“中国护照”。');
   source('police','打开 Who needs police certificates 与 When the certificate must be issued。','画出国家—居住日期—所需证明—申请机关—预计办理时间表；EE 规则不要直接套用其他项目。');
   if(['student','graduate'].includes(a.residence))alert('foreign-study','境外毕业 ≠ 加拿大毕业','澳洲、英国等地学历按外国学历研究 ECA；外国毕业生签证不能转换成加拿大 PGWP。若你还曾完成加拿大课程，应单独复核那段学业。',['pgwp','fsw']);
   if(a.residence==='work')doc('foreign-work','第三国雇佣与工作授权','保存当地工签、雇佣合同、工资税单、职责证明及雇主联系方式；离职前确认今后能否取得经验信。加拿大是否认可经验仍按目标项目逐项核。');
   if(a.residence==='pr')alert('foreign-pr','当地永居可作为备用落脚方案','先核当地返居和保留身份规则，评估加拿大长期居住是否影响原有安排。它可能降低搬迁风险，但本身不是加拿大移民资格。',['outsidework','iec']);
   if(a.residence==='visitor')alert('foreign-visitor','第三国短期访问与长期居住不同','先核当前合法停留期、是否可在当地完成所需程序和文件清单。不要仅为“换递交地”付费迁居；短期停留本身不是加拿大获批优势。',['outsidework']);
   if(a.residence==='dependent')doc('dependent-residence','依附家属的当地居留','保存主申请人的身份、关系证据及你的独立工作权依据；主申请人离职或离境是否影响家属，按现居地规则另核。');
   if(a.residence==='renewal')alert('foreign-renewal','第三国续签待审要单独确认权利','保存原许可、回执、递交日期与旅行安排；当地是否可工作或离境，须查当地官方规则，不以加拿大指南推断。',['outsidework']);
   if(['expired','unknown'].includes(a.residence)||['soon','expired'].includes(a.thirdExpiry)){
    alert('third-urgent','先处理现居地的身份期限','当地身份可能先于加拿大方案到期。立即找当地合资格人员确认续留或离境方案，并核查是否影响加拿大递交材料和旅行；本报告不判定该国的续签权利。',['outsidework']);
    read('consultant','先整理现居地身份与申请地点；不能把加拿大维持身份规则套到第三国。',0);
   }
  }else if(a.place!=='canada')alert('place-unknown','先确认实际居住地点','若正在跨国迁居，分别写今天所在地、通常居住地和预期递交地；三者可能不同。',['outsidework']);
  if(a.passport!=='mainland'){
   alert('passport','国籍专项需要单独核查','非大陆护照、多本护照或国籍待确认者，应以实际有效国籍文件核查 IEC 与特别公共政策。第三国永居或港澳居留卡不能直接当作该地护照。',['iec']);
   source('iec','查看所持国籍和具体工作假期类别。','记录年龄、国籍、居住及参与条件；未列出的普通双边入口不能靠换居住地取得。');
  }
  const settled=['pr','citizen'].includes(a.caStatus);
  const special=['refugee','protected'].includes(a.caStatus);
  const urgent=!settled&&(a.caExpiry==='soon'||a.caExpiry==='expired'||['restoration','expired'].includes(a.caStatus));
  if(urgent){
   alert('ca-urgent','优先级 1：核清加拿大身份和工作授权','你选择了已到期、恢复身份中或剩余不超过 3 个月。先核原许可、递交时间、申请类型、是否离境及当前授权；仅 PR / EOI 在办不会自动延长工作权。不要等下一轮邀请再处理。',['maintained','insidework','bowp']);
   read('work','许可时间紧迫，先解决能否停留和工作，再看移民竞争。',0);
   source('maintained','逐项读与你递交申请类型相符的分支。','把许可到期、递交回执、申请类别和离境记录排成时间线；请专业人员写明当前能否工作。');
   action('现在','先核授权，不等抽选','按日整理到期和递交记录；存在空档或不确定工作权时，立即做专业复核及合法停工、续留或离境预案。');
  }
  if(a.place==='canada'&&!settled){
   source('insidework','查 Who may apply from within Canada 以及你所属的申请类别。','记录境内申请的明确依据；“人在加拿大”不是资格本身。');
   if(['none','unknown'].includes(a.caStatus)||a.caExpiry==='unknown'){
    alert('status-unknown','先找文件，不根据签证贴纸判断身份','查看最近入境章、Visitor Record、学习或工作许可及待审申请；签证有效期和获准停留期可能不同。',['insidework']);
    read('work','境内身份尚未核清；先确认有效停留与许可。',1);
   }
   if(a.caStatus==='visitor'){
    alert('visitor','访客身份通常不附带工作权','允许访客在境内申请工签的普遍临时政策已于 2024-08-28 结束。仍须查是否存在适用的独立例外；拿到 offer 也不能直接开工。',['visitorend','insidework']);
    read('work','你是访客：先核能否申请与何时可开工。',0);source('visitorend','核对结束日期，并回到现行境内申请资格。','不要使用仍宣传旧“旅游转工签”临时政策的教程。');
   }
   if(a.caStatus==='maintained'){
    alert('maintained','维持身份要看递交的是什么','及时递交合格工签延期，可能在留加期间按原条件工作；改申请访客或学签不会让已到期工签的工作权自动延续。旅行及换雇主须另核。',['maintained']);
    read('work','先确认维持身份的依据和工作条件。',0);source('maintained','区分 work permit、study permit、visitor record 三种申请。','保存递交日期与原许可条件；把“可停留”和“可工作”分别确认。');
   }
  }
  if(a.place!=='canada'&&['maintained','restoration'].includes(a.caStatus)){
   alert('outside-maintained','人在境外，不能沿用境内工作权假设','你选了维持身份或恢复身份，但目前不在加拿大；离境可能改变待审期间权利与再入境安排，需要核文件和出入境日期。',['maintained','insidework']);read('work','境外位置与所选境内身份状态需要联合复核。',0);
  }
  if(a.caVisa==='expired')alert('visa','签证过期不等于许可同时过期','重新入境文件、加拿大境内停留资格、工作许可分别核查。出行前确认有效护照、适用签证或 eTA 及许可；不要仅凭许可订返程。',['outsidework']);
  if(a.caStatus==='employer'){
   alert('employer','封闭工签：新 offer 不等于可立即换工作','核许可上的雇主、岗位、地点与限制。换雇主须确认新许可或适用的先行工作授权，不能只因递交申请就开始新工作。',['maintained','insidework']);read('work','雇主特定许可会约束换岗和跨省安排。',5);
  }
  if(!settled&&!special&&['3-6','6-12'].includes(a.caExpiry)){
   alert('ca-countdown','剩余许可不足一年：现在倒排时间','把合格经验尚缺月份、语言考试、雇主程序和下一份许可依据放在同一张表。省邀请和 PR 处理不能按理想时间保证；3—6 个月者优先落实衔接。',['bowp','insidework']);
   read('work','许可剩余不足一年，先核下一步身份依据与经验能否接上。',a.caExpiry==='3-6'?3:11);
  }
  if(['spouse','open'].includes(a.caStatus)){
   alert('open-permit','开放工签也有期限与具体限制','核许可正文的行业、医疗等限制；配偶开放工签还应单独核下一次延长依据。主申请人工作或学业变化可能需要重新评估。',['workerspouse','studentspouse']);
   read('work','你已有开放工签，先盘点剩余工作时间及许可条件。',16);
   if(a.caStatus==='spouse')source('workerspouse','先确定你是工人配偶还是学生配偶，再进入相应官方规则。','保存主申请人的许可、课程或职业证据与各自到期日；学生配偶另查本库家庭页链接。');
  }
  if(a.history.length){
   alert('history','历史问题优先拿原件审查','拒签原因、逾期或工作违规、刑事或健康问题不能用通用分流作结论。先整理决定信和时间线；有程序期限时优先处理。这里不要求输入敏感细节。',['rep']);
   read('consultant','你标记了历史问题，先判断是否影响可入境性、资格或时间安排。',urgent?1:0);doc('history','历史申请与决定文件','所有相关递交副本、拒签或决定信、解释、法院或医疗文件，交给获授权专业人员审查，不上传到本页。');
  }
  if(settled){
   alert('settled','你本人已经不是普通“移民拿 PR”分流对象','加拿大 PR 或公民应先确定咨询的是本人身份义务、返加文件，还是担保家人。PR 卡到期不等于 PR 身份自动消失；本页不判断居住义务或国籍冲突。',['family','rep']);
   read(a.family.length||a.goal==='family'?'family':'consultant','先确认本人身份维护或家属需求，不重复设计本人经济移民。',0);
   route('settled','本人身份维护 / 家属独立评估','你选择了加拿大 PR 或公民。','核实际身份证据、居住记录和拟担保关系；家属不会因你持有 PR 自动取得身份。',['family','rep']);
  }else if(special){
   alert('special','难民申请与受保护身份需要专门分流','待审难民申请、获保护决定与普通临时居民身份不是同一类。先核决定、上诉或离境程序、许可和家属；不由职业或分数直接给路线。',['rep']);
   read('consultant','这属于个案法律程序审查，先明确当前状态和期限。',0);
   route('special','专业个案审查','你选择了难民申请中或受保护人士。','由获授权人员核文件后选择适用类别；本知识库不覆盖完整保护程序。',['rep']);
  }else{
   if(['12plus','6-11','under6'].includes(a.caExp)){
    route('cec','研究加拿大经验类别 CEC','你有加拿大非全日制在读期间的受雇工作记录。','逐月核近 3 年合法、带薪、TEER 0—3 的合格经验；达到至少 1 年仍须语言、资格及获邀。未满者先累计，不代表现在能递交。',['cec']);
    read('federal','先区分你的哪些工作月份可计入 CEC；工签本身不证明经验合格。',12);source('cec','查看 Canadian skilled work experience 与语言要求。','做一张可计 / 不可计月份表，标注职责、时数、学生状态与授权。');
   }else if(a.caExp==='student')alert('student-work','学生打工先单列','CEC 通常不计全日制在读期间的加拿大工作。某些省项目、FSW 或其他类别规则不同，不能跨项目复制结论。',['cec','fsw']);
   else if(a.caExp==='self'){
    alert('self-work','自雇经验不能直接按普通 CEC 算','CEC 通常不计自雇，特定医生政策等例外须逐项核。境外自雇及其他类别另查。',['cec']);
    source('cec','查 Self-employment and student work experience 及明确例外。','先区分雇员、承包和自雇；不能把收到工资或报税直接当作 CEC 受雇证明。');
   }
   if(['1-2','2plus'].includes(a.foreignExp)){
    route('fsw','先比较境外技术移民基础','你有至少一年境外经验，值得先检查 FSW，再决定是否留学。','核连续性、NOC、带薪记录、语言、学历 ECA、67 分及资金；时间长不等于全部经验合格。',['fsw']);
    read('federal','先检查已有境外技能能否满足基础入口，减少重复读书。',20);source('fsw','依次看工作、语言、学历、Selection factors。','完成“已证实 / 缺证据 / 不满足”三列表；不要先假设已能入池。');
   }
   if(a.french==='7plus'){
    route('french','法语类别 + 魁省外工作机会','你自报法语四项达到 NCLC 7 或以上。','先核认可考试和有效期，再核 EE 基础资格；法语流动工签还需要真实 offer 与雇主程序。',['category','mobility']);read('federal','法语类别需叠加 EE 基础资格，先查这一层。',a.goal==='family'?15:8);
   }else if(a.french==='5-6')route('french-work','先研究法语流动工作许可','法语可能拓展魁省外雇主机会。','本页按四项最低等级粗分；工签须另核听说证明、真实工作、岗位限制及雇主合规。达到听说 NCLC 5 不等于 EE 法语四项 7。',['mobility']);
   if(['7plus','5-6'].includes(a.french))source('mobility','看法语听说证据、魁省外工作地点及岗位例外。','分别列“工签条件”和“未来 PR 条件”，不把两个语言门槛混写。');
   if(['study','pgwp'].includes(a.caStatus)||['current','graduate'].includes(a.caStudy)||a.goal==='study'){
    route('pgwp',a.caStatus==='pgwp'?'毕业工签剩余时间规划':'加拿大教育与 PGWP 单独核验','你有加拿大教育或留学意向，需要建立学习—授权工作—合格经验的时间线。',a.caStatus==='pgwp'?'核剩余许可和可计经验；PGWP 通常只能一次，再读书不能自动再领。':'逐项确认 DLI、具体课程、CIP（如适用）、学习状态、完成日期、语言与申请时点；学校录取不等于 PGWP 合格。',['pgwp','pgwpapply']);
    read(a.caStatus==='pgwp'?'work':'study',a.caStatus==='pgwp'?'先算剩余工签与经验缺口；不能把再留学当作自动续签。':'你的加拿大课程或留学目标必须先过 PGWP 与学业核验。',a.caStatus==='pgwp'?15:10);
    doc('study','加拿大课程完整记录','DLI、校区、课程层级、CIP、录取及毕业文件、逐学期成绩和全日制记录、停学换校情况、学签与 PGWP 历史。境外课程单列。');
    source('pgwp','按学位 / 非学位、学签递交时间阅读资格分支。','学校、课程、语言、专业、学籍、申请时间逐项保存原文与日期。');
    source('pgwpapply','查何时申请，以及等待决定时能否工作。','建立毕业确认日—许可到期日—递交日的日历，并核待审工作条件。');
    if(a.goal==='study')read('budget','先证明不依赖未来打工也能支付学习和家庭生活。',25);
   }
   if(['written','support'].includes(a.offer)){
    route('employer','真实雇主支持的工作与地方路线','你已有书面工作邀请，可以开始核实岗位和雇主。','确认工作地点、NOC、工资、时数、雇主资格和具体支持程序。愿意支持不等于 LMIA、提名或工签获批。',['tfwp','pnp']);
    read('work','书面 offer 要拆成岗位真实性、雇主程序、本人许可三个检查。',18);
   }
   if(a.goal==='business'||a.occupation==='business'){
    route('business','真实经营路线可行性','你选择企业经营背景或创业目标。','核管理经历、净资产来源、可投资资金、真实运营义务及当期开放情况；注册公司不等于移民。',['suv','bcbiz']);read('business','先判断是否真能经营、承受资金与业绩风险。',6);doc('business','经营与资产证据','持股、任职、报税、财务报表、资金形成过程、拟落地行业与客户证据。');source('bcbiz','比较企业家项目的净资产、投资、管理经历与业绩要求。','把“拥有资产”和“能投入经营并达标”拆开，标注当前开放状态。');
   }
  }
  if(a.goal==='family'||a.family.includes('sponsor')||a.family.includes('parent')){
   if(!special)route('family','亲属关系与担保资格先核验','你选择家庭团聚目标或加拿大近亲。','核担保人的身份、关系、居住与财务要求、类别是否接收；普通亲属或成年子女 PR 不自动带来本人 PR。',['family']);
   read('family','真实亲属关系可能改变主线，先查谁能担保谁。',urgent?8:4);source('family','选择实际亲属类别，不只看“有亲人在加拿大”。','列出担保人身份、关系证据、各自居住地与该类别当前接收状态。');
  }else if(a.family.length)read('family','配偶工作权与孩子学业、费用、年龄须独立安排。',28);
  if(a.family.length){doc('family','家庭成员逐人清单','每人国籍、身份、年龄、是否随行；婚姻或同居证据、子女出生与监护文件。配偶工签要独立核资格。');source('family','先辨随行家属与担保团聚，再打开对应类别。','全家每人一行：进入依据、能否工作或上学、到期日、资金。');}
  if(a.family.includes('age22')){alert('child-age','子女年龄不要等毕业后才看','接近 22 岁的子女，应先核受养资格、锁龄日期、婚姻及适用例外；不能统一按今天年龄保证 3 年后的随行资格。',['child']);source('child','查目标项目的受养定义与锁龄日期。','记录孩子生日、关系、婚姻情况和适用锁龄点；让顾问把时间风险写入方案。');}
  const regulated=['nurse','doctor','allied','ece','teacher'].includes(a.occupation);
  if(!settled&&!special){
   if(a.caStudy==='interrupted'){
    alert('study-gap','曾停学、转学或未完成：先审学籍时间线','先核各学期状态、实际学习、许可条件和学校变更；不能直接按“曾在加拿大读过书”推定 PGWP 或期间工作合规。',['pgwp','studentwork']);
    read('study','学籍变化可能影响 PGWP 与工作授权，先补学校记录。',6);doc('study-gap','学籍变更记录','原学校与新学校通知、每学期成绩、休学批准、转学和学习许可记录；逐月写清身份、学习与工作。');
   }
   source('intakenoc','按真实职责查职业说明和 TEER，不只搜职位名称。','给每段工作记录一个候选 NOC，附职责对应证据；存在两种可能时交顾问复核。');
   source('intakelanguage','按考试及四项成绩换算，核认可考试类型与有效期。','记录听说读写四个等级与失效日期；入学考试不自动可用于移民。');
   if(a.education&&a.education!=='unknown')source('intakeeca','看 Who needs an ECA 及认可机构；区分加拿大与境外学历。','先确认要评哪份学历，再准备授予院校成绩等材料；ECA 不是职业执照。');
   if(a.goal==='work'&&!['written','support'].includes(a.offer)){
    route('job-search','合法求职与工作许可准备','你的首要目标是工作，但尚未确认书面 offer。','先核是否已有独立工作权；否则找愿意按合法程序招聘的真实雇主，核 LMIA 或具体豁免依据。面试与口头承诺不是工作授权。',['tfwp','outsidework']);
    read('work','先弄清进入岗位所需许可，再开展有针对性的求职。',26);
   }
   if(regulated){
    read('careers','你选的是持牌或受监管职业；先查能否上岗，再选省份。',7);doc('license','职业注册与执照材料','课程大纲、实习 / 临床时数、原执照、近期执业、无纪律处分证明和当地监管机构评估。已持牌也要核目标省互认。');
    alert('license',a.license==='full'?'已有加拿大执照：仍需核目标地区':'先补职业执照路径','移民职业清单关注某职业，不代表学校毕业即可执业。请确认具体职业及省监管机构，护士、护工、医生、幼教不可互换。',['category']);
   }else if(a.occupation==='trade')read('careers','技工要先核实际工种、工时证据、认证与学徒要求。',8);
   else if(['software','cyber','transport','hospitality','agriculture','manufacturing','office','research','manager','caregiver','other'].includes(a.occupation))read('careers','先用真实职责核职业分类，再看雇主是否接受你的身份和证照。',30);
   if(a.occupation==='software')alert('software','程序员不自动属于现行 STEM 定向','先核当年职业清单；不要因学位或职位含 IT 就当成类别资格。仍可另查 FSW / CEC 等基础路径。',['category']);
   if(a.occupation==='transport')alert('transport','运输类别不代表所有卡车司机','逐项查当前清单和实际职责；驾驶证、保险及雇主支持也要单独解决。',['category']);
   if(a.occupation==='caregiver')alert('caregiver','家护职业与开放移民窗口分开','不能把护理、医院护工和家庭看护当成同一职业，也不能把暂停的新申请通道当作今天可报名产品。',['careclosed']);
   if(a.occupation==='nurse'){source('crna','先以阿省示例看 International applicants；目标其他省时去对应监管机构。','写下学历评估、语言、考试、近期执业、费用与时长缺口；示例不代表推荐阿省。');r.cases.push({slug:'case-04',reason:'对照境外护士的执照与就业准备；具体背景仍逐项重核。'});}
   if(a.occupation==='ece')source('ece','看曼省 ECE 资格分级，其他省另核监管机构。','确认现有学位和课程能否满足目标级别，不能只看中文“教育专业”。');
   if(a.occupation==='teacher')source('teacher','查看境外受训教师认证要求。','列先修教育、教师训练、实习与语言差距，再评估课程。');
   if(a.occupation==='trade'){source('trade','看工种与经验认证途径，目标其他省另查。','记录可证明的工时、师傅证明、考试和省认证要求。');r.cases.push({slug:'case-05',reason:'对照已有技工经验的证明和雇主准备。'});}
   source('category','先找到具体 NOC，再看经验地点、年限和本轮要求。','保存当年清单及核查日期；类别资格不等于基础资格或获邀。');
   if(['unknown','under4','4-6'].includes(a.english)&&a.french!=='7plus'){
    alert('language','语言仍是待验证关卡','学校录取语言、职业执照语言、工签语言与移民语言可能不同。先做认可考试规划，四项分别换算 CLB / NCLC，不用雅思总分替代。',['fsw','cec','pgwp']);
    action('未来 30 天','先测语言与职业差距','安排诊断测试并确定认可考试；把工作面试能力、职业注册要求和移民门槛分成三行目标。');
   }
   if(['none','under1','unknown'].includes(a.foreignExp)&&['none','student','unknown'].includes(a.caExp)){
    alert('experience','先确认经验缺口，再购买方案','当前回答没有证明已达到联邦技能经验门槛。应先建立带薪、合法、可证明的职业经验；如考虑学习，先确认专业本身的回报。',['fsw','cec']);
    if(!r.routes.length)route('prepare','先补职业、语言与证据','目前资料不足以验证主流技能入口。','核年龄、具体教育、带薪职责、语言和资金；比较本地积累经验与真正必要的学习。',['fsw']);
   }
   if(a.education==='secondary'){alert('education','高中 / 中职起点：先分职业路线','学历较低不等于所有路线关闭。技工看工种、经验与资格；升学看先修课、语言、预算和毕业可用技能。',['fst','fsw','pgwp']);read('study','若需要升学，先看高中 / 中职对应层级和先修条件。',35);}
   if(['master','phd'].includes(a.education))action('未来 30—90 天','先使用已有高学历与专业资产','境外学历查 ECA；科研人员区分学生、雇员和博士后。比较语言提升、相关工作和真实科研聘用，不预设再读低级文凭。');
   if(['35-44','45plus'].includes(a.age)){alert('age','把 3 年后的年龄一起算','年龄会影响 CRS 竞争；45 岁及以上年龄项为 0 不代表所有移民路线被禁止。可比较配偶主申、雇主 / 地方路径和职业优势。',['crs']);source('crs','分别查本人、配偶、年龄、教育和语言项。','做今天与 3 年后的两次试算，明确哪些分数已获证实。');}
   if(a.age==='under18'){alert('minor','未成年需要独立监护与学习安排','本分流以成年咨询为主；先核年龄、监护、教育和当地雇佣规则，再做工作与移民规划。',['study']);read('consultant','未成年方案需先补监护与教育条件。',2);}
   if(a.budget==='low'){alert('budget','预算先过关','你选择可动用资金不足 15 万元人民币。该金额不是统一法定门槛；学习与家庭方案必须先做真实报价和资金证明，不能拿未获得的收入填缺口。',['funds']);read('budget','资金可能成为最先卡住的条件；先做不含预期打工收入的预算。',9);source('funds','查看递交日期对应人数的生活费，再加学费与交通。','区分可证明资金、实际全年花费与不可动用资产。');}
  }
  const outScope=[a.currentProvince,a.target].some(x=>['on','atlantic','qc'].includes(x));
  if(outScope)alert('scope','你的地区选择包含本报告范围外地区','安省、大西洋四省及魁省的省级项目不在本库覆盖内。仍可读相关联邦规则；省份建议要另做研究，不会自动替你改选另一个省。',['pnp']);
  if(!settled&&!special){
   if(provinces[a.currentProvince])read(a.currentProvince,'先复核你已在当地积累的工作、学业和联系，不急于为传闻搬省。',32);
   if(provinces[a.target])read(a.target,'这是你主动选择的目标地；再核真实定居意图、雇主条件与当期开放状态。',34);
   if(!provinces[a.currentProvince]&&!provinces[a.target])read('regions',outScope?'本库仅用于比较已覆盖地区；你的范围外项目另查。':'资格、职业和资金核完，再缩小到 1—2 个真实可居住地区。',42);
  }
  if(a.target==='nu')alert('nunavut','努纳武特没有省提名计划','到当地工作不会产生不存在的“努纳武特 PNP”；应另核联邦入口、实际招聘与生活条件。',['pnp']);
  if(a.currentProvince==='ab'&&a.caStatus==='maintained')alert('ab-maintained','维持身份不自动满足阿省 AOS','联邦允许停留或继续工作，与省项目接受的许可状态是两层条件；AOS 的有效工签要求要单独核。',['abos']);
  if(a.currentProvince==='nt'||a.target==='nt')alert('nt-window','西北地区：时间窗口只对已准备好的人有意义','研究版记录 2026-09-22 EOI 截止；先核最新公告与资格，不应为了短窗口仓促迁居或购买岗位。日期已过时请重新查公告。',['ntstatus']);
  if(a.currentProvince==='yt'||a.target==='yt')alert('yt-window','育空：先查接收状态','研究版记录 2026 年两轮已结束；有工作不等于今天有开放的新申请窗口。',['yt']);
  action('未来 7 天','把口头背景变成文件','先完成下面的材料清单与来源核查。每项记录“已满足、缺证据、未满足、规则待确认”，标注网址、核查日期和下次复查日。');
  action('未来 30—90 天',settled||special?'按专业复核结果继续':'用结果验证方向',settled||special?'先确定本人身份维护、保护程序或家属类别的具体要求与官方期限，再安排后续材料和资金。不要套用普通经济移民时间表。':'需要找工作者：选两个地区，记录去重后的真实岗位、许可与执照要求，再测试简历和面试。申请学习者：先取得课程、费用及职业资格书面说明。已有许可者：按月核经验与身份缺口。');
  action('付款、辞职或迁居前','重新核政策与失败成本','重开官方资格、接收状态和最新邀请页；核对应的递交日与过渡规则。只有口头雇主承诺、学校营销或未来开放预测，不足以支持不可逆决定。');
  read('timeline','把已确认条件放进时间表：身份期限、考试、经验、申请与备用方案。',60);
  read('forecast','3—5 年规划最后再读政策情景；预测不能代替今天的资格。',65);
  if(!r.research.length)source('rep','核实提供有偿个案服务者的授权。','保存注册状态与委托范围，再安排个案文件审查。');
  r.reading.sort((x,y)=>x.priority-y.priority||x.order-y.order);r.reading=r.reading.slice(0,8);
  if(!r.cases.length&&!settled&&!special){
   const match=a.occupation==='business'?['case-10','对照经营与资产证据；年龄、资金和亲属背景须重新核。']:a.occupation==='research'?['case-07','对照在读科研与雇佣经验的区别，不直接套用省资格。']:a.occupation==='transport'?['case-08','对照司机岗位、雇主和工签期限；所处省份另核。']:a.caStatus==='pgwp'?['case-03','对照毕业工签倒计时与求职安排；不假设职业相同。']:a.family.includes('child')?['case-06','对照全家费用、主申选择和子女安排。']:['cases','按你的学历、年龄和现居身份再找相似案例；案例不是可复制的个人结论。'];
   r.cases.push({slug:match[0],reason:match[1]});
  }
  return r;
 }
 return {assess,provinces};
});
