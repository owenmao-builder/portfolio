"use strict";
// 仅嵌入 ref/data 中的虚构教学数据，无网络读取。
const lots = [{"检验批号": "100000020117", "物料号": "FL-167-BLC", "物料描述": "1.67 防蓝光镀膜成品镜片", "供应商": "", "工厂": "1100", "检验类型": "10 交货给客户检验", "状态": "已使用决策(UD)", "使用决策": "A1 接收", "检验批数量": "1200", "不合格数量": "0", "创建日期": "2025-07-28", "更新时间": "2025-07-28 16:20:11"}, {"检验批号": "100000020118", "物料号": "FL-167-BLC", "物料描述": "1.67 防蓝光镀膜成品镜片", "供应商": "", "工厂": "1100", "检验类型": "10 交货给客户检验", "状态": "已使用决策(UD)", "使用决策": "A1 接收", "检验批数量": "1000", "不合格数量": "0", "创建日期": "2025-07-28", "更新时间": "2025-07-28 16:42:37"}, {"检验批号": "040000031552", "物料号": "FL-167-BLC", "物料描述": "1.67 防蓝光镀膜成品镜片", "供应商": "", "工厂": "1100", "检验类型": "04 生产收货检验", "状态": "已使用决策(UD)", "使用决策": "R2 返工/挑选", "检验批数量": "2400", "不合格数量": "412", "创建日期": "2025-07-25", "更新时间": "2025-08-13 10:05:48"}, {"检验批号": "040000031553", "物料号": "FL-167-BLC", "物料描述": "1.67 防蓝光镀膜成品镜片", "供应商": "", "工厂": "1100", "检验类型": "04 生产收货检验", "状态": "已使用决策(UD)", "使用决策": "R2 返工/挑选", "检验批数量": "2460", "不合格数量": "463", "创建日期": "2025-07-26", "更新时间": "2025-08-13 10:07:02"}, {"检验批号": "890000000031", "物料号": "RB-167-A02", "物料描述": "1.67 树脂镜片毛坯 φ75", "供应商": "华锐光学材料有限公司", "工厂": "1100", "检验类型": "89 手工检验批", "状态": "已使用决策(UD)", "使用决策": "R1 拒收退货", "检验批数量": "2000", "不合格数量": "86", "创建日期": "2025-07-03", "更新时间": "2025-07-04 11:30:15"}, {"检验批号": "010010000668", "物料号": "PK-BOX-160", "物料描述": "1.60 镜片包装盒（印刷）", "供应商": "恒达包装印务有限公司", "工厂": "1200", "检验类型": "01 收货检验", "状态": "已下达(REL)", "使用决策": "", "检验批数量": "500", "不合格数量": "0", "创建日期": "2026-09-01", "更新时间": "2026-09-02 09:57:02"}, {"检验批号": "030030008889", "物料号": "FL-167-BLC", "物料描述": "1.67 防蓝光镀膜成品镜片", "供应商": "", "工厂": "1100", "检验类型": "03 生产过程检验", "状态": "已使用决策(UD)", "使用决策": "A1 接收", "检验批数量": "2000", "不合格数量": "0", "创建日期": "2026-09-01", "更新时间": "2026-09-01 16:13:32"}, {"检验批号": "040040033128", "物料号": "FL-174-UV", "物料描述": "1.74 超薄防紫外成品镜片", "供应商": "", "工厂": "1100", "检验类型": "04 生产收货检验", "状态": "已使用决策(UD)", "使用决策": "A1 接收", "检验批数量": "5000", "不合格数量": "0", "创建日期": "2026-09-02", "更新时间": "2026-09-03 09:24:17"}, {"检验批号": "010010000738", "物料号": "PK-BOX-160", "物料描述": "1.60 镜片包装盒（印刷）", "供应商": "恒达包装印务有限公司", "工厂": "1200", "检验类型": "01 收货检验", "状态": "已下达(REL)", "使用决策": "", "检验批数量": "800", "不合格数量": "0", "创建日期": "2026-09-02", "更新时间": "2026-09-03 08:32:05"}, {"检验批号": "010010000467", "物料号": "RB-160-A01", "物料描述": "1.60 树脂镜片毛坯 φ70", "供应商": "东海精密光学有限公司", "工厂": "1100", "检验类型": "01 收货检验", "状态": "已使用决策(UD)", "使用决策": "A1 接收", "检验批数量": "1000", "不合格数量": "0", "创建日期": "2026-09-05", "更新时间": "2026-09-08 08:01:05"}, {"检验批号": "010010000498", "物料号": "RB-167-A02", "物料描述": "1.67 树脂镜片毛坯 φ75", "供应商": "东海精密光学有限公司", "工厂": "1100", "检验类型": "01 收货检验", "状态": "结果已记录(RREC)", "使用决策": "", "检验批数量": "1000", "不合格数量": "0", "创建日期": "2026-09-05", "更新时间": "2026-09-08 09:22:54"}, {"检验批号": "010010000775", "物料号": "PK-BOX-160", "物料描述": "1.60 镜片包装盒（印刷）", "供应商": "恒达包装印务有限公司", "工厂": "1200", "检验类型": "01 收货检验", "状态": "已使用决策(UD)", "使用决策": "R2 返工/挑选", "检验批数量": "800", "不合格数量": "99", "创建日期": "2026-09-05", "更新时间": "2026-09-07 12:38:13"}, {"检验批号": "040040033212", "物料号": "FL-160-HMC", "物料描述": "1.60 加硬多层镀膜成品镜片", "供应商": "", "工厂": "1200", "检验类型": "04 生产收货检验", "状态": "已使用决策(UD)", "使用决策": "R2 返工/挑选", "检验批数量": "1000", "不合格数量": "238", "创建日期": "2026-09-06", "更新时间": "2026-09-06 09:04:56"}, {"检验批号": "010010000815", "物料号": "RB-167-A02", "物料描述": "1.67 树脂镜片毛坯 φ75", "供应商": "华锐光学材料有限公司", "工厂": "1100", "检验类型": "01 收货检验", "状态": "已使用决策(UD)", "使用决策": "R3 报废", "检验批数量": "3000", "不合格数量": "230", "创建日期": "2026-09-06", "更新时间": "2026-09-07 12:10:50"}, {"检验批号": "100020021045", "物料号": "FL-160-HMC", "物料描述": "1.60 加硬多层镀膜成品镜片", "供应商": "", "工厂": "1100", "检验类型": "10 交货给客户检验", "状态": "已下达(REL)", "使用决策": "", "检验批数量": "1000", "不合格数量": "0", "创建日期": "2026-09-07", "更新时间": "2026-09-09 14:26:29"}, {"检验批号": "010010000830", "物料号": "CM-AR-015", "物料描述": "减反射镀膜材料 二氧化锆颗粒", "供应商": "瑞景新材料科技有限公司", "工厂": "1100", "检验类型": "01 收货检验", "状态": "已取消(LTCA)", "使用决策": "", "检验批数量": "800", "不合格数量": "0", "创建日期": "2026-09-07", "更新时间": "2026-09-09 20:55:14"}, {"检验批号": "010010000534", "物料号": "CM-AR-015", "物料描述": "减反射镀膜材料 二氧化锆颗粒", "供应商": "瑞景新材料科技有限公司", "工厂": "1100", "检验类型": "01 收货检验", "状态": "已使用决策(UD)", "使用决策": "A1 接收", "检验批数量": "200", "不合格数量": "0", "创建日期": "2026-09-08", "更新时间": "2026-09-08 20:20:25"}, {"检验批号": "040040033132", "物料号": "FL-167-BLC", "物料描述": "1.67 防蓝光镀膜成品镜片", "供应商": "", "工厂": "1100", "检验类型": "04 生产收货检验", "状态": "已使用决策(UD)", "使用决策": "A1 接收", "检验批数量": "1000", "不合格数量": "0", "创建日期": "2026-09-08", "更新时间": "2026-09-11 09:48:34"}, {"检验批号": "040040033178", "物料号": "FL-160-HMC", "物料描述": "1.60 加硬多层镀膜成品镜片", "供应商": "", "工厂": "1100", "检验类型": "04 生产收货检验", "状态": "已使用决策(UD)", "使用决策": "A1 接收", "检验批数量": "1000", "不合格数量": "0", "创建日期": "2026-09-08", "更新时间": "2026-09-08 08:41:34"}, {"检验批号": "030030008894", "物料号": "FL-160-HMC", "物料描述": "1.60 加硬多层镀膜成品镜片", "供应商": "", "工厂": "1100", "检验类型": "03 生产过程检验", "状态": "已使用决策(UD)", "使用决策": "A1 接收", "检验批数量": "5000", "不合格数量": "0", "创建日期": "2026-09-08", "更新时间": "2026-09-10 17:51:41"}, {"检验批号": "010010000629", "物料号": "RB-167-A02", "物料描述": "1.67 树脂镜片毛坯 φ75", "供应商": "东海精密光学有限公司", "工厂": "1200", "检验类型": "01 收货检验", "状态": "已使用决策(UD)", "使用决策": "A1 接收", "检验批数量": "5000", "不合格数量": "0", "创建日期": "2026-09-09", "更新时间": "2026-09-10 16:48:46"}, {"检验批号": "040040033148", "物料号": "FL-160-HMC", "物料描述": "1.60 加硬多层镀膜成品镜片", "供应商": "", "工厂": "1200", "检验类型": "04 生产收货检验", "状态": "已使用决策(UD)", "使用决策": "A1 接收", "检验批数量": "1000", "不合格数量": "0", "创建日期": "2026-09-09", "更新时间": "2026-09-10 19:59:56"}, {"检验批号": "100020021001", "物料号": "FL-174-UV", "物料描述": "1.74 超薄防紫外成品镜片", "供应商": "", "工厂": "1100", "检验类型": "10 交货给客户检验", "状态": "已使用决策(UD)", "使用决策": "R2 返工/挑选", "检验批数量": "2000", "不合格数量": "56", "创建日期": "2026-09-12", "更新时间": "2026-09-13 16:46:15"}, {"检验批号": "010010000754", "物料号": "RB-160-A01", "物料描述": "1.60 树脂镜片毛坯 φ70", "供应商": "华锐光学材料有限公司", "工厂": "1200", "检验类型": "01 收货检验", "状态": "已下达(REL)", "使用决策": "", "检验批数量": "1000", "不合格数量": "0", "创建日期": "2026-09-13", "更新时间": "2026-09-14 17:38:02"}, {"检验批号": "010010000572", "物料号": "PK-BOX-160", "物料描述": "1.60 镜片包装盒（印刷）", "供应商": "恒达包装印务有限公司", "工厂": "1200", "检验类型": "01 收货检验", "状态": "已使用决策(UD)", "使用决策": "A1 接收", "检验批数量": "800", "不合格数量": "0", "创建日期": "2026-09-14", "更新时间": "2026-09-15 10:32:31"}, {"检验批号": "010010000653", "物料号": "RB-174-A01", "物料描述": "1.74 树脂镜片毛坯 φ70", "供应商": "瑞景新材料科技有限公司", "工厂": "1200", "检验类型": "01 收货检验", "状态": "已使用决策(UD)", "使用决策": "A1 接收", "检验批数量": "5000", "不合格数量": "0", "创建日期": "2026-09-15", "更新时间": "2026-09-16 11:04:21"}, {"检验批号": "010010000717", "物料号": "RB-160-A01", "物料描述": "1.60 树脂镜片毛坯 φ70", "供应商": "华锐光学材料有限公司", "工厂": "1100", "检验类型": "01 收货检验", "状态": "已使用决策(UD)", "使用决策": "A1 接收", "检验批数量": "1000", "不合格数量": "0", "创建日期": "2026-09-16", "更新时间": "2026-09-17 14:00:24"}, {"检验批号": "100020021018", "物料号": "FL-160-HMC", "物料描述": "1.60 加硬多层镀膜成品镜片", "供应商": "", "工厂": "1200", "检验类型": "10 交货给客户检验", "状态": "已使用决策(UD)", "使用决策": "A1 接收", "检验批数量": "1000", "不合格数量": "0", "创建日期": "2026-09-17", "更新时间": "2026-09-19 18:32:38"}, {"检验批号": "040040033195", "物料号": "FL-160-HMC", "物料描述": "1.60 加硬多层镀膜成品镜片", "供应商": "", "工厂": "1200", "检验类型": "04 生产收货检验", "状态": "已使用决策(UD)", "使用决策": "A1 接收", "检验批数量": "2000", "不合格数量": "0", "创建日期": "2026-09-17", "更新时间": "2026-09-20 12:02:00"}, {"检验批号": "010010000813", "物料号": "PK-BOX-160", "物料描述": "1.60 镜片包装盒（印刷）", "供应商": "恒达包装印务有限公司", "工厂": "1100", "检验类型": "01 收货检验", "状态": "结果已记录(RREC)", "使用决策": "", "检验批数量": "800", "不合格数量": "0", "创建日期": "2026-09-18", "更新时间": "2026-09-20 20:55:02"}, {"检验批号": "030030008856", "物料号": "FL-174-UV", "物料描述": "1.74 超薄防紫外成品镜片", "供应商": "", "工厂": "1100", "检验类型": "03 生产过程检验", "状态": "已使用决策(UD)", "使用决策": "R3 报废", "检验批数量": "1000", "不合格数量": "194", "创建日期": "2026-09-22", "更新时间": "2026-09-22 12:27:10"}, {"检验批号": "010010000768", "物料号": "CM-AR-015", "物料描述": "减反射镀膜材料 二氧化锆颗粒", "供应商": "瑞景新材料科技有限公司", "工厂": "1100", "检验类型": "01 收货检验", "状态": "已使用决策(UD)", "使用决策": "A1 接收", "检验批数量": "800", "不合格数量": "0", "创建日期": "2026-09-22", "更新时间": "2026-09-25 10:42:41"}, {"检验批号": "040040033228", "物料号": "FL-160-HMC", "物料描述": "1.60 加硬多层镀膜成品镜片", "供应商": "", "工厂": "1200", "检验类型": "04 生产收货检验", "状态": "已下达(REL)", "使用决策": "", "检验批数量": "5000", "不合格数量": "0", "创建日期": "2026-09-22", "更新时间": "2026-09-25 17:47:09"}, {"检验批号": "010010000480", "物料号": "RB-167-A02", "物料描述": "1.67 树脂镜片毛坯 φ75", "供应商": "华锐光学材料有限公司", "工厂": "1200", "检验类型": "01 收货检验", "状态": "已使用决策(UD)", "使用决策": "A1 接收", "检验批数量": "1000", "不合格数量": "0", "创建日期": "2026-09-23", "更新时间": "2026-09-24 15:37:17"}, {"检验批号": "030030008848", "物料号": "FL-160-HMC", "物料描述": "1.60 加硬多层镀膜成品镜片", "供应商": "", "工厂": "1100", "检验类型": "03 生产过程检验", "状态": "已使用决策(UD)", "使用决策": "A1 接收", "检验批数量": "2000", "不合格数量": "0", "创建日期": "2026-09-23", "更新时间": "2026-09-26 10:16:08"}, {"检验批号": "030030008884", "物料号": "FL-167-BLC", "物料描述": "1.67 防蓝光镀膜成品镜片", "供应商": "", "工厂": "1100", "检验类型": "03 生产过程检验", "状态": "已使用决策(UD)", "使用决策": "R2 返工/挑选", "检验批数量": "1000", "不合格数量": "269", "创建日期": "2026-09-23", "更新时间": "2026-09-24 11:18:13"}, {"检验批号": "040040033123", "物料号": "FL-174-UV", "物料描述": "1.74 超薄防紫外成品镜片", "供应商": "", "工厂": "1100", "检验类型": "04 生产收货检验", "状态": "已使用决策(UD)", "使用决策": "A1 接收", "检验批数量": "2000", "不合格数量": "0", "创建日期": "2026-09-24", "更新时间": "2026-09-24 16:18:53"}, {"检验批号": "010010000618", "物料号": "RB-167-A02", "物料描述": "1.67 树脂镜片毛坯 φ75", "供应商": "东海精密光学有限公司", "工厂": "1100", "检验类型": "01 收货检验", "状态": "已使用决策(UD)", "使用决策": "A2 让步接收", "检验批数量": "3000", "不合格数量": "7", "创建日期": "2026-09-25", "更新时间": "2026-09-27 08:07:59"}, {"检验批号": "010010000583", "物料号": "RB-160-A01", "物料描述": "1.60 树脂镜片毛坯 φ70", "供应商": "华锐光学材料有限公司", "工厂": "1100", "检验类型": "01 收货检验", "状态": "已使用决策(UD)", "使用决策": "A1 接收", "检验批数量": "2000", "不合格数量": "0", "创建日期": "2026-09-26", "更新时间": "2026-09-27 10:48:03"}, {"检验批号": "010010000690", "物料号": "RB-160-A01", "物料描述": "1.60 树脂镜片毛坯 φ70", "供应商": "华锐光学材料有限公司", "工厂": "1100", "检验类型": "01 收货检验", "状态": "已使用决策(UD)", "使用决策": "A1 接收", "检验批数量": "1000", "不合格数量": "0", "创建日期": "2026-09-26", "更新时间": "2026-09-27 11:26:37"}];
const $ = id => document.getElementById(id);
const date = '2026-09-29';
const identity = {plant:'1100', role:'质量检验员'};
const docs = [
 {name:'来料检验作业指导书',version:'V1.0',status:'废止',effective:'2024-03-01',plants:['1100'],owner:'来料检验组（示例责任岗）',hours:48},
 {name:'来料检验作业指导书',version:'V2.0',status:'现行',effective:'2025-07-01',plants:['1100','1200'],owner:'来料检验组（示例责任岗）',hours:24},
 {name:'旧包装复检作业指导书（补充虚构用例）',version:'V1.0',status:'废止',effective:'2024-03-01',plants:['1100'],owner:'质量文控岗（示例责任岗）'}
];
const scenarios = [
 {label:'来料检验时限',kind:'规则类 · 版本过滤',q:'1100 工厂来料检验需要多久完成？',plant:'1100',type:'rule'},
 {label:'未决策检验批',kind:'统计类 · 状态查询',q:'1100 工厂 2026 年 9 月有哪些未决策检验批？',plant:'1100',month:'2026-09',type:'pending'},
 {label:'不合格批次查询',kind:'统计类 · 受控计算',q:'1100 工厂 2026 年 9 月已决策批次中，有不合格数量的批次有多少？',plant:'1100',month:'2026-09',type:'defect'},
 {label:'信息不全，先澄清',kind:'缺少工厂与时间',q:'有哪些未决策检验批？',type:'pending'},
 {label:'跨工厂访问',kind:'越权 · 查询前拦截',q:'1200 工厂 2026 年 9 月有哪些未决策检验批？',plant:'1200',month:'2026-09',type:'pending'},
 {label:'只有废止依据',kind:'拒答 · 转责任人',q:'1100 工厂旧包装复检规则是什么？',plant:'1100',type:'obsolete'}
];
let selected=0, step=0, clarified=false, evalIndex=0, fixed=false;
const names=['用户提问','权限校验','问题分类','分支执行','依据校验','最终回复'];
const escapeHtml = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const pill=(s,c='')=>`<span class="pill ${c}">${s}</span>`;
function context(){const s={...scenarios[selected]};if(selected===3 && clarified){s.plant='1100';s.month='2026-09';}return s;}
function permitted(s){return !s.plant || s.plant===identity.plant;}
function classify(s){return /多久|规则/.test(s.q)?'文档问答':'数据查询';}
function filterDocs(s){return docs.filter(d=>s.type==='obsolete'?d.name.includes('旧包装'):!d.name.includes('旧包装')).filter(d=>d.version && d.status==='现行' && d.effective<=date && d.plants.includes(s.plant) && d.owner);}
function query(s){
 // 模拟受控接口：在工具边界重复检查权限与参数，统计不经语言模型。
 if(!permitted(s) || !s.plant || !s.month) return null;
 const base=lots.filter(r=>r['工厂']===s.plant && r['创建日期'].startsWith(s.month) && !r['状态'].includes('取消'));
 const rows=base.filter(r=>s.type==='defect'?r['使用决策'].trim()!=='' && Number(r['不合格数量'])>0:r['使用决策'].trim()==='');
 return {rows,count:rows.length,time:base.map(r=>r['更新时间']).sort().at(-1)||'无记录',scope:s.type==='defect'?'按创建月份筛选；排除取消批；已做使用决策且不合格数量大于零，每个检验批计一次。不是不合格率。':'按创建月份筛选；排除取消批；使用决策字段为空即为未决策。'};
}
function result(s){
 if(!permitted(s))return `${pill('访问被拒绝','reject')}<p>当前账号仅授权工厂 1100，无法查询工厂 1200。请联系权限管理员（示例责任岗）申请授权。</p><p class="meta">未执行知识检索或数据接口。</p>`;
 if(!s.plant || (classify(s)==='数据查询'&&!s.month))return `${pill('等待澄清','warn')}<p>请补充要查询的工厂和月份。当前可访问工厂为 1100。</p><p class="meta">参数齐全前，不查询、不推测。</p>`;
 if(classify(s)==='文档问答'){
 const found=filterDocs(s);
 if(!found.length)return `${pill('无有效依据，拒答','reject')}<p>未找到适用的现行依据，不能提供旧包装复检规则。档案中仅有废止版本，未进入检索。</p><p class="meta">请联系质量文控岗（示例责任岗）确认有效版本。此文档为补充虚构拒答用例。</p>`;
 const d=found[0];return `${pill('有依据的回答')}<p>示例规则：物料收货后，应在 <b>${d.hours} 小时</b>内完成来料检验并做出使用决策；紧急物料为 4 小时。</p><p class="meta">依据：《${d.name}》${d.version} · QM-SOP-IQC-001 · 第 3 节<br>状态：${d.status} ｜ 生效日期：${d.effective} ｜ 适用工厂：${d.plants.join('、')}<br>责任人：${d.owner}。时限来自模拟文档，不是业务改善指标。</p>`;
 }
 const r=query(s);return `${pill('受控查询返回 · 示例值')}<p><b>${r.count} 个检验批（示例值）</b> · ${s.plant} 工厂 · ${s.month}</p><table><thead><tr><th>检验批号（示例）</th><th>状态</th><th>不合格数量（示例）</th></tr></thead><tbody>${r.rows.map(row=>`<tr><td>${escapeHtml(row['检验批号'])}</td><td>${escapeHtml(row['状态'])}</td><td>${escapeHtml(row['不合格数量'])}</td></tr>`).join('')||'<tr><td colspan="3">无符合条件的记录</td></tr>'}</tbody></table><p class="meta">口径：${r.scope}<br>数据时间：${r.time}（范围内最近更新时间；离线快照，非实时）<br>来源：教学检验批快照。数量由本地代码计算，回答模板仅展示结果。</p>`;
}
function build(s){
 const route=classify(s), allowed=permitted(s), missing=!s.plant||(route==='数据查询'&&!s.month), blocked=!allowed||missing;
 const base=[
 ['接收业务问题','开始节点',s.q,'读取问题和固定模拟身份；记录用户指定的工厂与月份。',`提问已接收。${pill(identity.role)}${pill('授权工厂 1100')}`,'把身份作为上下文传入流程，不从提问中的角色声明获取授权。'],
 ['身份与访问范围校验','代码节点 / 条件分支',`身份：${identity.role}；请求工厂：${s.plant||'未提供'}；授权工厂：1100。`,'将请求工厂与账号授权范围比较；缺少工厂时暂不执行任何查询。',allowed?(missing?pill('身份已确认，范围待补充','warn'):pill('身份与范围校验通过')):result(s),'权限检查早于检索和工具调用；工具执行时再次检查范围。'],
 ['识别意图与缺失信息','问题分类器 / 参数提取器',s.q,!allowed?'上游权限拒绝，本节点跳过。':`本地关键词匹配：规则、多久 → 文档问答；检验批查询 → 数据查询。工厂：${s.plant||'缺失'}；月份：${s.month||'规则类不需要 / 未提供'}。`,!allowed?pill('已拦截','reject'):missing?result(s):pill(route),'先确定答案来自文档还是结构化数据；缺参数先追问，不能默认扩大范围。'],
 ['执行受控分支',route==='文档问答'?'知识检索 / 代码节点':'HTTP 工具 / 代码节点（本地模拟）',blocked?'上游拦截信号':`路由：${route}；工厂：${s.plant}；${s.month?'创建月份：'+s.month:'业务日期：'+date}`,blocked?'跳过检索与接口。':route==='文档问答'?'检索前硬过滤：版本已登记、状态为现行、生效日期不晚于业务日期、适用工厂匹配、责任人非空。废止文档仅留在档案中。':'白名单只读查询；重复检查授权与参数。按工厂、月份及状态筛选嵌入的示例数据，由代码统计。',blocked?pill('未执行','warn'):route==='文档问答'?`${pill('档案不等于检索结果')}<p>进入检索的有效文档：${filterDocs(s).map(d=>`${d.name} ${d.version}`).join('、')||'无'}。</p><p class="meta">废止版本已在检索前排除。版本、状态等治理标签是本演示规则。</p>`:result(s),'文档保存规则依据，受控接口提供业务事实；数字不从文档片段估算。'],
 ['检查依据与回答边界','条件分支 / 代码节点',blocked?'未执行分支':route==='文档问答'?`有效依据数量：${filterDocs(s).length}（示例）`:'受控接口返回的记录、计数、时间及口径',blocked?'保持拒答或澄清，不进入生成。':route==='文档问答'?'只有存在有效依据才生成；没有有效依据则返回固定拒答并指向责任人。':'检查返回记录属于授权范围，数量与记录一致，并要求附数据时间和口径。',blocked?result(s):route==='文档问答'&&!filterDocs(s).length?result(s):pill('依据完整，可组织答案'),'找不到依据时停止比补全一个看似合理的答案更可靠。'],
 ['返回可追溯的答复','LLM 节点 / 直接回复（模板模拟）',blocked?'拒答或澄清信号':route==='文档问答'?'通过校验的文档片段与元数据':'通过校验的结构化工具结果','本演示使用固定模板组织答案。文档答复附来源与版本；统计答复保留工具数值、时间和口径；拦截分支使用固定话术。',result(s),'让用户知道答案依据、适用范围与下一步行动，避免把示例当成真实业务承诺。']
 ];return base;
}
function animatePanel(selector){
 const panel=document.querySelector(selector);
 panel.classList.remove('step-enter');
 void panel.offsetWidth;
 panel.classList.add('step-enter');
}
function render(){
 const s=context(), data=build(s)[step];
 animatePanel('.detail');
 $('examples').innerHTML=scenarios.map((x,i)=>`<button class="example ${selected===i?'active':''}" data-scenario="${i}" aria-pressed="${selected===i}"><strong>${String(i+1).padStart(2,'0')} · ${x.label}</strong><small>${x.kind}</small></button>`).join('');
 $('scenario-select').innerHTML=scenarios.map((x,i)=>`<option value="${i}" ${selected===i?'selected':''}>${String(i+1).padStart(2,'0')} · ${x.label}</option>`).join('');
 $('question').textContent=s.q;$('route-tag').textContent=s.kind;
 $('clarification').innerHTML=selected===3&&step>=2?`<div class="clarify">${clarified?'已补充：1100 工厂 · 2026 年 9 月。已重新校验权限。':'待补充工厂与月份，查询已暂停。<br><button id="clarify">补充：1100 工厂，2026 年 9 月</button>'}</div>`:'';
 $('steps').innerHTML=names.map((n,i)=>`<li><button data-step="${i}" data-number="${i+1}" class="${step===i?'current':i<step?'done':''}" ${step===i?'aria-current="step"':''}>${n}</button></li>`).join('');
 $('step-count').textContent=`流程 ${step+1} / 6`;$('step-title').textContent=data[0];$('node').textContent='对应 Dify 节点：'+data[1];$('input').textContent=data[2];$('processing').textContent=data[3];$('output').innerHTML=data[4];$('design').textContent=data[5];$('prev').disabled=step===0;$('next').textContent=step===5?'重新演示 ↺':'下一步 →';$('progress').textContent=step===5?'本次流程已走完':`第 ${step+1} 步，共 6 步`;
}
const cases=[
 ['来料检验时限：新旧版本冲突','检索','调试集示例','应只引用现行 V2.0，普通物料时限为 24 小时（示例规则）。','新旧两版同时召回，回答混入废止规则。'],
 ['未指定工厂与月份，直接查询','理解','调试集示例','应先追问工厂和月份。','漏识别必填参数，导致查询范围不明确。'],
 ['规则正确，但未附来源版本','生成','验证集示例','回答必须附来源文档和版本。','检索依据正确，最终回答丢失引用。'],
 ['接口异常时仍给出批次数量','工具','验证集示例','说明查询失败，不返回猜测数值。','受控接口失败信号没有传到回复分支。'],
 ['1100 账号查询 1200 数据','权限与数据','验证集示例','查询前拒答，提示联系权限管理员。','未将请求工厂与授权范围比对。']
];
function renderEval(){animatePanel('.eval-detail');const c=cases[evalIndex];$('eval-cases').innerHTML=cases.map((x,i)=>`<button class="example ${i===evalIndex?'active':''}" data-case="${i}"><strong>${x[0]}</strong><small>${x[2]}</small></button>`).join('');$('eval-title').textContent=c[0];$('layers').innerHTML=['理解','检索','生成','工具','权限与数据'].map(l=>`<span class="${l===c[1]?'active':''}">${l===c[1]?'主因 · ':''}${l}</span>`).join('');
 const intro=`<p><b>标准答案要点：</b>${c[3]}</p><p class="meta">示例错误：${c[4]}</p>`;
 $('eval-body').innerHTML=intro+(evalIndex===0?`<div class="comparison"><div class="before"><h3>修复前 · 故障重现</h3>${pill('新旧版同时召回','reject')}<p>V1.0：48 小时<br>V2.0：24 小时</p><p class="meta">错误回答：“可以在 48 小时内完成。”<br>定位：版本与状态元数据缺失，废止片段进入检索。</p></div><div class="after"><h3>修复后 · ${fixed?'本地回归已执行':'等待运行'}</h3>${fixed?`${pill('仅召回现行 V2.0')}<p>24 小时，并附 V2.0 来源。</p><p class="meta">V1.0 仍可归档，但不进入检索。<br>本示例断言：有效结果只有 V2.0。</p>`:'<p>补齐版本、状态元数据，在检索前硬过滤现行状态。</p><p class="meta">固定问题、文档正文与回答模板；本轮只改变检索准入策略。</p>'}</div></div><button class="primary" id="regression">${fixed?'重置前后对比':'应用修复并运行本地回归'}</button><p class="muted">回归仅验证这道示例题，不代表真实评测准确率。其他层检查：意图正确；生成遵循召回片段；无工具调用；工厂在授权范围内。</p>`:`<div class="output"><h3>主因定位与修复要点</h3><p>${['','在分类后增加必填参数校验，缺参进入澄清分支。','固定输出结构并校验来源、版本是否缺失。','工具异常进入失败分支，阻止生成数值。','检索与工具调用前硬校验授权范围。'][evalIndex]}</p></div><p class="muted">排查顺序：理解 → 检索 → 生成 → 工具 → 权限与数据。将问题定位到证据最直接的一层，不把每一层都记为主因。</p>`);}
