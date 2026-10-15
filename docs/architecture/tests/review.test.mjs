import {test} from 'node:test';
import assert from 'node:assert/strict';
import {compareModels,embedReport} from '../scripts/review-model.mjs';
const model=()=>({elements:{a:{id:'a',title:'App'}},relations:{x:{id:'x',source:{model:'a'},target:{model:'b'},kind:'traffic',title:'HTTPS'}},views:{main:{id:'main',hash:'computed',nodes:[{id:'a',modelRef:'a',inEdges:['x']}],edges:[]}},specification:{}});
test('ignores calculated IDs and hashes, preserves semantic relationship changes',()=>{
 const before=model(),after=model();
 after.views.main.hash='another';after.relations.x.id='another';after.views.main.nodes[0].inEdges=['another'];
 assert.deepEqual(compareModels(before,after),{elements:[],relations:[],views:[],specification:[]});
 after.relations.x.title='HTTP';
 const diff=compareModels(before,after);
 assert.equal(diff.relations.length,1);assert.equal(diff.relations[0].status,'changed');
});
test('reports added elements, removed views and changes to styling',()=>{
 const before=model(),after=model();after.elements.b={title:'DB'};delete after.views.main;after.elements.a.style={color:'red'};
 const diff=compareModels(before,after);
 assert.deepEqual(diff.elements.map(c=>[c.id,c.status]),[['a','changed'],['b','added']]);
 assert.equal(diff.views[0].status,'removed');
});
test('embedded report cannot terminate its script tag',()=>{
 const html=embedReport('<script>const data=/* REVIEW_DATA */null;</script>',{title:'</script><script>alert(1)</script>'});
 assert.equal((html.match(/<script>/g) ?? []).length,1);
 assert.ok(html.includes('\\u003c/script>'));
});
