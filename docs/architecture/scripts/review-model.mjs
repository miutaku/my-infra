const noise=new Set(['id','hash','_stage','sourcePath','inEdges','outEdges','relations']);
export function canonical(value){
 if(Array.isArray(value)) return value.map(canonical).sort((a,b)=>JSON.stringify(a).localeCompare(JSON.stringify(b)));
 if(value && typeof value==='object') return Object.fromEntries(Object.entries(value)
  .filter(([key])=>!noise.has(key)).sort(([a],[b])=>a.localeCompare(b)).map(([key,v])=>[key,canonical(v)]));
 return value;
}
function relations(model){
 const groups={};
 for(const relation of Object.values(model.relations ?? {})){
  const key=`${relation.source.model} → ${relation.target.model} [${relation.kind ?? ''}]`;
  (groups[key] ??= []).push(canonical(relation));
 }
 return Object.fromEntries(Object.entries(groups).map(([key,values])=>[key,canonical(values)]));
}
function delta(before,after){
 return [...new Set([...Object.keys(before),...Object.keys(after)])].sort().flatMap(id=>{
  const previous=before[id],next=after[id];
  if(JSON.stringify(canonical(previous))===JSON.stringify(canonical(next))) return [];
  return [{id,status:previous===undefined?'added':next===undefined?'removed':'changed',before:previous,after:next}];
 });
}
export function compareModels(before,after){
 return {
  elements:delta(before.elements ?? {},after.elements ?? {}),
  relations:delta(relations(before),relations(after)),
  views:delta(before.views ?? {},after.views ?? {}),
  specification:delta(before.specification ?? {},after.specification ?? {}),
 };
}
export function embedReport(html,data){
 return html.replace('/* REVIEW_DATA */null',JSON.stringify(data).replaceAll('<','\\u003c'));
}
