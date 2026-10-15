import {readFileSync,writeFileSync,lstatSync} from 'node:fs';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

export const allowedPaths=new Set(["docs/architecture/logical.c4", "docs/architecture/views.c4", "docs/architecture/deployment.c4"]);

export function applyUpdate(root,result){
 if(!result || typeof result.summary!=='string' || result.summary.length>20000 ||
    !Array.isArray(result.updates) || result.updates.length>allowedPaths.size){
  throw new Error('Invalid architecture update result');
 }
 const seen=new Set();
 // Validate the entire result before writing any file.
 for(const update of result.updates){
  if(!update || !allowedPaths.has(update.path) || seen.has(update.path) ||
     typeof update.content!=='string' || !update.content.trim() ||
     Buffer.byteLength(update.content)>500000){
   throw new Error('Invalid or forbidden architecture update');
  }
  const path=resolve(root,update.path);
  if(!lstatSync(path).isFile() || lstatSync(path).isSymbolicLink()){
   throw new Error('Architecture update target must be a regular file');
  }
  if(update.path.endsWith('.json')) JSON.parse(update.content);
  seen.add(update.path);
 }
 const changed=[];
 for(const update of result.updates){
  const path=resolve(root,update.path);
  if(readFileSync(path,'utf8')!==update.content){
   writeFileSync(path,update.content);changed.push(update.path);
  }
 }
 return changed;
}

if(process.argv[1] && resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const result=JSON.parse(process.env.ARCHITECTURE_RESULT ?? 'null');
 const changed=applyUpdate(process.cwd(),result);
 if(process.env.GITHUB_OUTPUT) writeFileSync(process.env.GITHUB_OUTPUT,
  `changed=${changed.length>0}\n`,{flag:'a'});
 writeFileSync('/tmp/architecture-pr-body.md',
  `コード変更に追従してLikeC4の構成モデルを更新します。\n\n${result.summary}\n\n`+
  `Source commit: ${process.env.ARCHITECTURE_SOURCE_SHA}\n\n`+
  '検証: LikeC4検証、ビルド、モデル差分・抽出処理テスト。\n');
 console.log(`Architecture files changed: ${changed.length}`);
}
