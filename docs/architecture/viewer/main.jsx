import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { LikeC4ModelProvider, ReactLikeC4, useLikeC4Model } from 'likec4:react';
import './style.css';

function App() {
  const model = useLikeC4Model();
  const api = useRef(null);
  const flow = useRef(null);
  const fromHash = () => location.hash.match(/view\/([^/]+)/)?.[1] || 'index';
  const [view, setView] = useState(fromHash);
  const [trail, setTrail] = useState(() => fromHash() === 'index' ? ['index'] : ['index', fromHash()]);
  const [deployment, setDeployment] = useState(null);
  useEffect(() => {
    const update = () => { const requested = fromHash(); const id = model.findView(requested) ? requested : 'index'; setView(id); setDeployment(null); setTrail(old => old.includes(id) ? old.slice(0, old.indexOf(id) + 1) : [...old, id]); };
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, [model]);
  const navigate = (id) => {
    if (!model.findView(id) || id === view) return;
    setTrail(old => old.includes(id) ? old.slice(0, old.indexOf(id) + 1) : [...old, id]);
    setDeployment(null); setView(id); location.hash = `/view/${id}/`;
  };
  const title = id => model.findView(id)?.title || id;
  const current = model.findView(view) ? view : 'index';
  const click = node => {
    if (node.navigateTo && node.navigateTo !== current) return navigate(node.navigateTo);
    if (node.deploymentRef) return setDeployment(node.deploymentRef);
    const element = node.modelRef || node.id;
    if (model.findElement(element)) api.current?.openElementDetails(element, node.id);
  };
  const deployed = deployment ? model.deployment.findElement(deployment) : null;
  const children = deployed ? [...model.deployment.children(deployment)] : [];
  const raw = deployed?.$node || model.$data.deployments?.elements?.[deployment];
  const logical = raw?.element ? model.findElement(raw.element) : null;
  const description = logical?.description || deployed?.description;
  return <div className="shell">
    <header>
      <button className="brand" onClick={() => navigate('index')}>{model.project.id}</button>
      <nav aria-label="主な観点">{[['index','全体'],['delivery','運用'],['placement','配置']].map(([id,label]) =>
        <button key={id} aria-current={(id === 'placement' ? current === 'placement' : id === 'delivery' ? ['delivery','secrets'].includes(current) : !['delivery','secrets','placement'].includes(current)) ? 'page' : undefined} onClick={() => navigate(id)}>{label}</button>)}</nav>
      <span className="hint">要素をクリックして詳しく見る</span><button className="search" onClick={() => api.current?.openSearch()} aria-label="モデルを検索">検索 <kbd>⌘ K</kbd></button>
    </header>
    <div className="breadcrumbs"><button aria-label="前の図に戻る" disabled={current === 'index'} onClick={() => {
      const previous = trail.indexOf(current); navigate(previous > 0 ? trail[previous - 1] : 'index');
    }}>←</button>{trail.filter(id => model.findView(id)).map((id,i) => <React.Fragment key={id}>
      {i > 0 && <span>›</span>}<button onClick={() => navigate(id)} aria-current={id === current ? 'page' : undefined}>{title(id)}</button>
    </React.Fragment>)}</div>
    <main><ReactLikeC4 key={current} viewId={current} colorScheme="light" keepAspectRatio={false}
      style={{width:'100%', height:'100%'}} background="transparent"
      onInitialized={({diagram, xyflow}) => { api.current = diagram; flow.current = xyflow; }} onNavigateTo={navigate} onNodeClick={click}
      enableElementDetails enableRelationshipDetails enableRelationshipBrowser enableFocusMode enableSearch
      relationshipBrowserScope="view" showNavigationButtons={false} controls={false} fitView fitViewPadding={40} />
    </main><div className="viewport-controls"><button aria-label="拡大" onClick={() => flow.current?.zoomIn()}>＋</button><button aria-label="縮小" onClick={() => flow.current?.zoomOut()}>−</button><button aria-label="図全体を表示" onClick={() => api.current?.fitDiagram()}>⤢</button></div>
    {deployed && <aside aria-label="配置の詳細">
      <div className="drawer-heading"><span>配置の詳細</span><button aria-label="詳細を閉じる" onClick={() => setDeployment(null)}>×</button></div>
      <h2>{deployed.title}</h2><p>{description?.txt || description?.md || ''}</p>
      {logical && <button className="detail-link" onClick={() => {setDeployment(null); api.current?.openElementDetails(logical.id);}}>サービスの説明・関係を見る ↗</button>}
      {children.length > 0 && <><h3>この中にあるもの</h3><ul>{children.map(child => <li key={child.id}>
        <button onClick={() => setDeployment(child.id)}>{child.title}<span>›</span></button></li>)}</ul></>}
      {deployed.parent && <button className="detail-link" onClick={() => setDeployment(deployed.parent.id)}>← 一つ上の配置へ</button>}
    </aside>}
  </div>;
}
createRoot(document.getElementById('root')).render(<LikeC4ModelProvider><App /></LikeC4ModelProvider>);
