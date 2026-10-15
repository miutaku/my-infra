# my-infraの構成モデル

公開サイト: https://miutaku.github.io/my-infra/

全体から要素をクリックして、自宅サービス、変更・デプロイ、BWSからの秘密注入、監視、配置へ進む。6ビューは同じモデルを使い、箱を増やす代わりに説明・参照元リンク・関係・配置詳細を使う。配置ではホストやクラスタをクリックして内部を辿る。Terraform/Kubernetes全定義は「リソース一覧」で検索できる。

| ファイル | 役割 |
| --- | --- |
| logical.c4 | サービス・所有境界・説明・関係・根拠リンク |
| deployment.c4 | 物理ホスト・VM・クラスタ・namespaceとinstanceOf |
| views.c4 | 6つの観点とクリックナビゲーション |
| specification.c4 | 種類と線の意味 |
| scripts/inventory.mjs | Terraform resource/moduleとKubernetes metadataの自動抽出 |
| viewer/ | LikeC4公式React UI。構成情報のコピーを持たない |

```bash
cd docs/architecture
npm ci
npm run build
npm test
npm run dev
```

Node.js 24。生成物とresource-inventory.jsonはGit管理しない。公開一覧は名前・種類・namespace・参照元だけを掲載し、Secretの内容や環境変数は抽出しない。Terraformのfor_eachインスタンス数や稼働状態の検出ではない。Ansible/Talosの実行時設定はモデルの根拠リンクから確認する。

## 自動更新

mainのコード変更で、GitHub-hosted runnerが一覧を抽出しサイトを再構築する。同時にPlusのCodexが現在のソースと変更差分を読んで、モデル更新が必要なら `automation/architecture-model` のPRを作成・更新する。変更不要ならPRは作らない。AIが変更できるのはlogical.c4・deployment.c4・views.c4だけ。別のGitHub-hosted runnerが許可範囲・モデル・ビルド・テストを検証してPR化する。AIがインフラ自体を変更することはない。

サイト・PRレビューの配信はすべてGitHub Pages。AI実行だけは `arc-runner-my-infra-codex` の非特権専用Podを使用し、認証はNFS PVCの専用subPath `codex-my-infra-auth` に分離して保存する。Docker socket・ホストパス・Kubernetes tokenは持たない。Talosのユーザー名前空間制限のため、Codex自体のbubblewrapではなく専用Podを隔離境界にする。Plus枠を使い、API課金への自動切替はしない。

初回ログイン確認後にActions variable `ARCHITECTURE_CODEX_ENABLED=true` でAI更新を有効化する。認証準備中はサイト・レビューだけ動作する。初回や認証切れは、専用runner内の `/home/runner/.codex/bootstrap/codex login --device-auth` でログインする。認証ファイルをGit・artifact・Pagesへコピーしない。OpenAI Docs: https://developers.openai.com/codex/auth/

## PRの図のレビュー

PRで変更前後の正確なコミットから全ビューを画像化し、意味のある要素・関係・配置・ビュー・リソース一覧の差分を計算する。PRコメントの比較URLから左右表示・重ね合わせ・拡大で確認し、同じURL内の `explorer/` で変更後のLikeC4も操作できる。差分0件は「構成図の変更なし」を表示し、比較はボタンを押したときだけ開く。

本番はルート、レビューは `pr/<番号>/<SHA>/<run>-<attempt>/`、手動比較は `previews/<run>-<attempt>/` に公開する。すべて公開で認証不要。本番とレビューを同じデプロイへ含め、PRの公開が本番を置き換えない。生成物の状態は `gh-pages`、ソースはmainで管理する。GitHub PagesはActionsのworkflow方式で配信する。

公開処理はworkflow_runでmainのコードを使う。PRのコードをwrite権限付きjobで実行せず、artifactのregular file・元コミット・保存先を検証する。同じリポジトリのPRだけを配信し、フォークは公開しない。AIのGITHUB_TOKENが作ったPRはイベントが発火しないため、比較workflowを明示的にdispatchする。

PR終了イベントと日次再照合で終了済みPRを削除し、30日を過ぎたレビューも削除する。古いURLは公開コンテンツとして他者が取得済みである可能性があり、Git履歴からの機密削除機構ではない。公開モデル・一覧に秘密情報を入れない。

初回導入前のcommitにはモデルがないため比較できない。導入後のmainをbaseにして比較する。手動実行はArchitecture explorerのbase_refで指定し、Publish architecture Pagesの実行summaryに比較リンクが載る。
