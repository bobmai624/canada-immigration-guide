document.querySelectorAll('input[data-filter]').forEach(input=>{const targets=[...document.querySelectorAll(input.dataset.filter)],count=document.getElementById(input.dataset.count);input.addEventListener('input',()=>{const q=input.value.trim().toLowerCase();let n=0;targets.forEach(el=>{el.hidden=!el.textContent.toLowerCase().includes(q);if(!el.hidden)n++});if(count)count.textContent='显示 '+n+' 条记录'})});
let printSnapshot=null;
function prepareReportPrint(){
 if(printSnapshot)return;
 printSnapshot={details:[...document.querySelectorAll('details')].map(el=>({el,open:el.open})),filtered:[...document.querySelectorAll('.occupation-row,.source-card')].map(el=>({el,hidden:el.hidden}))};
 printSnapshot.details.forEach(({el})=>el.open=true);printSnapshot.filtered.forEach(({el})=>el.hidden=false);
}
function restoreReportPrint(){if(!printSnapshot)return;printSnapshot.details.forEach(({el,open})=>el.open=open);printSnapshot.filtered.forEach(({el,hidden})=>el.hidden=hidden);printSnapshot=null}
addEventListener('beforeprint',prepareReportPrint);addEventListener('afterprint',restoreReportPrint);
window.printProvinceReport=()=>{prepareReportPrint();window.print()};
document.querySelectorAll('[data-print-report]').forEach(b=>b.addEventListener('click',window.printProvinceReport));
