# Sprint 3 — 動的コンテンツ・フォーム・SEO・パフォーマンス

**期間**: 3〜4日  
**目標**: INSIGHT/CASE の動的コンテンツ・Contact Form 7・SEO・PageSpeed 80以上を達成する  
**前提**: Sprint 2 完了（WordPress + Emanon + 全固定ページが動作している）

---

## 成果物

- [ ] CASE カスタム投稿タイプ動作確認
- [ ] CF7 フォーム送信・自動返信確認
- [ ] reCAPTCHA v3 設定完了
- [ ] WP Mail SMTP でメール送信確認
- [ ] SEO SIMPLE PACK 全ページ設定完了
- [ ] PageSpeed Insights スコア 80以上（モバイル）

---

## タスク分解

### Task 3.1: CASE カスタム投稿タイプ設定
**見積もり**: 1h  
**依存**: なし  
**内容**:
- Custom Post Type UI で `case` 投稿タイプを設定（アーカイブ有効・スラッグ `case`）
- ACF でフィールドグループ「事例詳細」作成（7フィールド）
- テスト事例を1件投稿・アーカイブページで表示確認

**参照**: [04_WordPress実装手順書.md](../../04_WordPress実装手順書.md) — STEP 6  
**参照**: [docs/states/content-state.md](../states/content-state.md) — CASEフィールド一覧

**完了条件**:
- [ ] `/case/` にカスタム投稿アーカイブがアクセス可能
- [ ] ACF フィールドが投稿編集画面に表示される
- [ ] テスト投稿が一覧・詳細で表示される

---

### Task 3.2: INSIGHT 投稿設定
**見積もり**: 30min  
**依存**: なし  
**内容**:
- `insight-category` タクソノミーの確認（CPT UI or カスタムコードで作成）
- テスト記事を3件投稿（各カテゴリ1件ずつ）
- INSIGHTアーカイブ `/insight/` での表示確認

**完了条件**:
- [ ] `/insight/` にブログアーカイブがアクセス可能
- [ ] 3件のテスト記事が表示される

---

### Task 3.3: WP Mail SMTP 設定
**見積もり**: 1h  
**依存**: なし  
**内容**:
- WP Mail SMTP または Fluent SMTP インストール
- Google Workspace または SendGrid アカウントで SMTP 設定
- テストメール送信確認

**完了条件**:
- [ ] 管理者宛テストメールが届く
- [ ] 送信元メールアドレスがスパム判定されない

---

### Task 3.4: Contact Form 7 フォーム作成・設定
**見積もり**: 1.5h  
**依存**: Task 3.3（メール送信確認後）  
**内容**:
- CF7 でフォーム作成（フィールド定義は PRD 4.2 CONTACT セクション参照）
- 管理者通知メール設定（Subject: お問い合わせが届きました）
- 自動返信メール設定（Subject: お問い合わせを受け付けました）
- CONTACT ページにショートコードを埋め込み

**参照**: [docs/states/contact-form-state.md](../states/contact-form-state.md)

**完了条件**:
- [ ] フォームが表示される
- [ ] 送信後にサンクスメッセージが表示される
- [ ] 管理者に通知メールが届く
- [ ] 送信者に自動返信メールが届く

---

### Task 3.5: reCAPTCHA v3 設定
**見積もり**: 30min  
**依存**: Task 3.4  
**内容**:
- Google reCAPTCHA v3 のサイトキー・シークレットキー取得
- CF7 の Integration タブで reCAPTCHA 設定
- スパムテストの確認

**完了条件**:
- [ ] reCAPTCHA バッジがフォームページに表示される
- [ ] スパムボットによる送信がブロックされることを確認

---

### Task 3.6: SEO SIMPLE PACK 全ページ設定
**見積もり**: 1h  
**依存**: なし  
**内容**:
- 基本設定（サイト名・OGP画像・Twitter Card）
- 各固定ページのメタタイトル・ディスクリプション設定

**参照**: [04_WordPress実装手順書.md](../../04_WordPress実装手順書.md) — STEP 9

| ページ | メタタイトル | ディスクリプション |
|-------|------------|-----------------|
| HOME | 社会福祉のインフラを、再設計する。 | フェンリルイノベーションズ株式会社は、社会福祉法人のネットワーク化と経営統合により、持続可能な地域福祉エコシステムを構築します。 |
| ABOUT | 私たちについて \| Fenrir Innovations | フェンリルイノベーションズの理念・ビジョン・会社情報をご紹介します。 |
| SYSTEM DESIGN | システム設計思想 \| Fenrir Innovations | 社会福祉を再設計するフェンリルイノベーションズのビジネスモデルと構想。 |
| BUSINESS | 事業内容 \| Fenrir Innovations | 医療・介護・保育向けコンサルティング、IT導入支援、M&A支援など4つの事業軸。 |
| INSIGHT | インサイト \| Fenrir Innovations | 社会福祉業界の知見・最新情報を発信するメディア。 |
| CASE | 導入事例 \| Fenrir Innovations | フェンリルイノベーションズの支援実績をご紹介します。 |
| RECRUIT | 採用情報 \| Fenrir Innovations | 社会を設計する仲間を募集しています。 |
| CONTACT | お問い合わせ \| Fenrir Innovations | フェンリルイノベーションズへのご相談・お問い合わせはこちら。 |

**完了条件**:
- [ ] 全固定ページのメタタイトル・ディスクリプションが設定されている
- [ ] OGP 画像が設定されている

---

### Task 3.7: パフォーマンス最適化
**見積もり**: 1h  
**依存**: Task 3.6 まで完了後  
**内容**:
- WP Super Cache 設定（キャッシュ有効化）
- WebP Express 設定（画像WebP変換・遅延読み込み）
- Autoptimize 設定（CSS/JS 結合・遅延読み込み）
- Google PageSpeed Insights で計測・スコア 80 以上を目指す

**完了条件**:
- [ ] PageSpeed Insights モバイルスコア 80以上
- [ ] FCP（First Contentful Paint）3秒以内

---

## Sprint 3 完了条件（Definition of Done）

- [ ] CF7 フォーム送信・管理者通知・自動返信が全て動作する
- [ ] reCAPTCHA v3 が有効になっている
- [ ] 全ページのSEOメタ情報が設定されている
- [ ] PageSpeed Insights モバイルスコア 80以上
- [ ] テスト記事・テスト事例が正常表示される
