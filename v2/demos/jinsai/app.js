'use strict';
const $ = id => document.getElementById(id);
const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const row = (label, value) => `<div class="flow-row"><span class="label">${label}</span><div>${value}</div></div>`;
function animateCard(id){
 const el=$(id);
 if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches && el.animate) el.animate([{opacity:0,transform:'translateY(6px)'},{opacity:1,transform:'translateY(0)'}],{duration:240,easing:'ease-out'});
}
const design = text => `<div class="design"><b>产品设计要点</b>${text}</div>`;
const delivery = [
 {name:'业务调研',input:'示例问题：发现质量异常后，谁登记、谁调查、由谁确认关闭？',process:'访谈质量部门，梳理现状、角色和断点；将不确定项纳入待确认清单。',output:'形成可评审的现状与需求基线。',files:['调研问卷','访谈纪要','需求与待确认清单'],point:'先对齐业务含义与责任，再决定系统字段，避免把模糊需求直接写成配置。'},
 {name:'质量流程规划方案',input:'调研结论、角色清单与待确认事项（示例）。',process:'绘制目标流程，明确入口、流转条件、审批角色与异常退回路径；组织方案评审。',output:'形成目标流程与评审意见，未决事项指定责任方。',files:['目标流程图','角色权限矩阵','方案评审记录'],point:'正常路径与驳回路径一起设计，让边界条件成为可执行规则。'},
 {name:'系统配置',input:'经评审的目标流程、字段与角色定义（示例）。',process:'配置必填字段、状态转换和角色动作；把配置项关联回需求。',output:'形成可测试的流程版本与配置基线。',files:['配置清单','字段字典','需求配置对照表'],point:'把“谁在什么条件下做什么”拆成字段、角色和规则，才能验证是否真正落地。'},
 {name:'测试',input:'流程配置版本、需求清单与测试场景（示例）。',process:'覆盖正常提交、缺少必填项、无权限操作和驳回重提；记录问题并安排修复复测。',output:'形成测试记录、问题清单与待关闭项。',files:['测试用例','问题跟踪清单','复测记录'],point:'测试要验证业务边界，而不只是按钮能否点击；问题关闭需要可追溯证据。'},
 {name:'上线落地',input:'复测结果、角色准备情况与未决问题（示例）。',process:'按检查表核对上线条件，组织使用说明与业务交接；未满足条件时保留阻断项。',output:'形成上线检查与交接记录，验收结论需由实际项目确认。',files:['上线检查表','使用说明','交接记录'],point:'上线是业务能够按规则使用系统；未决事项需要明确责任与后续处理安排。'}
];
const management = [
 ['阶段依赖与待评审事项。','主计划将调研、方案评审、配置、测试、上线建立前后依赖。','示例主计划：方案确认 → 配置基线 → 测试通过 → 上线检查。','用交付物和进入条件管理里程碑，而不是仅罗列日期。'],
 ['示例风险：审批角色尚未确认，配置无法定版。','标记“待协调”，记录影响、责任方和下一动作；受影响测试项暂缓。','示例跟踪单：质量部确认角色 → 顾问检查方案 → 开发更新配置 → 复测。','进度偏差与风险同时跟踪，使阻塞原因和解除条件可见。'],
 ['示例议题：关闭审批由哪个岗位承担？','客户质量部确认业务责任；核心顾问评审流程；开发评估实现；项目经理助理跟踪决议。','示例协调纪要：议题、参与方、决议、行动项、负责人。','业务决策由相应责任方确认，协调者推动决定形成闭环。']
];
let deliveryIndex = 0;
function renderDelivery(){
 const item = delivery[deliveryIndex];
 $('delivery-steps').innerHTML = delivery.map((s,i)=>`<button class="step ${i===deliveryIndex?'active':''}" data-delivery="${i}" aria-current="${i===deliveryIndex?'step':'false'}"><span class="num">${i+1}</span><span>${s.name}<small>${i===deliveryIndex?'正在查看':'点击查看'}</small></span></button>`).join('');
 $('delivery-detail').innerHTML = `<div class="detail-title"><h3>${item.name}</h3><span>示例阶段 ${deliveryIndex+1} / 5</span></div>${row('输入',item.input)}${row('系统处理',item.process)}${row('输出',item.output)}${row('交付物',`<div class="tokens">${item.files.map(f=>`<span class="token">${f}</span>`).join('')}</div>`)}${design(item.point)}`;
 animateCard('delivery-detail');
 $('delivery-prev').disabled=deliveryIndex===0;
 $('delivery-next').textContent=deliveryIndex===4?'进入质量流程模拟 →':'下一步 →';
 $('delivery-position').textContent=`${deliveryIndex+1} / 5 · ${item.name}`;
}
function renderManagement(index){const m=management[index];$('management-detail').innerHTML=row('输入',m[0])+row('协调规则',m[1])+row('输出',m[2])+design(m[3]);document.querySelectorAll('[data-manage]').forEach(b=>b.classList.toggle('active',Number(b.dataset.manage)===index));}
const roles=['发起人','调查负责人','措施负责人','变更负责人','质量审核人'];
const people={'发起人':'示例人员甲','调查负责人':'示例人员乙','措施负责人':'示例人员丙','变更负责人':'示例人员丁','质量审核人':'示例人员戊'};
// 纯本地、显式转换的演示状态机；没有外部接口或真实签名服务。
const scenarios={
 deviation:{id:'示例偏差-001',title:'偏差',nodes:[
 {name:'偏差',role:'发起人',field:'偏差描述与即时处置',sample:'示例区域的记录标签缺失；已隔离相关示例材料并登记异常。',input:'现场发现的异常描述与即时处置。',rule:'填写异常与处置说明，由发起人签署提交后进入调查。',output:'已登记偏差，等待调查。',point:'入口即留存问题和处置，避免流转后失去原始上下文。',action:'提交登记'},
 {name:'调查',role:'调查负责人',field:'调查证据与根因说明',sample:'示例访谈与检查记录显示：交接清单未包含标签确认项。',input:'已登记偏差及原始处置记录。',rule:'补充证据与根因，由调查负责人签署；可驳回登记补充事实。',output:'形成调查结论，进入措施制定与执行。',point:'将事实证据与根因关联，防止没有调查就直接给出措施。',action:'提交调查'},
 {name:'纠正预防措施',role:'措施负责人',field:'措施、责任人及完成证据',sample:'示例人员丙补充交接清单并完成示例培训；附示例执行记录。',input:'调查结论与需处理的根因。',rule:'记录纠正与预防措施、责任及执行证据后提交；可退回调查。',output:'措施已执行，等待独立有效性确认。',point:'措施必须落到责任与证据，不能只记录一句“已整改”。',action:'提交措施'},
 {name:'有效性确认',role:'质量审核人',field:'有效性确认依据与结论',sample:'示例复核记录确认新增检查项已执行，本示例判定措施有效。',input:'措施执行记录与确认依据。',rule:'质量审核人审批后进入关闭审核；无有效证据则驳回措施节点。',output:'有效性确认通过，等待最终关闭审核。',point:'执行完成不等于措施有效，单独设置确认关口。',action:'审批通过'},
 {name:'关闭',role:'质量审核人',field:'关闭核查与归档说明',sample:'本示例的登记、调查、措施和有效性记录已核对，申请归档关闭。',input:'全链路记录与有效性确认结论。',rule:'核对记录完整性并签署关闭；资料不足可退回有效性确认。',output:'记录已关闭，表单只读。',point:'关闭需要明确结论和责任，记录在关闭后不再直接修改。',action:'审批并关闭'}]},
 change:{id:'示例变更-001',title:'变更控制',nodes:[
 {name:'变更申请',role:'发起人',field:'变更内容、原因与范围',sample:'拟调整示例作业记录模板，新增交接确认栏；范围为示例区域。',input:'拟变更事项与业务原因。',rule:'明确内容、原因和范围后签署提交。',output:'已登记变更，进入影响评估。',point:'先界定范围，避免一项变更在执行时扩散。',action:'提交申请'},
 {name:'影响评估',role:'变更负责人',field:'影响、风险与验证计划',sample:'示例评估涉及模板版本和使用说明；计划先核对字段，再执行示例验证。',input:'变更申请及涉及的对象。',rule:'补充影响、风险与验证计划后提交；信息不足可退回申请。',output:'形成评估结论与审批输入。',point:'在实施前识别影响，为审批提供具体依据。',action:'提交评估'},
 {name:'变更审批',role:'质量审核人',field:'审批意见与实施条件',sample:'本示例同意按评估范围实施，执行前确认模板和说明版本。',input:'变更申请、影响评估与验证计划。',rule:'质量审核人签署审批后才允许实施；可驳回影响评估。',output:'变更获准进入实施。',point:'把批准与实施分开，避免先做后批。',action:'审批通过'},
 {name:'实施与验证',role:'变更负责人',field:'实施记录与验证证据',sample:'示例模板与说明已同步更新，示例验证记录确认字段完整。',input:'获准方案及实施条件。',rule:'记录实施与验证证据后提交；范围不符时退回审批。',output:'实施验证记录进入关闭审核。',point:'实施证据必须对应获准范围，使验收有据可查。',action:'提交验证'},
 {name:'关闭',role:'质量审核人',field:'关闭核查与归档说明',sample:'本示例的审批、版本更新和验证资料齐备，确认关闭。',input:'实施记录、验证证据及审批意见。',rule:'质量审核人核对并签署关闭；资料不足退回实施与验证。',output:'变更记录已关闭，表单只读。',point:'用关闭核查确认变更后的资料与系统状态一致。',action:'审批并关闭'}]}
};
const fresh=()=>({state:0,view:0,closed:false,drafts:{},snapshots:{},audit:[],message:''});
const records={deviation:fresh(),change:fresh()};let current='deviation';
function showTab(tab){document.querySelectorAll('[data-tab]').forEach(b=>{b.classList.toggle('active',b.dataset.tab===tab);b.setAttribute('aria-selected',String(b.dataset.tab===tab));});$('delivery').hidden=tab!=='delivery';$('workflow').hidden=tab!=='workflow';animateCard(tab);}
function saveDraft(){const r=records[current];if($('content')&&r.view===r.state&&!r.closed)r.drafts[r.state]=$('content').value;}
function renderWorkflow(){
 const s=scenarios[current],r=records[current],n=s.nodes[r.view],active=r.view===r.state&&!r.closed;
 $('record-id').textContent=`虚构编号：${s.id}`;$('record-state').textContent=r.closed?'已关闭':`当前状态：${s.nodes[r.state].name}`;
 document.querySelectorAll('[data-scenario]').forEach(b=>b.classList.toggle('active',b.dataset.scenario===current));
 $('workflow-steps').innerHTML=s.nodes.map((n,i)=>`<button class="step ${i===r.view?'active':''} ${i===r.state?'current':''}" data-node="${i}" aria-current="${i===r.view?'step':'false'}"><span class="num">${i+1}</span><span>${n.name}<small>${r.closed?'已完成':i===r.state?'当前待处理':i<r.state?'已流转':'待流转'}</small></span></button>`).join('');
 let form='';
 if(active){form=`<div class="form-grid"><label class="field">当前操作角色<select id="actor">${roles.map(role=>`<option ${role===n.role?'selected':''}>${role}</option>`).join('')}</select></label><label class="field">签署人（模拟身份）<input id="signer" value="${people[n.role]}" readonly></label><label class="field wide">${n.field} <span>必填 · 示例说明不能代替真实业务校验</span><textarea id="content" placeholder="填写记录，或点击下方填入示例">${escapeHtml(r.drafts[r.state]||'')}</textarea></label><label class="field wide">驳回原因（驳回时必填）<input id="reason" placeholder="例如：缺少处置依据，请补充说明"></label></div><label class="check"><input id="signed" type="checkbox">我以当前模拟身份签署本次操作，确认签名含义为提交、审批或驳回，并关联当前记录。</label><div class="actions"><button id="fill" class="secondary">填入本节点示例</button><button id="submit" class="primary">${n.action}</button><button id="reject" class="danger" ${r.state===0?'disabled':''}>驳回至上一步</button></div>`;}
 else if(r.closed){form=`<div class="completion"><strong>记录已关闭 · 只读归档示意</strong><p>各节点签署与状态变更可在右侧追溯。重置当前示例可重新演示。</p></div>${row('已签署记录',escapeHtml(r.snapshots[r.view]||'暂无记录'))}`;}
 else{form=`<div class="preview-note">当前仅查看节点说明，未改变业务状态。${r.view<r.state?'本节点已提交。':'本节点尚未到达。'}<br><button id="return-current" class="text-button">返回当前待处理节点 →</button></div>${row('已签署记录',escapeHtml(r.snapshots[r.view]||'尚无已签署记录'))}`;}
 $('workflow-detail').innerHTML=`<div class="detail-title"><h3>${n.name}${current==='deviation'&&r.view===2?'（CAPA）':''}</h3><span>节点 ${r.view+1} / 5</span></div>${row('输入',n.input)}${row('系统处理',n.rule)}${row('角色',n.role+'（演示权限规则）')}${row('预期输出',n.output)}${design(n.point)}${form}<div id="feedback" class="feedback ${r.message.startsWith('已')?'success':''}" role="status" aria-live="polite">${escapeHtml(r.message)}</div>`;
 $('audit-log').innerHTML=r.audit.length?r.audit.slice().reverse().map(a=>`<li><strong>${escapeHtml(a.action)} · ${escapeHtml(a.actor)}</strong><small>${escapeHtml(a.time)} · ${escapeHtml(a.person)}</small><div>${escapeHtml(a.from)} → ${escapeHtml(a.to)}</div><small>关联记录：${s.id} · 签名含义：${escapeHtml(a.action)}</small><details><summary>查看签署内容与变更</summary><p>原内容：${escapeHtml(a.before||'无')}</p><p>本次内容：${escapeHtml(a.after||'无')}</p>${a.reason?`<p>驳回原因：${escapeHtml(a.reason)}</p>`:''}</details></li>`).join(''):'<li><strong>等待首次签署操作</strong><small>提交后将在此追加操作记录</small></li>';
 animateCard('workflow-detail');
 $('workflow-prev').disabled=r.view===0;$('workflow-next').disabled=r.view===4;$('workflow-position').textContent=`查看 ${r.view+1} / 5 · 浏览不会流转记录`;
}
function transition(reject){
 const r=records[current],s=scenarios[current],n=s.nodes[r.state];
 if(r.closed||r.view!==r.state)return;
 const actor=$('actor').value,content=$('content').value.trim(),reason=$('reason').value.trim();
 const fail=message=>{$('feedback').textContent=message;$('feedback').className='feedback';};
 if(actor!==n.role)return fail(`权限校验未通过：本节点仅允许${n.role}操作。`);
 if(!reject&&!content)return fail(`请填写必填项：${n.field}。`);
 if(reject&&(r.state===0||!reason))return fail('驳回时请填写原因。');
 if(!$('signed').checked)return fail('请先勾选模拟电子签名确认。');
 const before=r.snapshots[r.state]||'',from=n.name,action=reject?'驳回':n.action;
 r.drafts[r.state]=content;
 if(!reject)r.snapshots[r.state]=content;
 let to;
 if(reject){r.state-=1;to=s.nodes[r.state].name;}
 else if(r.state===4){r.closed=true;to='已关闭';}
 else{r.state+=1;to=s.nodes[r.state].name;}
 r.audit.push({action,actor,person:people[actor],time:new Date().toLocaleString('zh-CN',{hour12:false}),from,to,before,after:content,reason:reject?reason:''});
 r.view=r.state;r.message=reject?`已驳回至“${to}”，原因已记入审计追踪。`:`已完成${action}，${r.closed?'记录现为只读。':`进入“${to}”。`}`;
 renderWorkflow();
}
document.addEventListener('click',event=>{
 const b=event.target.closest('button');if(!b||b.disabled)return;
 if(b.id==='demo-toggle'){toggleDemo();return;}
 interruptDemo();
 if(b.dataset.tab){saveDraft();showTab(b.dataset.tab);}
 if(b.dataset.delivery!==undefined){deliveryIndex=Number(b.dataset.delivery);renderDelivery();}
 if(b.dataset.manage!==undefined)renderManagement(Number(b.dataset.manage));
 if(b.dataset.scenario){saveDraft();current=b.dataset.scenario;renderWorkflow();}
 if(b.dataset.node!==undefined){saveDraft();records[current].view=Number(b.dataset.node);records[current].message='';renderWorkflow();}
 switch(b.id){
 case 'delivery-prev':deliveryIndex--;renderDelivery();break;
 case 'delivery-next':if(deliveryIndex===4)showTab('workflow');else{deliveryIndex++;renderDelivery();}break;
 case 'workflow-prev':case 'workflow-next':saveDraft();records[current].view+=b.id==='workflow-next'?1:-1;records[current].message='';renderWorkflow();break;
 case 'return-current':records[current].view=records[current].state;renderWorkflow();break;
 case 'fill':$('content').value=scenarios[current].nodes[records[current].state].sample;saveDraft();$('feedback').textContent='已填入示例。请检查内容并勾选模拟签名后操作。';break;
 case 'submit':transition(false);break;
 case 'reject':transition(true);break;
 case 'reset':records[current]=fresh();renderWorkflow();break;
 }
});
document.addEventListener('change',event=>{if(event.target.id==='actor'){$('signer').value=people[event.target.value];$('signed').checked=false;}});
// The guided sequence uses the same validation and transition functions as manual use.
const guidedSteps = [
 ...delivery.map((item,index)=>({label:item.name,run:()=>{showTab('delivery');deliveryIndex=index;renderDelivery();renderManagement(0);},target:'delivery-steps'})),
 ...[1,2].map(index=>({label:index===1?'进度与风险':'跨方协调',run:()=>renderManagement(index),target:'management-detail'})),
 {label:'偏差 · 空白提交校验',run:()=>{current='deviation';showTab('workflow');renderWorkflow();transition(false);}},
 {label:'偏差 · 填入示例并确认签名',run:prepareDemo},
 {label:'提交登记 → 调查',run:()=>transition(false)},
 {label:'调查 · 驳回原因与签名',run:()=>{$('reason').value='示例：缺少处置依据，请补充说明。';$('signed').checked=true;}},
 {label:'驳回 → 偏差',run:()=>transition(true)},
 {label:'偏差 · 补充后重新签署',run:prepareDemo},
 {label:'重新提交 → 调查',run:()=>transition(false)},
 {label:'调查 · 填入证据并签署',run:prepareDemo},
 {label:'提交调查 → 纠正预防措施',run:()=>transition(false)},
 {label:'纠正预防措施 · 执行证据与签名',run:prepareDemo},
 {label:'提交措施 → 有效性确认',run:()=>transition(false)},
 {label:'有效性确认 · 审批依据与签名',run:prepareDemo},
 {label:'审批通过 → 关闭审核',run:()=>transition(false)},
 {label:'关闭 · 核查归档并签署',run:prepareDemo},
 {label:'已关闭 · 只读记录与审计追踪',run:()=>transition(false)},
 {label:'变更控制 · 变更申请',run:()=>{current='change';renderWorkflow();}},
 {label:'变更控制 · 浏览变更审批',run:()=>{records.change.view=2;renderWorkflow();}},
 {label:'返回当前待处理节点 · 演示结束',run:()=>{records.change.view=records.change.state;renderWorkflow();}}
];
let demoTimer=null,demoIndex=-1,demoDirty=false;
function prepareDemo(){
 const node=scenarios[current].nodes[records[current].state];
 $('content').value=node.sample;$('signed').checked=true;saveDraft();
 $('feedback').textContent='演示模式：已填入虚构示例并勾选模拟签名，下一幕执行操作。';
}
function stopDemo(){clearTimeout(demoTimer);demoTimer=null;$('demo-toggle').setAttribute('aria-pressed','false');}
function interruptDemo(){
 if(demoIndex<0)return;
 stopDemo();demoDirty=true;
 $('demo-toggle').textContent='↻ 重新演示';
 $('demo-status').textContent='已暂停 · 当前可手动操作；重新演示将从讲稿开头开始';
}
function advanceDemo(){
 demoIndex++;
 if(demoIndex>=guidedSteps.length){stopDemo();$('demo-toggle').textContent='↻ 重新演示';$('demo-status').textContent='演示完成 · 可手动查看记录与审计追踪';return;}
 const step=guidedSteps[demoIndex];step.run();
 $('demo-status').textContent=`${demoIndex+1} / ${guidedSteps.length} · ${step.label}`;
 $(step.target||'workflow-detail').scrollIntoView({block:'start',behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
 demoTimer=setTimeout(advanceDemo,8000);
}
function toggleDemo(){
 if(demoTimer){stopDemo();$('demo-toggle').textContent='▶ 继续演示';$('demo-status').textContent+=' · 已暂停';return;}
 if(demoIndex<0||demoIndex>=guidedSteps.length||demoDirty){
  records.deviation=fresh();records.change=fresh();current='deviation';demoIndex=-1;demoDirty=false;renderWorkflow();
  advanceDemo();
 }else{
  $('demo-status').textContent=`${demoIndex+1} / ${guidedSteps.length} · ${guidedSteps[demoIndex].label}`;
  demoTimer=setTimeout(advanceDemo,8000);
 }
 $('demo-toggle').textContent='Ⅱ 暂停演示';$('demo-toggle').setAttribute('aria-pressed','true');
}
document.addEventListener('input',interruptDemo);
document.addEventListener('change',interruptDemo);
document.addEventListener('visibilitychange',()=>{if(document.hidden&&demoTimer)toggleDemo();});
document.addEventListener('keydown',event=>{
 if(event.defaultPrevented||event.altKey||event.ctrlKey||event.metaKey||event.shiftKey||!['ArrowLeft','ArrowRight'].includes(event.key))return;
 if(event.target.closest('input,textarea,select,[contenteditable]'))return;
 event.preventDefault();
 const prefix=$('delivery').hidden?'workflow':'delivery';
 const button=$(prefix+(event.key==='ArrowLeft'?'-prev':'-next'));
 if(!button.disabled)button.click();else interruptDemo();
});
renderDelivery();renderManagement(0);renderWorkflow();
