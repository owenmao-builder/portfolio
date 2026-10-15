'use strict';
// 库存取自虚构 CSV；中文配置映射、备件及物流状态为本演示补充。
const INVENTORY = [
  {
    "material": "L6",
    "trim": "基础版",
    "color": "星河灰",
    "warehouse": "天津港出口前置仓（虚构）",
    "available": 32,
    "transit": 10,
    "date": "2026-09-26",
    "unit": "台",
    "clearance": "待清关（示例）",
    "outbound": "待出关（示例）"
  },
  {
    "material": "L6",
    "trim": "进阶版",
    "color": "珍珠白",
    "warehouse": "天津港出口前置仓（虚构）",
    "available": 18,
    "transit": 0,
    "date": "2026-09-26",
    "unit": "台",
    "clearance": "待清关（示例）",
    "outbound": "待出关（示例）"
  },
  {
    "material": "L6",
    "trim": "进阶版",
    "color": "星河灰",
    "warehouse": "上海港出口前置仓（虚构）",
    "available": 0,
    "transit": 24,
    "date": "2026-09-26",
    "unit": "台",
    "clearance": "待清关（示例）",
    "outbound": "待出关（示例）"
  },
  {
    "material": "L6",
    "trim": "基础版",
    "color": "珍珠白",
    "warehouse": "迪拜海外仓（虚构）",
    "available": 7,
    "transit": 12,
    "date": "2026-09-25",
    "unit": "台",
    "clearance": "清关中（示例）",
    "outbound": "已出关（示例）"
  },
  {
    "material": "L7",
    "trim": "基础版",
    "color": "曜岩黑",
    "warehouse": "天津港出口前置仓（虚构）",
    "available": 25,
    "transit": 8,
    "date": "2026-09-26",
    "unit": "台",
    "clearance": "待清关（示例）",
    "outbound": "待出关（示例）"
  },
  {
    "material": "L7",
    "trim": "进阶版",
    "color": "珍珠白",
    "warehouse": "上海港出口前置仓（虚构）",
    "available": 14,
    "transit": 6,
    "date": "2026-09-26",
    "unit": "台",
    "clearance": "待清关（示例）",
    "outbound": "待出关（示例）"
  },
  {
    "material": "L7",
    "trim": "旗舰版",
    "color": "曜岩黑",
    "warehouse": "上海港出口前置仓（虚构）",
    "available": 3,
    "transit": 0,
    "date": "2026-09-26",
    "unit": "台",
    "clearance": "待清关（示例）",
    "outbound": "待出关（示例）"
  },
  {
    "material": "L7",
    "trim": "进阶版",
    "color": "珍珠白",
    "warehouse": "迪拜海外仓（虚构）",
    "available": 9,
    "transit": 0,
    "date": "2026-09-25",
    "unit": "台",
    "clearance": "清关中（示例）",
    "outbound": "已出关（示例）"
  },
  {
    "material": "L7",
    "trim": "基础版",
    "color": "星河灰",
    "warehouse": "阿拉木图海外仓（虚构）",
    "available": 0,
    "transit": 0,
    "date": "2026-09-24",
    "unit": "台",
    "clearance": "清关中（示例）",
    "outbound": "已出关（示例）"
  },
  {
    "material": "L8",
    "trim": "进阶版",
    "color": "银灰",
    "warehouse": "天津港出口前置仓（虚构）",
    "available": 11,
    "transit": 5,
    "date": "2026-09-26",
    "unit": "台",
    "clearance": "待清关（示例）",
    "outbound": "待出关（示例）"
  },
  {
    "material": "L8",
    "trim": "旗舰版",
    "color": "曜岩黑",
    "warehouse": "上海港出口前置仓（虚构）",
    "available": 6,
    "transit": 4,
    "date": "2026-09-26",
    "unit": "台",
    "clearance": "待清关（示例）",
    "outbound": "待出关（示例）"
  },
  {
    "material": "L8",
    "trim": "进阶版",
    "color": "银灰",
    "warehouse": "阿拉木图海外仓（虚构）",
    "available": 4,
    "transit": 10,
    "date": "2026-09-24",
    "unit": "台",
    "clearance": "清关中（示例）",
    "outbound": "已出关（示例）"
  },
  {
    "material": "L9",
    "trim": "进阶版",
    "color": "曜岩黑",
    "warehouse": "天津港出口前置仓（虚构）",
    "available": 20,
    "transit": 0,
    "date": "2026-09-26",
    "unit": "台",
    "clearance": "待清关（示例）",
    "outbound": "待出关（示例）"
  },
  {
    "material": "L9",
    "trim": "旗舰版",
    "color": "曜岩黑",
    "warehouse": "天津港出口前置仓（虚构）",
    "available": 8,
    "transit": 6,
    "date": "2026-09-26",
    "unit": "台",
    "clearance": "待清关（示例）",
    "outbound": "待出关（示例）"
  },
  {
    "material": "L9",
    "trim": "旗舰版",
    "color": "珍珠白",
    "warehouse": "上海港出口前置仓（虚构）",
    "available": 5,
    "transit": 0,
    "date": "2026-09-26",
    "unit": "台",
    "clearance": "待清关（示例）",
    "outbound": "待出关（示例）"
  },
  {
    "material": "L9",
    "trim": "进阶版",
    "color": "银灰",
    "warehouse": "迪拜海外仓（虚构）",
    "available": 12,
    "transit": 8,
    "date": "2026-09-25",
    "unit": "台",
    "clearance": "清关中（示例）",
    "outbound": "已出关（示例）"
  },
  {
    "material": "L9",
    "trim": "旗舰版",
    "color": "曜岩黑",
    "warehouse": "迪拜海外仓（虚构）",
    "available": 2,
    "transit": 15,
    "date": "2026-09-25",
    "unit": "台",
    "clearance": "清关中（示例）",
    "outbound": "已出关（示例）"
  },
  {
    "material": "L9",
    "trim": "进阶版",
    "color": "曜岩黑",
    "warehouse": "阿拉木图海外仓（虚构）",
    "available": 6,
    "transit": 0,
    "date": "2026-09-10",
    "unit": "台",
    "clearance": "清关中（示例）",
    "outbound": "已出关（示例）"
  },
  {
    "material": "MEGA",
    "trim": "旗舰版",
    "color": "珍珠白",
    "warehouse": "上海港出口前置仓（虚构）",
    "available": 4,
    "transit": 2,
    "date": "2026-09-26",
    "unit": "台",
    "clearance": "待清关（示例）",
    "outbound": "待出关（示例）"
  },
  {
    "material": "MEGA",
    "trim": "旗舰版",
    "color": "银灰",
    "warehouse": "天津港出口前置仓（虚构）",
    "available": 0,
    "transit": 3,
    "date": "2026-09-26",
    "unit": "台",
    "clearance": "待清关（示例）",
    "outbound": "待出关（示例）"
  },
  {
    "material": "MEGA",
    "trim": "旗舰版",
    "color": "珍珠白",
    "warehouse": "迪拜海外仓（虚构）",
    "available": 1,
    "transit": 0,
    "date": "2026-09-25",
    "unit": "台",
    "clearance": "清关中（示例）",
    "outbound": "已出关（示例）"
  },
  {
    "material": "i8",
    "trim": "基础版",
    "color": "星河灰",
    "warehouse": "上海港出口前置仓（虚构）",
    "available": 16,
    "transit": 20,
    "date": "2026-09-26",
    "unit": "台",
    "clearance": "待清关（示例）",
    "outbound": "待出关（示例）"
  },
  {
    "material": "i8",
    "trim": "进阶版",
    "color": "珍珠白",
    "warehouse": "天津港出口前置仓（虚构）",
    "available": 9,
    "transit": 0,
    "date": "2026-09-26",
    "unit": "台",
    "clearance": "待清关（示例）",
    "outbound": "待出关（示例）"
  },
  {
    "material": "i8",
    "trim": "进阶版",
    "color": "星河灰",
    "warehouse": "迪拜海外仓（虚构）",
    "available": 0,
    "transit": 6,
    "date": "2026-09-25",
    "unit": "台",
    "clearance": "清关中（示例）",
    "outbound": "已出关（示例）"
  },
  {
    "material": "制动片",
    "trim": "标准件",
    "color": "不适用",
    "warehouse": "天津港出口前置仓（虚构）",
    "available": 36,
    "transit": 12,
    "date": "2026-09-26",
    "unit": "件",
    "clearance": "待清关（示例）",
    "outbound": "待出关（示例）"
  }
];
const WAREHOUSES = [...new Set(INVENTORY.map(r => r.warehouse))];
const MATERIALS = [...new Set(INVENTORY.map(r => r.material))];
const USERS = {
  a: {name:'经销商甲 · 星舟汽车（虚构）', materials:['L6','L9','制动片'], warehouses:WAREHOUSES.filter(w=>/天津|迪拜/.test(w))},
  b: {name:'经销商乙 · 远山汽车（虚构）', materials:['L7','L8'], warehouses:WAREHOUSES.filter(w=>/上海|阿拉木图/.test(w))},
  staff: {name:'内部业务员 · 林知（虚构）', materials:MATERIALS, warehouses:WAREHOUSES}
};
const EXAMPLES = [
  ['正常查询','查询最新的 L9 进阶版在迪拜仓的库存'],
  ['缺参追问','查询最新的 L9 库存'],
  ['歧义澄清','查询最新的 L9 在天津或迪拜仓的库存'],
  ['越权拒答','查询最新的 L9 在上海仓的库存'],
  ['写操作拒绝','帮我锁库 L9，并承诺明天交付'],
  ['陈旧数据','查询最新的 L9 在阿拉木图仓的库存']
];
const NAMES = ['问题分类','参数抽取','追问澄清','权限校验','库存服务','返回校验','组织答案'];
const NODES = ['问题分类器','参数提取器','条件分支 / 追问','代码节点 / 授权规则','受控接口工具（本地模拟）','代码节点 / 数据规则','大模型节点（模板模拟）'];
const DESIGNS = ['先识别意图，把写操作拦在数据访问之前。','把自然语言转为确定字段，避免查错对象或时间。','一次只问一项，不替用户猜测仓库或车型。','物料和仓库同时校验；自然语言不能覆盖会话权限。','库存服务负责口径与数量，语言模型不做数量推算。','把异常和缺失与零库存区分，陈旧快照必须明确提示。','保留数量、单位与时间来源，物流状态不能代替交期承诺。'];
const FIXED_DATE = '2026-09-26';
function extract(q, answers={}) {
  const models=MATERIALS.filter(m => m==='制动片' ? /制动片|刹车片/.test(q) : new RegExp('(^|[^a-z0-9])'+m+'(?![a-z0-9])','i').test(q));
  const warehouses=WAREHOUSES.filter(w=>q.includes(w.split(/出口|海外/)[0].replace('港','')));
  const dates=q.match(/\d{4}-\d{2}-\d{2}/g)||[];
  const time=dates.length ? [...new Set(dates)] : /最新|今天|当前/.test(q)?['最新快照']:[];
  const trims=[['基础版','Pro'],['进阶版','Max'],['旗舰版','Ultra']].filter(a=>a.some(x=>q.toLowerCase().includes(x.toLowerCase()))).map(a=>a[0]);
  const colors=['星河灰','珍珠白','曜岩黑','银灰'].filter(x=>q.includes(x));
  return {...{material:models,warehouse:warehouses,time,trim:trims,color:colors},...Object.fromEntries(Object.entries(answers).map(([k,v])=>[k,[v]]))};
}
function describe(p) {
  return [['material','物料'],['warehouse','仓库'],['time','时间'],['trim','配置'],['color','颜色']].map(([k,n])=>`${n}：${p[k].join('、') || (['trim','color'].includes(k)?'全部（可选项）':'未提供')}`).join('\n');
}
function simulate(q, userId, answers={}, fault='none') {
  const user=USERS[userId], p=extract(q,answers);
  const write=/调拨|锁库|锁定|预留|冻结|修改|更改|改数量|改成|改为|调整库存|设置库存|扣库存|增加库存|减少库存|扣减|承诺|保证|交期|交付|到货日期/.test(q);
  const query=/查|库存|在途|可用|数量|多少|清关|出关|有货/.test(q);
  const missing=['material','warehouse','time','trim','color'].find(k=>p[k].length>1 || (!p[k].length && ['material','warehouse','time'].includes(k)));
  const labels={material:'车型或备件物料',warehouse:'仓库',time:'查询时间',trim:'配置',color:'颜色'};
  let clarification=null, rows=[], warnings=[], status='success', message='', serviceCalled=false;
  const steps=NAMES.map((name,i)=>({name,node:NODES[i],input:'未进入',process:'前置条件未满足，本节点不执行。',output:'未执行',design:DESIGNS[i]}));
  function set(i,input,process,output){Object.assign(steps[i],{input,process,output});}
  set(0,q,'关键词识别查询意图；写操作或业务承诺优先拦截。',write?'识别为写操作或交期承诺':query?'识别为只读库存查询':'无法识别为库存查询');
  if(write || !query){
    status=write?'write':'unsupported';
    message=write?'拒绝执行：本助手仅支持只读查询。调拨、锁库、修改数量和承诺交期涉及库存占用或业务责任，请联系业务负责人，由人工核验并通过正式流程处理。本页未发送人工工单，也未修改库存。':'当前仅支持库存查询。请提供车型或备件物料、仓库与查询时间；例如“查询最新的 L9 在迪拜仓的库存”。';
    steps[0].output=message;
  } else {
    set(1,q,'本地规则匹配物料、仓库、时间；配置和颜色可选，不汇总不同配置。',describe(p));
    if(missing){
      status='clarify';
      const opts=p[missing].length>1?p[missing]:missing==='material'?MATERIALS:missing==='warehouse'?WAREHOUSES:missing==='time'?['最新快照',FIXED_DATE]:[];
      clarification={key:missing,options:opts};
      message=`${p[missing].length>1?'发现多个候选值':'查询条件缺失'}，请明确${labels[missing]}（一次选择一项）。`;
      set(2,describe(p),'缺参或多值时暂停。收到补充后重新检查所有参数，未补齐不访问服务。',message);
    }else{
      set(2,describe(p),'检查必填字段与歧义；可选配置、颜色未指定时逐条返回。','参数已明确，无需追问。');
      const allowed=user.materials.includes(p.material[0]) && user.warehouses.includes(p.warehouse[0]);
      set(3,`${user.name}\n物料：${p.material[0]}\n仓库：${p.warehouse[0]}`,'同时核验物料白名单与仓库白名单；内部业务员也不能执行写操作。',allowed?'授权通过，允许只读访问。':'授权不通过，禁止访问库存服务。');
      if(!allowed){status='denied';message='拒绝查询：物料或仓库不在当前身份的授权范围内。请联系业务负责人核验授权；库存服务未被调用，不披露库存是否存在或库存数量。';}
      else{
        serviceCalled=true;
        rows=INVENTORY.filter(r=>r.material===p.material[0] && r.warehouse===p.warehouse[0] && (!p.trim.length||p.trim.includes(r.trim)) && (!p.color.length||p.color.includes(r.color)) && (p.time[0]==='最新快照'||r.date===p.time[0])).map(r=>({...r}));
        if(fault==='negative' && rows.length)rows[0].available=-1;
        if(fault==='unit' && rows.length)rows[0].unit='';
        if(fault==='date' && rows.length)rows[0].date='无效日期';
        set(4,describe(p),'模拟受控库存服务读取内置记录；精确日期只匹配已有快照，不估算历史或未来库存。',fault==='timeout'?'服务不可用，未获得有效返回。':`返回 ${rows.length} 条示例记录；数量由服务直接提供。`);
        if(fault==='timeout'){
          status='error';message='库存服务暂不可用，无法确认数量。请稍后重试或联系库存负责人；不得将查询失败视为零库存。';
          set(5,'库存服务错误','工具失败时阻断数量回答。',message);rows=[];
        }else{
          const invalid=rows.some(r=>![r.available,r.transit].every(n=>Number.isInteger(n)&&n>=0)||r.unit!==(r.material==='制动片'?'件':'台')||!/^\d{4}-\d{2}-\d{2}$/.test(r.date)||!Number.isFinite(Date.parse(r.date))||r.date>FIXED_DATE);
          if(invalid){status='invalid';message='返回值校验失败：数量、单位或更新时间不符合规则。已屏蔽整批数量，请联系库存负责人核查；不自动修正或推算。';rows=[];}
          else if(!rows.length){status='empty';message='未找到符合条件的示例记录。查无记录不等于零库存，请确认配置、仓库和日期，或联系库存负责人。';}
          else{
            if(rows.some(r=>(Date.parse(FIXED_DATE)-Date.parse(r.date))/86400000>3))warnings.push('数据陈旧：快照较演示基准日早于三天以上，请人工核验。');
            if(rows.some(r=>r.available===0&&r.transit>0))warnings.push('可用为零但存在在途；在途不计入可用，也不代表可承诺交付。');
            message='已取得授权范围内的库存快照（示例）。各配置分别展示，不自行汇总；可用与在途分开。';
          }
          set(5,'库存服务返回记录（示例）','检查非负整数、单位、有效更新时间；以固定演示基准日检查是否陈旧。',invalid?message:rows.length?`返回值合法。${warnings.join('')||'未发现数据异常。'}`:message);
        }
      }
    }
  }
  if(status!=='clarify')set(6,rows.length?'已校验的库存服务记录':message,'模板组织回答；保留拒答、异常和人工处理建议，不添加数量或交期。',message);
  return {steps,status,message,clarification,rows,warnings,params:p,serviceCalled};
}
const $=id=>document.getElementById(id);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let state={q:'',answers:{},index:0,reached:0,result:null};
function showScope(){const u=USERS[$('identity').value];$('scope').innerHTML=`<b>授权物料</b>${esc(u.materials.join('、'))}<b>授权仓库</b>${u.warehouses.map(esc).join('<br>')}`;}
function reset(){state={q:'',answers:{},index:0,reached:0,result:null};$('question').value='';$('fault').value='none';render();}
function start(q){if(!q.trim()){$('inputHint').textContent='请先输入库存问题，或点击上方示例。';$('question').focus();return;}state={q:q.trim(),answers:{},index:0,reached:0,result:simulate(q.trim(),$('identity').value,{},$('fault').value)};$('question').value=q.trim();$('inputHint').textContent='每次提交开始新查询；缺参时请使用回复中的选项补充。';render();}
function stockHtml(r){return `<div class="stock"><b>${esc(r.material)} · ${esc(r.trim)} · ${esc(r.color)}</b><p>${esc(r.warehouse)}</p><div class="quantities"><div><span>可用数量 · 示例</span><strong>${r.available}</strong> ${esc(r.unit)}</div><div><span>在途数量 · 示例</span><strong>${r.transit}</strong> ${esc(r.unit)}</div></div><p>清关状态：${esc(r.clearance)}<br>出关状态：${esc(r.outbound)}<br>单位：${esc(r.unit)} · 更新时间：${esc(r.date)}（快照日）</p></div>`;}
function render(){
  const r=state.result,i=state.index;
  $('progress').textContent=r?`${i+1} / ${NAMES.length}`:'';
  $('steps').innerHTML=NAMES.map((n,j)=>`<button class="step ${j===i&&r?'current':j<=state.reached&&r?'visited':''}" data-step="${j}" ${!r||j>state.reached?'disabled':''} ${j===i&&r?'aria-current="step"':''}><em>${String(j+1).padStart(2,'0')}</em>${n}</button>`).join('');
  $('prev').disabled=!r||i===0;
  const blocked=r&&r.status==='clarify'&&i===2;
  $('next').disabled=!r||i===6||blocked;
  $('next').textContent=blocked?'等待补充条件':i===6?'流程已结束':'下一步 →';
  $('traceStatus').textContent=!r?'等待提问':blocked?'等待澄清':i===6?'流程结束':'逐步演示';
  if(!r){$('messages').innerHTML='<div class="bubble assistant"><div class="who">库存查询助手</div><div class="body">你好，我可以查询授权范围内的库存。<br><span class="muted">从上方示例开始，观察参数、权限与数据如何一步步被校验。</span></div></div>';$('stepDetail').innerHTML='<div class="design"><b>产品设计要点</b> · 把模型、规则与人工的职责边界放进可追踪的流程。</div>';return;}
  const s=r.steps[i];
  $('stepDetail').innerHTML=`<div class="node-label">对应 Dify 节点：${esc(s.node)} · 本地模拟</div><div class="detail-grid"><div><h3>输入</h3><p>${esc(s.input)}</p></div><div><h3>系统处理 · 节点与规则</h3><p>${esc(s.process)}</p></div><div><h3>输出</h3><p>${esc(s.output)}</p></div></div><div class="design"><b>产品设计要点</b> · ${esc(s.design)}</div>`;
  let body='正在逐步处理，请点击“下一步”查看节点输出。';
  if(i===0)body=r.steps[0].output;
  if(i===1)body='已抽取查询参数；下一步检查缺参和歧义。';
  if(i===2)body=r.steps[2].output;
  if(i===3)body=r.status==='denied'?r.message:r.steps[3].output;
  if(i===4||i===5)body=r.steps[i].output;
  if(i===6)body=r.message;
  if(['write','unsupported'].includes(r.status))body=r.message;
  let content=esc(body);
  if(blocked)content+=`<div class="choices">${r.clarification.options.map((o,j)=>`<button data-choice="${j}">${esc(o)}</button>`).join('')}</div>`;
  if(i===6&&r.rows.length)content+=`<div class="inventory">${r.rows.map(stockHtml).join('')}</div>${r.warnings.map(w=>`<div class="notice">${esc(w)}</div>`).join('')}<p class="muted">异常提示：${r.warnings.length?'见上方提示':'未发现数据异常（示例校验）'}<br>来源：本地虚构库存服务 · 物流状态为演示补充 · 不承诺交期</p>`;
  $('messages').innerHTML=`<div class="bubble user"><div class="who">${esc(USERS[$('identity').value].name)}</div><div class="body">${esc(state.q)}</div></div>${Object.values(state.answers).map(v=>`<div class="bubble user"><div class="who">补充条件</div><div class="body">${esc(v)}</div></div>`).join('')}<div class="bubble assistant"><div class="who">库存查询助手 · ${esc(NAMES[i])}</div><div class="body">${content}</div></div>`;
}
const CASES=[
 {name:'精确命中车型、配置与仓库',category:0,user:'a',q:EXAMPLES[0][1],expect:'可用 12 台，在途 8 台；更新时间 2026-09-25。',check:r=>r.status==='success'&&r.rows.length===1&&r.rows[0].available===12&&r.rows[0].transit===8&&r.rows[0].date==='2026-09-25'},
 {name:'缺少仓库时先追问',category:1,user:'a',q:EXAMPLES[1][1],expect:'追问仓库，不访问服务。',check:r=>r.status==='clarify'&&r.clarification.key==='warehouse'&&!r.serviceCalled},
 {name:'两个仓库候选需澄清',category:1,user:'a',q:EXAMPLES[2][1],expect:'要求选择仓库，不猜测、不访问服务。',check:r=>r.status==='clarify'&&r.clarification.options.length===2&&!r.serviceCalled},
 {name:'越权仓库拒答',category:2,user:'a',q:EXAMPLES[3][1],expect:'拒绝查询，不调用库存服务。',check:r=>r.status==='denied'&&!r.serviceCalled&&!r.rows.length},
 {name:'授权仓库内的越权物料',category:2,user:'a',q:'查询最新的 L7 在天津仓的库存',expect:'物料未授权，拒绝查询。',check:r=>r.status==='denied'&&!r.serviceCalled},
 {name:'写操作与交期承诺拒绝',category:2,user:'staff',q:EXAMPLES[4][1],expect:'内部用户同样拒绝写入，建议人工处理。',check:r=>r.status==='write'&&!r.serviceCalled},
 {name:'补齐条件后完成查询',category:3,user:'a',q:EXAMPLES[1][1],answers:{warehouse:WAREHOUSES.find(w=>w.includes('迪拜'))},expect:'补充迪拜仓后返回两条配置记录，不合并数量。',check:r=>r.status==='success'&&r.serviceCalled&&r.rows.length===2},
 {name:'陈旧数据提示',category:3,user:'staff',q:EXAMPLES[5][1],expect:'保留 2026-09-10 快照日，并提示陈旧。',check:r=>r.status==='success'&&r.warnings.some(w=>w.includes('陈旧'))},
 {name:'异常数量拦截',category:0,user:'a',q:EXAMPLES[0][1],fault:'negative',expect:'负数量导致整批结果屏蔽，不擅自修正。',check:r=>r.status==='invalid'&&!r.rows.length},
 {name:'零库存与查无记录区分',category:3,user:'staff',q:'查询最新的 MEGA 在阿拉木图仓的库存',expect:'查无记录，不回答零库存。',check:r=>r.status==='empty'&&!r.rows.length},
 {name:'可用为零但仍有在途',category:0,user:'a',q:'查询最新的 L6 在上海仓的库存',demoUser:'staff',expect:'可用 0 台，在途 24 台，两者分开且不承诺交付。',check:r=>r.status==='success'&&r.rows[0].available===0&&r.rows[0].transit===24&&r.warnings.length>0},
 {name:'备件数量与单位',category:0,user:'a',q:'查询最新的制动片在天津仓的库存',expect:'示例备件可用 36 件，在途 12 件。',check:r=>r.status==='success'&&r.rows[0].unit==='件'&&r.rows[0].available===36}
];
const METRICS=[['参数与结果正确率','核对字段、数量、单位和快照日期'],['追问是否恰当','检查缺参、歧义与追问时机'],['越权拒答','检查物料、仓库及只读边界'],['端到端成功率','检查完整路径、异常与结果表达']];
function renderEval(run=false){
 $('metrics').innerHTML=METRICS.map(([n,d])=>`<div class="metric"><h3>${n}</h3><p>${d}</p><b>仅展示本地用例判定</b></div>`).join('');
 $('evalResults').innerHTML=CASES.map((c,i)=>{const r=run?simulate(c.q,c.demoUser||c.user,c.answers||{},c.fault||'none'):null;return `<article class="eval-item"><div><div class="eyebrow">${METRICS[c.category][0]} · 示例用例 ${String(i+1).padStart(2,'0')}</div><h3>${esc(c.name)}</h3><p>${esc(USERS[c.demoUser||c.user].name)} · ${esc(c.q)}</p><p>预期：${esc(c.expect)}</p>${c.answers?'<p>补充条件：迪拜海外仓（虚构）</p>':''}<div class="eval-status">${run?`本地判定：${c.check(r)?'符合预期':'不符合预期'} · ${esc(r.message)}`:'本地判定：未运行'}</div></div><button data-case="${i}">载入演示 →</button></article>`;}).join('');
}
function tab(evalMode){$('demoPage').hidden=evalMode;$('evalPage').hidden=!evalMode;for(const [id,active] of [['demoTab',!evalMode],['evalTab',evalMode]]){$(id).classList.toggle('active',active);$(id).setAttribute('aria-selected',String(active));}}
$('examples').innerHTML=EXAMPLES.map(([n],i)=>`<button data-example="${i}">${esc(n)} <span>↗</span></button>`).join('');
$('examples').addEventListener('click',e=>{const b=e.target.closest('[data-example]');if(b)start(EXAMPLES[Number(b.dataset.example)][1]);});
$('queryForm').addEventListener('submit',e=>{e.preventDefault();start($('question').value);});
$('identity').addEventListener('change',()=>{showScope();reset();});
$('reset').addEventListener('click',reset);
$('fault').addEventListener('change',()=>{if(state.q)start(state.q);});
$('prev').addEventListener('click',()=>moveStep(-1));
$('next').addEventListener('click',()=>moveStep(1));
$('steps').addEventListener('click',e=>{const b=e.target.closest('[data-step]');if(b&&!b.disabled){state.index=Number(b.dataset.step);render();}});
$('messages').addEventListener('click',e=>{const b=e.target.closest('[data-choice]');if(!b||!state.result.clarification)return;const c=state.result.clarification;state.answers[c.key]=c.options[Number(b.dataset.choice)];state.result=simulate(state.q,$('identity').value,state.answers,$('fault').value);state.index=2;state.reached=2;render();});
$('demoTab').addEventListener('click',()=>tab(false));$('evalTab').addEventListener('click',()=>tab(true));
$('runEval').addEventListener('click',()=>renderEval(true));
$('evalResults').addEventListener('click',e=>{const b=e.target.closest('[data-case]');if(!b)return;const c=CASES[Number(b.dataset.case)];$('identity').value=c.demoUser||c.user;showScope();$('fault').value=c.fault||'none';start(c.q);if(c.answers){state.answers={...c.answers};state.result=simulate(state.q,$('identity').value,state.answers,$('fault').value);render();}tab(false);});
// The tour follows the README script. Durations are presentation timing only.
const TOUR = [
  {chapter:'场景与真实性', seconds:25, intro:true},
  ...[6,6,6,6,6,6,9].map((seconds,step)=>({chapter:'正常查询',example:0,step,seconds})),
  ...[5,5,8].map((seconds,step)=>({chapter:'缺参追问',example:1,step,seconds})),
  {chapter:'缺参追问 · 补充迪拜仓',example:1,step:2,answer:true,seconds:6},
  {chapter:'缺参追问 · 补齐后校验权限',example:1,step:3,seconds:6},
  ...[4,4,4,7].map((seconds,step)=>({chapter:'越权拒答',example:3,step,seconds})),
  {chapter:'写操作拒绝',example:4,step:0,seconds:6},
  ...[3,3,3,3,3,5,5].map((seconds,step)=>({chapter:'返回异常 · 负数量',example:0,fault:'negative',step,seconds})),
  {chapter:'评测口径',eval:true,seconds:10},
  {chapter:'评测收尾 · 本地判定',eval:true,run:true,seconds:10}
];
let tourIndex=-1, tourTimer=null, tourPlaying=false, tourFinished=false;
function syncTour(){
  $('autoplay').textContent=tourPlaying?'Ⅱ 暂停演示':tourFinished?'↻ 重新播放讲稿':tourIndex>=0?'▶ 继续演示':'▶ 演示模式 / 自动播放';
  $('autoplay').setAttribute('aria-pressed',String(tourPlaying));
  if(tourFinished){$('tourStatus').textContent='讲稿演示已结束 · 可重新播放或手动探索';return;}
  $('tourStatus').textContent=tourIndex<0?'按讲稿自动播放，也可随时手动探索':`${tourPlaying?'自动播放':'已暂停'} · ${TOUR[tourIndex].chapter}${TOUR[tourIndex].step!==undefined?' / '+NAMES[TOUR[tourIndex].step]:''}`;
}
function pauseTour(discard=false){
  clearTimeout(tourTimer);tourTimer=null;tourPlaying=false;
  if(discard){tourIndex=-1;tourFinished=false;}
  syncTour();
}
function tourScroll(target){
  $(target).scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
}
function showTourFrame(){
  const frame=TOUR[tourIndex];
  if(frame.intro){
    tab(false);$('identity').value='a';showScope();reset();
    document.querySelector('.access-details').open=window.innerWidth>720;
    window.scrollTo({top:0,behavior:'instant'});
  }else if(frame.eval){tab(true);renderEval(Boolean(frame.run));tourScroll('evalPage');}
  else{
    tab(false);
    if(frame.step===0){$('identity').value='a';showScope();$('fault').value=frame.fault||'none';start(EXAMPLES[frame.example][1]);}
    if(frame.answer){
      state.answers.warehouse=WAREHOUSES.find(w=>w.includes('迪拜'));
      state.result=simulate(state.q,$('identity').value,state.answers,$('fault').value);
    }
    state.index=frame.step;state.reached=Math.max(state.reached,frame.step);render();
    // Show the answer/clarification in context; other frames focus on the trace.
    tourScroll(frame.step===6||frame.step===2||frame.example===4?'messages':'traceAnchor');
  }
  syncTour();
}
function scheduleTour(){
  clearTimeout(tourTimer);
  tourTimer=setTimeout(()=>{
    if(!tourPlaying)return;
    if(tourIndex===TOUR.length-1){tourFinished=true;pauseTour();return;}
    tourIndex++;showTourFrame();scheduleTour();
  },TOUR[tourIndex].seconds*1000);
}
$('autoplay').addEventListener('click',()=>{
  if(tourPlaying){pauseTour();return;}
  tourPlaying=true;
  if(tourIndex<0||tourFinished){tourFinished=false;tourIndex=0;showTourFrame();}
  syncTour();scheduleTour();
});
// Manual interaction takes ownership, preventing a later timer from replacing it.
document.addEventListener('click',e=>{
  if(e.target.closest('#autoplay'))return;
  if(e.target.closest('button,select,input,summary,a'))pauseTour(true);
},true);
document.addEventListener('input',()=>pauseTour(true));
document.addEventListener('change',()=>pauseTour(true));
document.addEventListener('visibilitychange',()=>{if(document.hidden&&tourPlaying)pauseTour();});
function moveStep(direction){
  const button=$(direction<0?'prev':'next');
  if(button.disabled)return;
  state.index+=direction;state.reached=Math.max(state.reached,state.index);render();
}
document.addEventListener('keydown',e=>{
  if(e.defaultPrevented||e.altKey||e.ctrlKey||e.metaKey||e.shiftKey||e.target.closest('input,select,textarea,[contenteditable="true"]'))return;
  if($('demoPage').hidden||!['ArrowLeft','ArrowRight'].includes(e.key))return;
  e.preventDefault();pauseTour(true);moveStep(e.key==='ArrowLeft'?-1:1);
});
$('portfolioLink').addEventListener('click',e=>{
  if(!/\/demos\/[^/]+\/(?:index\.html)?$/.test(location.pathname)){
    e.preventDefault();
    $('portfolioHint').hidden=false;
  }
});
// Keep the notice and pause control visible without covering scroll targets.
const stickyObserver=new ResizeObserver(()=>{
  const root=document.documentElement;
  root.style.setProperty('--notice-height',document.querySelector('.disclaimer').getBoundingClientRect().height+'px');
  root.style.setProperty('--tour-height',document.querySelector('.tour-bar').getBoundingClientRect().height+'px');
});
stickyObserver.observe(document.querySelector('.disclaimer'));
stickyObserver.observe(document.querySelector('.tour-bar'));
document.querySelector('.access-details').open=window.innerWidth>720;
showScope();render();renderEval();syncTour();