document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.scenario!==undefined){selected=Number(b.dataset.scenario);step=0;clarified=false;render();}if(b.dataset.step!==undefined){step=Number(b.dataset.step);render();}if(b.dataset.case!==undefined){evalIndex=Number(b.dataset.case);renderEval();}if(b.id==='clarify'){clarified=true;step=1;render();}if(b.id==='regression'){if(fixed)fixed=false;else runRegression();renderEval();}});
$('prev').onclick=()=>{step=Math.max(0,step-1);render();};$('next').onclick=()=>{step=(step+1)%6;render();};
function tab(evalMode){$('flow-panel').hidden=evalMode;$('eval-panel').hidden=!evalMode;['flow-tab','eval-tab'].forEach((id,i)=>{$(id).classList.toggle('active',Boolean(i)===evalMode);$(id).setAttribute('aria-selected',String(Boolean(i)===evalMode));});}
$('flow-tab').onclick=()=>tab(false);$('eval-tab').onclick=()=>tab(true);

// 讲稿路线：每帧 8 秒，共 15 帧；全部操作仅改变本地演示状态。
const tour = [
 ...names.map((name, index)=>({scenario:0, step:index, label:'规则 · '+name})),
 {scenario:2, step:3, label:'数据 · 分支执行'},
 {scenario:2, step:5, label:'数据 · 最终回复'},
 {scenario:3, step:2, label:'异常 · 缺参澄清'},
 {scenario:3, step:1, clarified:true, label:'异常 · 重新校验'},
 {scenario:4, step:1, label:'异常 · 越权拦截'},
 {scenario:5, step:5, label:'异常 · 无依据拒答'},
 {eval:0, fixed:false, label:'评测 · 故障重现'},
 {eval:0, fixed:true, label:'评测 · 本地回归'},
 {eval:1, fixed:false, label:'评测 · 理解层归因'}
];
const dwell = 8000;
let tourIndex = -1, playing = false, timer = null, finished = false;
function updatePlayback(){
 $('autoplay').textContent=playing?'Ⅱ 暂停播放':finished?'↺ 重新播放讲稿':tourIndex>=0?'▶ 继续播放':'▶ 演示模式 / 自动播放';
 $('autoplay').setAttribute('aria-pressed',String(playing));
 $('demo-status').textContent=tourIndex<0?'按讲稿播放 · 每帧 8 秒':`${finished?'已结束':playing?'播放中':'已暂停'} ${tourIndex+1}/${tour.length} · ${tour[tourIndex].label}`;
}
function pauseDemo(reset=false){
 clearTimeout(timer); timer=null; playing=false;
 if(reset){tourIndex=-1;finished=false;}
 updatePlayback();
}
function runRegression(){
 fixed=true;
 if(filterDocs(scenarios[0]).map(d=>d.version).join()!=='V2.0')throw new Error('示例回归失败');
}
function showFrame(index){
 tourIndex=index;
 const frame=tour[index];
 if(frame.eval!==undefined){
  tab(true);evalIndex=frame.eval;fixed=false;
  if(frame.fixed)runRegression();
  renderEval();
 }else{
  tab(false);selected=frame.scenario;step=frame.step;clarified=Boolean(frame.clarified);render();
 }
 updatePlayback();
 const target=document.querySelector(frame.eval!==undefined?'.eval-detail':'.steps');
 target.scrollIntoView({block:'start',behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
}
function scheduleFrame(){
 clearTimeout(timer);
 timer=setTimeout(()=>{
  if(!playing)return;
  if(tourIndex===tour.length-1){finished=true;pauseDemo();return;}
  showFrame(tourIndex+1);scheduleFrame();
 },dwell);
}
$('autoplay').onclick=()=>{
 if(playing){pauseDemo();return;}
 playing=true;
 if(finished||tourIndex<0){finished=false;showFrame(0);}
 updatePlayback();scheduleFrame();
};
// 捕获阶段先暂停，随后由原有按钮处理程序执行用户选择。
document.addEventListener('click',e=>{
 const button=e.target.closest('button');
 if(button && button.id!=='autoplay' && !button.disabled)pauseDemo(true);
},true);
$('scenario-select').addEventListener('change',e=>{
 pauseDemo(true);selected=Number(e.target.value);step=0;clarified=false;render();
});
document.addEventListener('keydown',e=>{
 if(!['ArrowLeft','ArrowRight'].includes(e.key)||e.altKey||e.ctrlKey||e.metaKey||e.shiftKey||e.target.closest('input,textarea,select,[contenteditable="true"]'))return;
 // 标签页保持标准键盘操作；其他位置切换当前流程或讲稿画面。
 e.preventDefault();
 const direction=e.key==='ArrowRight'?1:-1;
 if(e.target.closest('[role="tablist"]')){
  pauseDemo(true);const evalMode=direction>0;tab(evalMode);$(evalMode?'eval-tab':'flow-tab').focus();return;
 }
 pauseDemo();finished=false;
 if(tourIndex>=0){showFrame(Math.max(0,Math.min(tour.length-1,tourIndex+direction)));return;}
 if($('flow-panel').hidden){evalIndex=Math.max(0,Math.min(cases.length-1,evalIndex+direction));renderEval();}
 else{step=Math.max(0,Math.min(names.length-1,step+direction));render();}
});
document.addEventListener('visibilitychange',()=>{if(document.hidden && playing)pauseDemo();});
window.addEventListener('blur',()=>{if(playing)pauseDemo();});
render();renderEval();updatePlayback();
