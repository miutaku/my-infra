# my-infraの構成を見る

構成モデルから作る7枚のビューを、要素のクリックで辿る。最初に概要を表示し、ページ一覧から選ぶ操作を入口にしない。

```bash
cd docs/architecture
npm ci
npm run dev
```

Node.js 24を使用する。表示されたURLをブラウザで開く。

## 読み方

- 上部の「全体・運用・配置」が入口。サービスや機能の図へは要素を1回クリックして進む。
- 下位ビューがない要素はLikeC4の詳細カードを開く。説明・定義リンク・関係・内部構造・配置をタブで確認する。
- 図から省略した要素もモデルに残る。検索、内部構造、relationship browserから確認できる。
- 配置は環境の箱だけを表示する。クリックすると右側に内容が現れ、ホスト→VM/LXC、クラスタ→namespace→サービスを辿れる。
- パンくずと戻るボタンで上位の図へ戻る。検索・ズーム・全体表示も利用でき、詳細を開いている間はEscapeで閉じられる。

サービスのまとまりには薄いグループを使い、ラベルを短くする。説明を箱の中へ詰め込まず、詳細カードへ置く。利用者の通信、デプロイ、秘密情報、監視は別の観点で表示する。関係フィルターは全include/navigateTo宣言の後へ置き、再追加された線が混ざらないようにする。

## 管理するもの

| ファイル | 内容 |
| --- | --- |
| `logical.c4` | 全サービス・内部要素・関係・説明・所有者・定義リンク |
| `deployment.c4` | 環境・物理ホスト・VM・クラスタ・namespaceと `instanceOf` |
| `views.c4` | 概要と役割別の6ビュー、用途別group、ナビゲーション・filter・rank |
| `deployment-views.c4` | 配置の概要1枚。詳細ツリーはdeployment modelから読む |
| `specification.c4` / `predicates.c4` | 種類・タグ・表示・共有関係フィルター |
| `viewer/` / `vite.config.mjs` | LikeC4公式ReactコンポーネントとVite pluginによるクリックUI |

同じサービスを環境ごとにコピーせず、`instanceOf`で配置する。新しい詳細のために図を増やす前に、説明・内部要素・関係をモデルへ追加する。専用ビューは、内部の構造を関係図として読む必要がある場合に追加する。図の省略とモデルからの削除を区別する。ソースを更新するとVite pluginがUIへ反映する。viewerに構成情報のコピーは持たせない。

```bash
npm run validate
npm run build            # dist/ に対話サイト
npm run preview
npm run build:standalone # standalone/index.html に単一HTML
npm run dev:native       # LikeC4標準UIでモデルを確認
```

単一HTMLはブラウザで直接開ける。生成物はGit管理しない。[CIテンプレート](architecture-workflow.yml)は同じscriptsを使う。workflow追加権限の都合で、自動実行は未設定。

このモデルはREADMEと参照先のTerraform・Kubernetes・workflow・実装に基づく設計上の構成。各要素のmetadataとリンクに所有者・参照元・確認時commitを持つ。稼働環境の自動検出ではない。構成を変更したら該当要素の根拠も更新する。

自宅アプリ全登録、VLAN、UPS/NUT、NAS・DB・snapshot・PBS backupはモデルに保持する。RPi workerとNUT Piは別機器。CP3 VMはPVE2ホストに分かれ、b550m上のCP2台喪失でetcd quorumを失う。Podの動的配置を特定ホストへ固定して描かない。Re:Venterアプリ・PRD OKEはreventer所有。
