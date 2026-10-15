'use strict';
const $ = id => document.getElementById(id);
const esc = v => String(v).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const keys = ['背景','约束','备选方案','选择理由','被否掉的路线','后果','反例'];
const makeCase = (id,title,category,scene,scale,condition,parts,rule,pending) => ({id,title,category,scene,scale,condition,parts,rule,pending,feedback:[]});
const initialCases = [
makeCase('C01','布草：全国框架价与区域履约','布草','集采模式选择','跨区域多门店','规格可统一；用量稳定；需要区域履约。',['虚构酒店集团希望统一布草采购标准。','品牌规格有差异，跨区域物流与断供风险需兼顾。','全国单一供应商、纯区域采购、全国框架与区域履约。','选择全国框架与区域履约，兼顾统一议价和供应连续性。','否掉全国单一供应商，原因是跨区域物流和单点断供风险。','示例情境中出现区域延迟，由备用履约商补位；不代表真实效果。','高度定制或单城市小规模需求不可直接套用。'],'先确认规格，再评估物流与断供影响。','各区域履约能力、品牌规格清单待核实。'),
makeCase('C03','生鲜：保留本地采购与价格监控','生鲜','集采范围划定','跨区域多门店','保质期短；依赖本地配送；无区域中央厨房。',['虚构集团讨论是否将生鲜纳入统一采购。','保质期短、菜谱差异大、食品安全需要溯源。','全部集团集采、本地采购与价格监控、区分鲜品和冻品。','鲜品本地采购与监控，冻品和干货另行评估。','否掉鲜品全部跨区域集采，原因是损耗与品质风险。','示例情境转向按品类管理，结果仍需后续验证。','存在区域中央厨房时应重新评估，不能直接套用。'],'品类边界优先于集中采购范围；布草经验不能套用到鲜品。','价格偏离阈值、食品安全责任与本地供应能力待确认。'),
makeCase('C04','供应商：准入不能只看价格','通用','供应商准入','多门店','需建立持续供货的供应商库；非一次性零星采购。',['虚构集团复盘低价中标后的质量与交付问题。','采购人员有限，需要品牌资质与稳定供货。','最低价中标、分阶段准入与评级、只选大品牌。','资质审核、样品测试、小批量试供后准入。','否掉只看价格；大品牌也不必然具备区域履约能力。','示例情境建立质量、交付、价格和服务的评审记录。','一次性小额采购是否简化流程需要另行确认。'],'准入看资质与试供，不用报价替代质量和交付评价。','评分权重和简化流程门槛待专家确认。'),
makeCase('C05','平台：先明确集成边界再选型','系统规划','系统选型','多门店','从零规划采购平台；需重新核实当前系统与市场条件。',['虚构集团需要支撑目录、审批与对账的平台。','既有财务系统需要集成，系统升级与员工使用需兼顾。','独立采购平台、现有系统扩展、表格过渡。','该示例选择独立采购平台并限定数据接口范围。','否掉未经排期评估的扩展路线与长期人工对账。','示例情境补充字段映射表处理接口口径问题。','现有系统已具备成熟采购能力时，结论可能不同。'],'先定上线要求、集成对象与升级成本。','时效性案例：选型、费用和资源均需按当前情况复核。'),
makeCase('C06','推广：先试点，再分批切换','实施推广','上线与切换','跨区域多门店','多门店流程切换；试点需覆盖品牌和地区差异。',['虚构集团需要推广采购平台。','门店与供应商都需要培训，切换不能影响运营。','全量切换、门店试点后分批推广、按品类切换。','选择有差异的门店试点，修复问题后推广。','否掉全量切换，避免问题同时影响所有门店。','示例情境在试点中识别收货流程问题并调整。','小规模单地门店与硬性截止日期需要单独评估。'],'试点用于发现问题，并预留修复与复核环节。','试点周期与切换准入条件待专家确认。')
];
const interview = [
'访谈人：工程维修备件最终怎么采购？',
'虚构顾问老周：先区分标准高频件和零散长尾件。量小又急用，全走招标并不适合。',
'访谈人：考虑过哪些路线？',
'老周：全部招标、全部放目录都考虑过。最后高频标准件进协议目录，长尾件按授权额度自采并补录、抽查。',
'访谈人：额度是多少？',
'老周：各品牌不一样，我记不准，找工程采购负责人确认，不能填一个统一数字。',
'访谈人：有什么教训？',
'老周：试过把长尾都放目录，维护跟不上，价格过时后门店绕开了目录。特种设备备件要原厂或有资质的维保单位，不能套普通备件的做法。'
];
const extracted = ['虚构酒店集团希望规范维修备件采购。','品项分散、单品用量小且急用；授权额度待工程采购负责人确认。','全部招标、全部目录、分层采购。','高频标准件进入协议目录；长尾在授权额度内自采并补录、抽查。','全部招标不适应零散急用；全部目录带来维护负担。','示例访谈描述目录维护滞后引发绕行采购，不推断实际成效。','特种设备备件不适用普通目录或长尾自采路线，应使用原厂或具备资质的维保单位。'];
const titles = {a:['结构化访谈','抽取案例草稿','顾问逐条校对','元数据与入库'],b:['结构化需求','识别缺失与追问','整案召回','生成方案初稿','专家审核评分','修改原因回写']};
let cases, state;
function reset(){cases=structuredClone(initialCases);state={flow:'a',a:0,b:0,aMax:0,bMax:0,extracted:false,checks:Array(7).fill(false),parts:[...extracted],saved:false,meta:{category:'维修备件',scene:'分层采购',scale:'多门店',condition:'高频标准件与长尾并存；特种设备备件排除。'},req:{category:'布草',scope:'跨区域多门店',goal:'统一规格与采购管理',condition:'规格可统一、用量稳定'},preset:0,scores:['','',''],reason:'',revision:'',reviewed:false,written:false};render();}
function toast(msg){$('notice').textContent=msg;$('notice').classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>$('notice').classList.remove('show'),2600);}
function invalidate(){state.bMax=Math.min(state.bMax,1);state.b=Math.min(state.b,1);state.scores=['','',''];state.reviewed=false;state.written=false;state.reason='';state.revision='';}
function missing(){return [['category','品类'],['scope','覆盖范围'],['goal','目标'],['condition','适用条件']].find(([k])=>!state.req[k]);}
function retrieved(){const r=state.req;return cases.filter(c=>c.category===r.category && (c.id!=='C07'||state.saved) && (r.category==='布草'?r.scope==='跨区域多门店'&&r.condition==='规格可统一、用量稳定':r.category==='生鲜'?r.condition==='无区域中央厨房、依赖本地配送':r.condition==='普通备件，排除特种设备'));}
function gate(){if(state.flow==='a'){return [true,state.extracted,state.checks.every(Boolean)&&state.parts.every(x=>x.trim()),state.saved][state.a];}if(state.flow==='b'){return [!!state.req.category,!missing(),retrieved().length>0,true,state.reviewed,state.written][state.b];}return true;}
function head(title,sub,node){return `<div class="stage-top"><div><h2>${title}</h2><div class="sub">${sub}</div></div><span class="tag">${node}</span></div>`;}
function process(s){return `<div class="process"><b>系统处理 · </b>${s}</div>`;}
function design(s){return `<div class="design"><b>产品设计要点</b>${s}</div>`;}
function box(label,body,output=false){return `<div class="box ${output?'output':''}"><div class="label">${label}</div>${body}</div>`;}
function detail(c){return `<article class="case-card"><h3>${esc(c.id)} · ${esc(c.title)}</h3><span class="tag">虚构案例</span><p><b>元数据：</b>${esc(c.category)} / ${esc(c.scene)} / ${esc(c.scale)}</p><p><b>适用条件：</b>${esc(c.condition)}</p><details><summary>展开完整案例、反例与修改记录</summary><dl>${keys.map((k,i)=>`<dt>${k}</dt><dd>${esc(c.parts[i])}</dd>`).join('')}<dt>判断规则</dt><dd>${esc(c.rule)}</dd><dt>待专家确认</dt><dd>${esc(c.pending)}</dd><dt>来源</dt><dd>${c.id==='C07'?'模拟访谈经本轮顾问校对':'参考模拟案例改编'}，非客户资料。</dd><dt>专家修改记录</dt><dd>${c.feedback.length?c.feedback.map(f=>`<p>修改：${esc(f.revision)}<br>原因：${esc(f.reason)}<br>适用范围：${esc(f.scope)}；仅限本需求，不覆盖原案例判断。</p>`).join(''):'本轮暂无回写。'}</dd></dl></details></article>`;}
function render(){document.querySelectorAll('[data-flow]').forEach(b=>{b.classList.toggle('active',b.dataset.flow===state.flow);b.setAttribute('aria-pressed',b.dataset.flow===state.flow);});const lib=state.flow==='library';$('navigation').hidden=lib;$('steps').innerHTML=lib?'<li class="empty">整案保留 · 条件先行</li>':titles[state.flow].map((t,i)=>`<li><button data-step="${i}" ${i>state[state.flow+'Max']?'disabled':''} class="${i===state[state.flow]?'active':''}" ${i===state[state.flow]?'aria-current="step"':''}><span class="step-num">${String(i+1).padStart(2,'0')}</span>${t}</button></li>`).join('');$('progress').textContent=lib?'':`${state[state.flow]+1} / ${titles[state.flow].length}`;$('stage').innerHTML=lib?head('示例案例库','所有案例均为虚构；展开后查看完整判断过程。','本地内存数据')+cases.map(detail).join(''):state.flow==='a'?renderA():renderB();if(!lib){const n=state[state.flow];$('prev').disabled=n===0&&state.flow==='a';$('next').disabled=!gate();$('next').textContent=n===titles[state.flow].length-1?(state.flow==='a'?'进入方案流程 →':'查看回写案例 →'):'下一步 →';$('gate').textContent=gate()?'可继续，也可返回查看':state.flow==='a'?'请完成本步骤的抽取、校对或入库操作':'请先补齐信息、找到适用案例或完成审核';}bindStage();animateStage();}
function renderA(){switch(state.a){case 0:return head('把经验问完整','输入模拟访谈 · 关注“为什么这样选”','对应工作流节点：开始')+`<div class="io">${box('输入 · 模拟访谈节选',interview.map(x=>`<p>${x}</p>`).join(''))}${box('输出 · 七要素访谈提纲',keys.map((k,i)=>`<div class="rule"><span class="tag">${i+1}</span><div><b>${k}</b><p>${['当时要解决什么业务问题？','有哪些不可突破的条件？','曾考虑哪些不同做法？','为什么最终选择这条路？','放弃什么，为什么放弃？','发生了什么，哪些尚未验证？','什么情况下不能复用这个结论？'][i]}</p></div></div>`).join(''),true)}</div>`+process('按七要素组织访谈；口述里不确定的授权额度保留为待确认项。')+design('追问取舍与反例，才能沉淀判断逻辑，而非只有最终结论。');
case 1:return head('从口述到可校对的案例','固定模板模拟抽取；没有实际调用模型。','对应工作流节点：大语言模型')+box('输入', '上一阶段的模拟维修备件访谈。')+process('按七要素映射预置示例文本；保留否决路线和安全反例，不补任何授权金额。')+`<button class="primary" id="extract">${state.extracted?'重新查看抽取结果':'模拟抽取案例草稿'}</button>`+(state.extracted?box('输出 · 尚未校对',`<dl>${keys.map((k,i)=>`<dt>${k}</dt><dd>${esc(extracted[i])}</dd>`).join('')}</dl><div class="warning">授权额度：待工程采购负责人确认。不得从口述推测数值。</div>`,true):'<div class="empty">点击抽取，查看七要素草稿。</div>')+design('把抽取与确认分开，避免把流畅的模型输出误当成可靠事实。');
case 2:return head('逐条确认，每个判断都有来源','可修改抽取内容，再勾选确认；修改后该条需要重新确认。','对应工作流节点：人工校对')+box('输入','七要素草稿与模拟访谈原文。')+`<details><summary>对照访谈原文</summary><blockquote>${interview.join('<br>')}</blockquote></details>`+process('每条必须由顾问确认；未知额度仍为待确认，不允许因为字段齐全就自动入库。')+`<div class="label">输出 · 经顾问确认的案例字段</div>${keys.map((k,i)=>`<div class="checkrow"><input type="checkbox" data-check="${i}" aria-label="确认${k}" ${state.checks[i]?'checked':''}><span><b>${k}</b><textarea data-part="${i}" aria-label="${k}抽取内容">${esc(state.parts[i])}</textarea></span></div>`).join('')}`+design('人工校对覆盖全部字段，尤其检查被否路线、反例与缺失信息。');
case 3:return head('补上适用边界，再放入案例库','新案例编号 C07 · 仅写入当前页面内存。','对应工作流节点：代码校验 → 知识库写入')+box('输入', '已逐条校对的维修备件案例；授权额度仍待专家确认。')+process('检查七要素确认状态和元数据非空；保留来源、反例与待确认项。实际平台写入可映射为接口工具，本演示不发起请求。')+`<div class="form-grid">${Object.entries({category:'品类',scene:'场景类型',scale:'客户规模',condition:'适用条件'}).map(([k,v])=>`<label class="field">${v}<input type="text" data-meta="${k}" value="${esc(state.meta[k])}" ${state.saved?'disabled':k!=='scene'?'readonly':''}></label>`).join('')}</div><button id="save-case" class="primary" ${state.saved?'disabled':''}>确认元数据并入库</button>`+box('输出',state.saved?'已入库 C07。方案流程可以召回这个完整案例。':'等待入库。将标记“模拟访谈抽取 + 本轮顾问校对”。',true)+design('用元数据明确适用范围；待确认项随整案一起保存，避免错误复用。');}}
const conditions={'布草':['规格可统一、用量稳定','高度定制，规格不能统一'],'生鲜':['无区域中央厨房、依赖本地配送','已有区域中央厨房'],'维修备件':['普通备件，排除特种设备','涉及特种设备备件']};
function selectField(key,label,options,value){return `<label class="field">${label}<select data-req="${key}" aria-label="${label}"><option value="">请选择</option>${options.map(o=>`<option ${o===value?'selected':''}>${esc(o)}</option>`).join('')}</select></label>`;}
function reqView(){return Object.entries({category:'品类',scope:'覆盖范围',goal:'目标',condition:'客户约束 / 适用条件'}).map(([k,v])=>`<p><b>${v}：</b>${esc(state.req[k]||'缺失，待追问')}</p>`).join('');}
function draft(){const c=retrieved()[0];if(!c)return '';const r=state.req;return `<div class="warning">本初稿需专家审核。以下是规则模板生成的示例，不构成实际采购建议。目标：${esc(r.goal)}；约束：${esc(r.condition)}。</div>${[{title:c.parts[3],rule:c.rule,assumption:c.condition,open:c.pending},{title:'保留被否路线与例外边界，不作统一套用。',rule:c.parts[4],assumption:'当前需求满足案例适用条件，正式使用前仍由专家复核。',open:c.parts[6]}].map((d,i)=>`<article class="draft-item"><h3>方案要点 ${i+1} · ${esc(d.title)}</h3><p><b>依据案例：</b>${esc(c.id)} · ${esc(d.rule)}</p><p><b>关键假设：</b>${esc(d.assumption)}</p><p><b>未决项：</b>${esc(d.open)}</p></article>`).join('')}${c.feedback.length?`<div class="success">整案中附有专家修改记录：${esc(c.feedback[c.feedback.length-1].revision)}。适用范围与原因见案例详情，仍需专家判断是否复用。</div>`:''}`;}
function renderB(){const r=state.req;switch(state.b){case 0:return head('先把需求说清楚','点击示例需求，或调整结构化选项。','对应工作流节点：分类器 → 参数提取器')+`<div class="presets">${['布草如何跨区域采购？','生鲜也要统一集采吗？','备件怎么采？（缺信息）'].map((s,i)=>`<button data-preset="${i}" class="${state.preset===i?'selected':''}">${s}</button>`).join('')}</div><div class="label">输入 · 顾问录入</div><div class="form-grid">${selectField('category','品类',Object.keys(conditions),r.category)}${selectField('scope','覆盖范围',['跨区域多门店','单城市少量门店'],r.scope)}${selectField('goal','目标',['统一规格与采购管理','划定集采边界并保留本地响应','规范备件采购并保留应急能力'],r.goal)}${selectField('condition','客户约束 / 适用条件',conditions[r.category]||[],r.condition)}</div>`+process('这些结构化请求归入“方案初稿”；读取品类、覆盖范围、目标与约束，交由下一步检查。')+box('输出 · 已记录的需求',reqView(),true)+design('固定输入结构有利于校验，也让后续追问保留已知条件。');
case 1:{const m=missing();return head('先追问，再生成','一次只问一个缺失项；已填写内容不会丢失。','对应工作流节点：条件分支 → 直接回复')+box('输入 · 当前需求',reqView())+process('依次校验品类、覆盖范围、目标和适用条件。关键字段为空时阻止进入检索。')+(m?box('输出 · 需要你补充',`<div class="warning">请补充${m[1]}，这会影响案例是否适用。</div>${selectField(m[0],m[1],m[0]==='scope'?['跨区域多门店','单城市少量门店']:m[0]==='goal'?['规范备件采购并保留应急能力']:m[0]==='condition'?conditions[r.category]:Object.keys(conditions),r[m[0]])}`,true):box('输出 · 必需信息已齐全','可以进入整案检索。执行阈值等未确认细节仍会保留在初稿未决项中。',true))+design('缺少影响方案方向的信息时追问；不影响方向的执行细节标为未决项，不能编造。');}
case 2:{const found=retrieved();return head('召回的是整案，不是孤立结论','先检查适用边界，再按品类匹配；不展示虚构的相似度。','对应工作流节点：知识检索 → 代码过滤')+box('输入',reqView())+process('本地按品类、覆盖范围和适用条件硬过滤。仅展示能支撑核心策略的完整案例；其他品类和系统选型案例不会硬凑进答案。')+`<div class="label">输出 · 适用案例</div>${found.length?found.map(detail).join(''):`<div class="warning">未找到满足条件的案例，暂停生成。${r.category==='维修备件'&&!state.saved?'请先走完“经验沉淀”将 C07 入库，再返回此处。':'请返回核实需求条件，或由专家补充新案例；不应为了命中而改变真实约束。'}</div><button class="secondary" data-jump-a>前往经验沉淀</button>`}<div class="sub">排除说明：${r.category==='生鲜'?'布草 C01 的标准化集采逻辑不适用于生鲜。':r.category==='布草'?'生鲜 C03 的本地采购逻辑不适用于布草。':'布草与生鲜案例不能替代维修备件判断。'}平台选型 C05 还需按当前条件复核。</div>`+design('让适用条件和反例随案例一同进入上下文，防止断章取义。');}
case 3:return head('生成一份有依据的初稿','每条建议都附案例、关键假设和未决项。','对应工作流节点：规则校验 → 大语言模型')+box('输入',`结构化需求 + ${retrieved().map(c=>esc(c.id)).join('、')} 完整案例 + 示例采购规则。`)+process('按“方案要点 / 依据 / 假设 / 未决项”固定结构组织。示例规则：不得突破客户约束；不得编造额度或评分权重；特种设备排除普通备件路线。')+`<div class="label">输出 · 方案初稿</div>${draft()}`+design('引用不是装饰；每条建议都要说明依据适用的前提，并暴露不确定性。');
case 4:return head('专家审核，决定是否准入','以下为操作者扮演专家的示例评分，不是项目实测。','对应工作流节点：人工审核 → 条件分支')+`<details><summary>输入 · 展开待审方案初稿</summary>${draft()}</details>`+process('示例准入规则：三项均为“符合”才允许回写审核结果；任一不符合则退回修改。此规则仅用于演示，不代表真实项目量化门槛。')+['是否遵守客户约束','是否引用适用案例','是否指出缺失信息'].map((s,i)=>`<div class="score-row"><label for="score-${i}">${s}</label><select id="score-${i}" data-score="${i}"><option value="">未评分</option><option value="0" ${state.scores[i]==='0'?'selected':''}>不符合（示例 0 分）</option><option value="1" ${state.scores[i]==='1'?'selected':''}>符合（示例 1 分）</option></select></div>`).join('')+`<label class="field">专家修改内容<textarea id="revision" placeholder="填写要补充或改写的方案内容">${esc(state.revision)}</textarea></label><label class="field">修改原因<textarea id="reason" placeholder="说明修改依据及适用边界">${esc(state.reason)}</textarea></label><button id="sample-review" class="secondary">填入示例修改意见</button> <button id="review" class="primary">提交示例审核</button>`+box('输出 · 审核结论',state.reviewed?'示例审核通过，可进入回写。此结果仅表示本轮流程准入，不是客户交付验收。':state.scores.includes('0')?'退回修改：存在不符合项。请核对初稿并在修改内容中给出修订，再重新评分。':'尚未通过审核。完成三项评分，并记录修改内容与原因。',true)+design('将“专家认可”变成显式门槛，避免把自动生成直接当作交付完成。');
case 5:return head('把修改原因留给下一次判断','追加案例审阅记录，保留原始来源与适用边界。','对应工作流节点：人工确认 → 回写工具')+box('输入 · 本轮专家修改',`<p><b>修改：</b>${esc(state.revision)}</p><p><b>原因：</b>${esc(state.reason)}</p><p><b>关联：</b>${retrieved().map(c=>esc(c.id)).join('、')}；${esc(r.scope)}；${esc(r.condition)}</p>`)+process('将修改内容、原因与本轮需求边界追加到被引用的案例，不覆盖历史判断；回到案例库可展开查看，后续召回一并携带。')+`<button id="writeback" class="primary" ${state.written?'disabled':''}>确认回写示例案例库</button>`+box('输出 · 经验闭环',state.written?'已回写。点击下方按钮，在对应案例内展开“专家修改记录”。':'等待确认回写；仅影响当前页面的示例案例。',true)+design('沉淀“为什么改”，而不仅保存最后一版文字；反馈复用仍需检查适用范围。');}}
function bindStage(){document.querySelectorAll('[data-step]').forEach(b=>b.onclick=()=>{state[state.flow]=Number(b.dataset.step);render();});document.querySelectorAll('[data-preset]').forEach(b=>b.onclick=()=>{const i=Number(b.dataset.preset);invalidate();state.preset=i;state.req=[{category:'布草',scope:'跨区域多门店',goal:'统一规格与采购管理',condition:conditions['布草'][0]},{category:'生鲜',scope:'跨区域多门店',goal:'划定集采边界并保留本地响应',condition:conditions['生鲜'][0]},{category:'维修备件',scope:'',goal:'',condition:''}][i];render();});document.querySelectorAll('[data-req]').forEach(e=>e.onchange=()=>{invalidate();state.preset=-1;state.req[e.dataset.req]=e.value;if(e.dataset.req==='category')state.req.condition='';render();});document.querySelectorAll('[data-check]').forEach(e=>e.onchange=()=>{state.checks[Number(e.dataset.check)]=e.checked;state.saved=false;state.aMax=2;invalidate();render();});document.querySelectorAll('[data-part]').forEach(e=>e.onchange=()=>{const i=Number(e.dataset.part);state.parts[i]=e.value;state.checks[i]=false;state.saved=false;state.aMax=2;invalidate();render();});document.querySelectorAll('[data-meta]').forEach(e=>e.oninput=()=>{state.meta[e.dataset.meta]=e.value;});document.querySelectorAll('[data-score]').forEach(e=>e.onchange=()=>{state.scores[Number(e.dataset.score)]=e.value;state.reviewed=false;state.written=false;state.bMax=4;render();});if($('revision'))$('revision').oninput=e=>{state.revision=e.target.value;state.reviewed=false;state.written=false;state.bMax=4;syncGate();};if($('reason'))$('reason').oninput=e=>{state.reason=e.target.value;state.reviewed=false;state.written=false;state.bMax=4;syncGate();};on('extract',()=>{state.extracted=true;render();});on('save-case',()=>{if(!state.checks.every(Boolean)||Object.values(state.meta).some(v=>!v.trim()))return toast('请确认所有字段，并补全元数据。');if(state.meta.category!=='维修备件')return toast('本模拟访谈的品类应保留为“维修备件”。');const old=cases.find(c=>c.id==='C07');const c=makeCase('C07','维修备件：高频目录与长尾授权',state.meta.category,state.meta.scene,state.meta.scale,state.meta.condition,[...state.parts],'先分层，再明确授权与事后补录；特种设备需资质核验。','授权额度、应急审批路径与目录维护责任待确认。');if(old)c.feedback=old.feedback;cases=cases.filter(c=>c.id!=='C07');cases.push(c);state.saved=true;invalidate();render();toast('C07 已写入本轮示例案例库');});on('sample-review',()=>{state.revision='补充例外场景的确认责任人；在正式交付前完成适用条件复核。';state.reason='案例条件不能替代当前需求核实，未决项需要明确负责人。';state.reviewed=false;state.written=false;state.bMax=4;render();});on('review',()=>{if(!state.scores.every(v=>v==='1')){state.reviewed=false;render();return toast('尚未准入：请处理不符合项并完成全部评分。');}if(!state.reason.trim()||!state.revision.trim())return toast('请记录专家修改内容与原因。');state.reviewed=true;render();toast('本轮示例审核通过');});on('writeback',()=>{if(!state.reviewed||state.written)return;retrieved().forEach(c=>c.feedback.push({revision:state.revision,reason:state.reason,scope:`${state.req.scope}；${state.req.condition}`}));state.written=true;render();toast('修改原因已追加到引用案例');});document.querySelectorAll('[data-jump-a]').forEach(b=>b.onclick=()=>{state.flow='a';render();});}
function syncGate(){ $('next').disabled=!gate();$('gate').textContent='修改后请重新提交审核';document.querySelectorAll('[data-step]').forEach(b=>{b.disabled=Number(b.dataset.step)>state.bMax;});}
function on(id,fn){if($(id))$(id).onclick=fn;}
// Playback uses the same gated controls as manual operation.
let playing = false, demoTimer = null, demoStarted = false, demoFinished = false;
let lastStage = '', stageAnimation;
function animateStage(){
  const key = `${state.flow}:${state[state.flow] ?? 0}`;
  if(key === lastStage) return;
  const hadStage = Boolean(lastStage);
  lastStage = key;
  stageAnimation?.cancel();
  if(!matchMedia('(prefers-reduced-motion: reduce)').matches){
    stageAnimation = $('stage').animate([{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],{duration:240,easing:'ease-out'});
  }
  if(hadStage){
    $('stage').scrollIntoView({block:'start',behavior:'instant'});
    const heading = $('stage').querySelector('h2');
    heading.tabIndex = -1;
    heading.focus({preventScroll:true});
  }
}
function playbackStatus(message){
  $('autoplay').textContent = playing ? 'Ⅱ 暂停播放' : demoFinished ? '↻ 重新播放' : demoStarted ? '▶ 继续播放' : '▶ 演示模式 / 自动播放';
  $('autoplay').setAttribute('aria-pressed',String(playing));
  $('demo-status').textContent = message;
}
function pauseDemo(message='已暂停，可手动操作；继续播放将从当前步骤推进。'){
  clearTimeout(demoTimer); playing=false;
  playbackStatus(message);
}
function scheduleDemo(){if(playing) demoTimer=setTimeout(playTick,6000);}
function choose(selector,value){
  const el=document.querySelector(selector);
  if(el){el.value=value;el.dispatchEvent(new Event('change',{bubbles:true}));}
}
function playTick(){
  if(!playing)return;
  const f=state.flow,n=state[f];
  if(f==='library'){
    const card=[...document.querySelectorAll('.case-card')].find(c=>c.textContent.includes('C07'));
    if(card){card.querySelector('details').open=true;card.scrollIntoView({block:'start',behavior:'instant'});}
    demoFinished=true;pauseDemo('演示结束 · C07 已展开，可查看本轮专家修改记录。');return;
  }
  if(f==='a'){
    if(n===1&&!state.extracted) $('extract').click();
    else if(n===2&&!state.checks.every(Boolean)){
      document.querySelector('details').open=true;
      document.querySelectorAll('[data-check]').forEach(el=>{el.checked=true;el.dispatchEvent(new Event('change',{bubbles:true}));});
      playbackStatus('自动播放 · 代演顾问逐条确认；实际使用仍需人工校对。');
    }else if(n===3&&!state.saved) $('save-case').click();
    else {
      $('next').click();
      if(state.flow==='b'&&state.b===0) document.querySelector('[data-preset="2"]').click();
    }
  }else if(n===1&&missing()){
    const field=missing()[0];
    choose(`[data-req="${field}"]`,{category:'维修备件',scope:'跨区域多门店',goal:'规范备件采购并保留应急能力',condition:'普通备件，排除特种设备'}[field]);
  }else if(n===2&&!retrieved().length){pauseDemo('未找到适用案例，已暂停。请核实需求或完成经验入库。');return;
  }else if(n===2&&!document.querySelector('.case-card details').open){
    document.querySelector('.case-card details').open=true;
  }else if(n===4&&!state.reviewed){
    for(let i=0;i<3;i++) choose(`[data-score="${i}"]`,'1');
    $('sample-review').click();$('review').click();
    playbackStatus('自动播放 · 代演示例评分与审核，不代表真实专家结论。');
  }else if(n===5&&!state.written) $('writeback').click();
  else if(gate()) $('next').click();
  else {pauseDemo('本步骤条件尚未满足，请完成后继续播放。');return;}
  scheduleDemo();
}
$('autoplay').onclick=()=>{
  if(playing){pauseDemo();return;}
  if(!demoStarted||demoFinished){reset();demoStarted=true;demoFinished=false;}
  playing=true;playbackStatus('自动播放中 · 每 6 秒推进一步或一个操作；校对与审核均为代演。');scheduleDemo();
};
// Trusted user edits pause the timer; scripted demonstration actions do not.
for(const event of ['click','input','change']) document.addEventListener(event,e=>{
  if(playing&&e.isTrusted&&!e.target.closest('#autoplay')) pauseDemo();
},true);
document.addEventListener('keydown',e=>{
  if(!['ArrowLeft','ArrowRight'].includes(e.key)||e.altKey||e.ctrlKey||e.metaKey||e.shiftKey||e.target.closest('input,textarea,select,[contenteditable]'))return;
  e.preventDefault();if(playing)pauseDemo();
  const button=$(e.key==='ArrowLeft'?'prev':'next');
  if(state.flow==='library'&&e.key==='ArrowRight')return;
  if(!button.disabled)button.click();
});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&playing)pauseDemo('页面已隐藏，播放已暂停。');});
document.querySelectorAll('[data-flow]').forEach(b=>b.onclick=()=>{state.flow=b.dataset.flow;render();});$('prev').onclick=()=>{if(state.flow==='library'){state.flow='b';state.b=state.bMax;}else if(state[state.flow]>0){state[state.flow]--;}else if(state.flow==='b'){state.flow='a';state.a=state.aMax;}render();};$('next').onclick=()=>{if(state.flow==='library'||!gate())return;const f=state.flow;if(state[f]===titles[f].length-1){state.flow=f==='a'?'b':'library';}else{state[f]++;state[f+'Max']=Math.max(state[f+'Max'],state[f]);}render();};$('reset').onclick=()=>{pauseDemo('已重置，自动播放将从头开始。');demoStarted=false;demoFinished=false;playbackStatus('已重置，自动播放将从头开始。');reset();toast('已恢复初始示例；本轮编辑与回写已清空');};reset();
