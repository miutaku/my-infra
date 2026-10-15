import {readFileSync,writeFileSync,readdirSync} from 'node:fs';
// Use the pinned viewer's native where predicate; keep nodes and layout intact.
export function adaptLineFilters(directory){
 let hooks=0, updates=0;
 for(const name of readdirSync(directory).filter(n=>n.endsWith('.js'))){
 const path=`${directory}/${name}`,source=readFileSync(path,'utf8');
 const pattern=/where:(\w+),reactFlowProps:\w+,renderNodes:\w+,minZoom:[^,]+,maxZoom:[^,]+,children:\w+\}\)\{let (\w+)=\w+\(\),\w+=\(0,(\w+)\.useRef\)\(null\)/g;
 let next=source.replace(pattern,(match,where,first,react)=>{
 hooks++;
 const boundary=match.indexOf('{let ')+1;
 const injection=`let [__lineFilters,__setLineFilters]=(0,${react}.useState)(()=>window.parent.myInfraLineFilters||{runtime:true,admin:true,deploy:true,secret:true,observe:true,query:true,backup:true});(0,${react}.useEffect)(()=>{const listener=e=>{if(e.source===window.parent&&e.origin===location.origin&&e.data?.type==='my-infra:line-filters')__setLineFilters(e.data.filters)};window.addEventListener('message',listener);return()=>window.removeEventListener('message',listener)},[]);const __hiddenKinds=Object.entries(__lineFilters).filter(([kind,enabled])=>!enabled).map(([kind])=>({kind:{neq:kind}}));${where}=__hiddenKinds.length?{and:__hiddenKinds}:${where};`;
 return match.slice(0,boundary)+injection+match.slice(boundary);
 });
 // Updating the where input alone does not refresh existing React Flow edges.
 // Patch that action to apply native filter visibility without changing node
 // positions, edge geometry, viewport, selection or other interaction state.
 const render=source.match(/function (\w+)\(\{dynamicViewVariant:\w+,\.\.\.\w+\}\)/)?.[1];
 const updatePattern=/(\w+)=\(\)=>([\w$]+)\.assign\(\(\{event:(\w+)\}\)=>\((\w+)\(\3,`update.inputs`\),(\w+)\(\{\.\.\.\3.inputs\}\)\)\)/g;
 next=next.replace(updatePattern,(match,name,state,event,assert,clean)=>{
  if(!render)throw new Error('LikeC4 native edge converter not found');
  updates++;
  return `${name}=()=>${state}.assign(({context:__context,event:${event}})=>{${assert}(${event},\`update.inputs\`);const __inputs=${clean}({...${event}.inputs});if(!Object.prototype.hasOwnProperty.call(${event}.inputs,'where'))return __inputs;const __rendered=${render}({view:__context.view,where:__inputs.where??null,currentViewId:__context.view.id,dynamicViewVariant:__context.dynamicViewVariant,collapsedSequenceFlows:__context.collapsedSequenceFlows});const __visibility=new Map(__rendered.xyedges.map(edge=>[edge.id,edge.hidden===true]));return {...__inputs,xyedges:__context.xyedges.map(edge=>__visibility.has(edge.id)&&edge.hidden!==__visibility.get(edge.id)?{...edge,hidden:__visibility.get(edge.id)}:edge)}})`;
 });
 if(next!==source)writeFileSync(path,next);
 }
 if(updates!==1)throw new Error(`LikeC4 line filter adapter expected 1 update action, found ${updates}`);
 if(hooks!==1)throw new Error(`LikeC4 line filter adapter expected 1 hook, found ${hooks}`);
}
