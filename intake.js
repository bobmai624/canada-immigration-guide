(()=>{
 'use strict';
 const form=document.getElementById('intake');if(!form)return;
 const out=document.getElementById('intake-result'),stale=document.getElementById('intake-stale');
 const steps=[...form.querySelectorAll('.wizard-step')],data=window.INTAKE_DATA;
 let step=0,generated=false;
 const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const val=n=>form.elements.namedItem(n)?.value;
 const links=keys=>'<span class="refs">'+keys.map(k=>{const s=data.sources[k];return s?`<a href="${escape(s.url)}" target="_blank" rel="noopener">${escape(s.title)} ↗</a>`:'';}).join(' · ')+'</span>';
 const profileKey=()=>({allied:'doctor',teacher:'ece',cyber:'software',transport:'frontline',hospitality:'frontline',agriculture:'frontline',manufacturing:'frontline',office:'starter',unknown:'starter',other:'starter'}[val('occupation')]||val('occupation'));
 const toggle=()=>{
  const residence=['third','hmt'].includes(val('place'));
  const conditions={residence,canada:val('place')==='canada',thirdExpiry:residence&&!['pr','citizen'].includes(val('residence')),caExpiry:!['none','pr','citizen','protected'].includes(val('caStatus')),license:['nurse','doctor','allied','ece','teacher','trade','cyber'].includes(val('occupation'))};
  form.querySelectorAll('[data-condition]').forEach(el=>{const show=conditions[el.dataset.condition];el.hidden=!show;el.querySelectorAll('input,select').forEach(x=>x.disabled=!show);});
  const p=data.profiles[profileKey()];
  document.getElementById('occupation-hint').innerHTML=p?`<span class="eyebrow">${escape(p.tag)}</span><h3>${escape(p.title)}：先看这道关</h3><p>${escape(p.check)}</p><a href="intake-backgrounds.html#bg-${escape(profileKey())}" target="_blank" rel="noopener">展开这个背景的具体准备方法 ↗</a>`:'';
 };
 function showStep(n,focus=false){step=Math.max(0,Math.min(2,n));steps.forEach((s,i)=>s.hidden=i!==step);form.querySelectorAll('[data-step-label]').forEach((s,i)=>{if(i===step)s.setAttribute('aria-current','step');else s.removeAttribute('aria-current');});document.getElementById('intake-prev').hidden=step===0;document.getElementById('intake-next').hidden=step===2;document.getElementById('intake-submit').hidden=step!==2;document.getElementById('step-count').textContent=`第 ${step+1} 步，共 3 步`;if(focus){steps[step].querySelector('legend').focus();steps[step].scrollIntoView({block:'start',behavior:'smooth'});}}
 function valid(){const error=document.getElementById('intake-validation');if(!val('place')){error.textContent='请先选择今天的实际所在地。其余不确定的问题可保留“待确认”。';showStep(0);form.elements.place.focus();return false;}error.textContent='';return true;}
 function answers(){const fd=new FormData(form);return {...Object.fromEntries(fd),family:fd.getAll('family'),history:fd.getAll('history')};}
 function summary(){return [...form.querySelectorAll('select:not(:disabled)')].map(el=>{const label=form.querySelector(`label[for="${el.id}"]`).textContent;return `<div><dt>${escape(label)}</dt><dd>${escape(el.options[el.selectedIndex]?.text||'待确认')}</dd></div>`;}).join('')+['family','history'].map(name=>{const selected=[...form.querySelectorAll(`input[name="${name}"]:checked`)].map(x=>x.nextElementSibling.textContent);return `<div><dt>${name==='family'?'家庭情况':'历史复核事项'}</dt><dd>${escape(selected.join('；')||'未勾选；不代表已核实不存在')}</dd></div>`;}).join('');}
 function render(r){
  const alertCard=x=>`<aside class="${['ca-urgent','third-urgent','history','visitor','maintained','outside-maintained','special'].includes(x.id)?'alert':'note'}" data-alert="${escape(x.id)}"><strong>${escape(x.title)}</strong><p>${escape(x.text)}</p>${links(x.keys)}</aside>`;
  const first=r.alerts.filter(x=>['ca-urgent','third-urgent','history','visitor','maintained','outside-maintained','special','settled','status-unknown'].includes(x.id));
  const rest=r.alerts.filter(x=>!first.includes(x));
  const priority=first.length?first:rest.splice(0,1);
  out.innerHTML=`<div class="result-hero"><span class="eyebrow" style="color:#d9edaa">你的回答 → 研究优先级 → 文件与行动</span><h2 id="result-heading" tabindex="-1">你的咨询准备单</h2><p>这是根据自报信息生成的研究顺序，不是已符合资格、获邀或获批的结论。重要条件仍要用原件核验。</p><button type="button" id="edit-intake">修改我的回答</button> <button type="button" id="print-intake" class="secondary">打印 / 保存为 PDF</button></div>
   <nav class="result-tabs" aria-label="结果导航"><a href="#result-priority">先处理什么</a><a href="#result-reading">阅读顺序</a><a href="#result-routes">研究方向</a><a href="#result-actions">行动计划</a><a href="#result-documents">材料清单</a><a href="#result-research">怎么查原文</a></nav>
   <div id="result-priority" class="result-block"><h3>① 先处理这些问题</h3>${priority.map(alertCard).join('')}${rest.length?`<details><summary>展开与你有关的其他 ${rest.length} 项提醒</summary><div>${rest.map(alertCard).join('')}</div></details>`:''}</div>
   <div id="result-reading" class="result-block"><h3>② 你的专属阅读顺序</h3><p class="result-note">从第 1 项开始。每项后面的理由都对应你的回答；不需要先把整站读完。</p><ol class="steps">${r.reading.map(x=>`<li><span><a href="${escape(x.slug)}.html" target="_blank" rel="noopener">${escape(x.title)} ↗</a></span><div>${escape(x.reason)}</div></li>`).join('')}</ol></div>
   <div id="result-routes" class="result-block"><h3>③ 可以研究的方向，仍缺什么？</h3><p class="result-note">多项可能并行研究；这里的顺序不等于成功概率。是否递交，须再核完整条件和相互限制。</p>${r.routes.map(x=>`<article class="route-card" data-route="${escape(x.id)}"><h4>${escape(x.title)}</h4><p><b>为什么出现：</b>${escape(x.why)}</p><p class="need"><b>还要确认：</b>${escape(x.missing)}</p>${links(x.keys)}</article>`).join('')||'<p>目前信息不足以形成具体路线。先按材料清单补证据，再做完整资格审查。</p>'}</div>
   <div id="result-actions" class="result-block"><h3>④ 接下来怎么做？</h3><ol class="steps">${r.actions.map(x=>`<li><span>${escape(x.when)} · ${escape(x.title)}</span><div>${escape(x.text)}</div></li>`).join('')}</ol><p class="result-note">“7 天 / 30—90 天”是准备建议，不是法定期限或处理时长；官方期限与个案紧急事项优先。</p></div>
   <div id="result-documents" class="result-block"><h3>⑤ 交给顾问前，准备这些资料</h3><ul class="result-list">${r.documents.map(x=>`<li><strong>${escape(x.title)}</strong><p>${escape(x.text)}</p></li>`).join('')}</ul></div>
   <div id="result-research" class="result-block"><h3>⑥ 去哪里查？查完留下什么？</h3><p class="result-note">先打开官方原文，按下面的章节找条件。保存网址、页面日期、你适用的段落和仍未确认的问题；付费或递交前再查一次。</p>${r.research.map(x=>{const s=data.sources[x.key];return `<article class="research-item"><h4><a href="${escape(s.url)}" target="_blank" rel="noopener">${escape(s.title)} ↗</a></h4><p><b>怎么查：</b>${escape(x.look)}</p><p><b>查完做什么：</b>${escape(x.output)}</p><small>资料核查 ${escape(s.checked)} · ${escape(s.state)}</small></article>`;}).join('')}</div>
   ${r.cases.length?`<div class="result-block"><h3>再看一个相近案例</h3>${r.cases.map(x=>`<p><a href="${escape(x.slug)}.html" target="_blank" rel="noopener">查看案例 ↗</a> · ${escape(x.reason)}</p>`).join('')}</div>`:''}
   <details id="answer-record"><summary>展开本次回答记录（打印时完整显示）</summary><div><dl class="answer-grid">${summary()}</dl></div></details><p class="intake-stamp">分流逻辑与新增身份资料核查：2026-09-16。原知识库各章政策研究基准：2026-09-15；不会自动联网更新。没有保存、上传或替你提交申请。</p>`;
  stale.hidden=true;generated=true;out.hidden=false;
  document.getElementById('edit-intake').addEventListener('click',()=>showStep(0,true));
  document.getElementById('print-intake').addEventListener('click',()=>{out.querySelectorAll('details').forEach(d=>d.open=true);window.print();});
  document.getElementById('result-heading').focus();out.scrollIntoView({block:'start',behavior:'smooth'});
 }
 form.addEventListener('change',()=>{toggle();if(generated){out.hidden=true;stale.hidden=false;generated=false;}});
 form.addEventListener('submit',e=>{e.preventDefault();if(!valid())return;if(step!==2){showStep(step+1,true);return;}render(window.CanadaIntake.assess(answers()));});
 document.getElementById('intake-next').addEventListener('click',()=>{if(valid())showStep(step+1,true);});
 document.getElementById('intake-prev').addEventListener('click',()=>showStep(step-1,true));
 form.querySelectorAll('select').forEach(el=>{if(document.getElementById('help-'+el.name))el.setAttribute('aria-describedby','help-'+el.name);});
 toggle();showStep(0);
})();
