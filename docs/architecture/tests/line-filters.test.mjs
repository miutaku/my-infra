import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {whereOperatorAsPredicate} from '@likec4/core';

const kinds=['runtime','admin','deploy','secret','observe','query','backup'];
for(const env of ['my-infra']){
  const dir=`dist/diagram/assets`;
  const files=fs.readdirSync(dir);
  const source=fs.readFileSync(`${dir}/${files.find(n=>/^main-.*\.js$/.test(n))}`,'utf8');
  const data=fs.readFileSync(`${dir}/${files.find(n=>/^model-.*\.js$/.test(n))}`,'utf8');
  const model=vm.runInNewContext(`(${data.slice(data.indexOf('var n=t(')+8,data.lastIndexOf('),{updateModel:'))})`);
  // Execute the built viewer's native node/edge converter, not a reimplementation.
  const convert=source.match(/function (\w+)\(e\)\{let\{view:n\}=e,r=\[\],i=\[\],a=new Map,[\s\S]+?return\{xynodes:r,xyedges:i\}\}/);
  assert(convert,'Native converter signature changed');
  const sandbox={
    ey:{from:items=>({dequeue:()=>items.shift(),enqueue:item=>items.push(item)})},
    oy:(items,min)=>items.length>=min, R:'__view_group',
    ae:whereOperatorAsPredicate, GA:(obj,keys)=>Object.fromEntries(keys.map(k=>[k,obj[k]])),
    d:(value)=>{assert(value);return value}, u:assert,
    Iy:{Compound:1,Element:2,Edge:3}, sN:()=>'', cN:()=>'',
  };
  vm.runInNewContext(`${convert[0]};nativeConvert=${convert[1]}`,sandbox);
  const action=source.match(/(\w+)=\(\)=>([\w$]+)\.assign\(\(\{context:__context,event:(\w+)\}\)=>\{[\s\S]+?return \{\.\.\.__inputs,xyedges:[\s\S]+?:edge\)\}\}\)/);
  assert(action,'Patched input action missing');
  const body=action[0];
  const guard=body.match(/\{(\w+)\(\w+,`update.inputs`\)/)[1];
  const clean=body.match(/const __inputs=(\w+)\(/)[1];
  const renderer=body.match(/const __rendered=(\w+)\(/)[1];
  const context={
    [action[2]]:{assign:fn=>fn},[guard]:()=>{},[clean]:obj=>obj,
    [renderer]:inputs=>sandbox.nativeConvert(inputs),
  };
  const update=vm.runInNewContext(`${body};${action[1]}()`,context);
  let transitions=0;
  for(const view of Object.values(model.views)){
    const initial=sandbox.nativeConvert({view});
    let state={view,xynodes:initial.xynodes,xyedges:initial.xyedges,
      viewport:{x:30,y:40,zoom:1.25},dynamicViewVariant:'diagram',collapsedSequenceFlows:{}};
    const nodes=state.xynodes,viewport=state.viewport;
    // Iterate backwards and forwards so hiding AND restoring existing edges is covered.
    for(const mask of [...Array.from({length:1<<kinds.length},(_,i)=>i),...Array.from({length:1<<kinds.length},(_,i)=>(1<<kinds.length)-1-i)]){
      const hidden=kinds.filter((_,i)=>!(mask&(1<<i))).map(kind=>({kind:{neq:kind}}));
      const where=hidden.length?{and:hidden}:null;
      const result=update({context:state,event:{type:'update.inputs',inputs:{where}}});
      state={...state,...result};
      assert.equal(state.xynodes,nodes);assert.equal(state.viewport,viewport);
      for(const edge of state.xyedges){
        const original=view.edges.find(e=>e.id===edge.id);
        assert.equal(edge.hidden,where?!whereOperatorAsPredicate(where)(original):false);
        assert.equal(edge.data,initial.xyedges.find(e=>e.id===edge.id).data);
      }
      transitions++;
    }
  }
  console.log(`${env}: ${transitions} filter transitions passed; nodes, geometry and viewport preserved`);
}
