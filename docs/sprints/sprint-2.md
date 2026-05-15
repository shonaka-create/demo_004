# Sprint 2 — WordPress 移行・基盤構築

**期間**: 5日  
**目標**: さくらインターネットにWordPressをインストールし、Emanon PREMIUM + 子テーマで全固定ページを構築する  
**前提**: Sprint 1 完了（全8ページのHTMLデモが動作している）

---

## 成果物

- [ ] さくらサーバーに WordPress インストール済み
- [ ] Emanon PREMIUM テーマ設定済み
- [ ] 子テーマ作成・CSS/JS 適用済み
- [ ] 全固定ページがWordPressで表示される
- [ ] グローバルナビゲーション動作確認済み

---

## タスク分解

### Task 2.1: WordPress 初期設定
**見積もり**: 30min  
**依存**: なし  
**内容**:
- WordPress インストール（さくらサーバーの簡単インストール機能）
- PHP 8.1以上であることを確認（コントロールパネル > PHP設定）
- 基本設定（タイトル・キャッチフレーズ・タイムゾーン・パーマリンク）
- サンプルデータ削除・コメント機能オフ

**参照**: [04_WordPress実装手順書.md](../../04_WordPress実装手順書.md) — STEP 1

**完了条件**:
- [ ] WordPress 管理画面にアクセスできる
- [ ] パーマリンクが `/%postname%/` 設定になっている

---

### Task 2.2: Emanon PREMIUM テーマ設定
**見積もり**: 1h  
**依存**: Task 2.1  
**内容**:
- Emanon PREMIUM アップロード・有効化
- カスタマイザー設定（カラー・フォント・ヘッダー・フッター）
- ロゴ・ファビコン設定

**参照**: [04_WordPress実装手順書.md](../../04_WordPress実装手順書.md) — STEP 2

**完了条件**:
- [ ] Emanon PREMIUM が有効化されている
- [ ] メインカラーが Gold `#C9A24A` に設定されている
- [ ] 背景色が `#0B0B0D` に設定されている

---

### Task 2.3: 必須プラグイン設定
**見積もり**: 1h  
**依存**: Task 2.2  
**内容**:
- SEO SIMPLE PACK 設定
- Contact Form 7 インストール（フォーム設定は Sprint 3）
- Custom Post Type UI インストール（CASE 投稿タイプ = Sprint 3）
- Advanced Custom Fields インストール
- WP Super Cache / WebP Express インストール

**参照**: [04_WordPress実装手順書.md](../../04_WordPress実装手順書.md) — STEP 3

**完了条件**:
- [ ] 必須5プラグインが全てインストール・有効化されている

---

### Task 2.4: 子テーマ作成・CSS/JS 適用
**見積もり**: 1.5h  
**依存**: Task 2.3  
**内容**:
- `/wp-content/themes/emanon-premium-child/` 作成
- `style.css`（子テーマ宣言 + 親インポート）作成
- `functions.php`（スタイル読み込み + Google Fonts + カスタム投稿タイプ登録）作成
- `assets/js/main.js`（スクロールアニメーション + ヘッダー制御）配置
- [03_カスタムCSS設計書.md](../../03_カスタムCSS設計書.md) の全CSSを子テーマに適用

**参照**: [04_WordPress実装手順書.md](../../04_WordPress実装手順書.md) — STEP 4

**完了条件**:
- [ ] 子テーマが有効化されている
- [ ] フロントページにデザイントークン（Gold・Dark Blue等）が反映されている
- [ ] Google Fonts（Noto Sans JP / Inter）が読み込まれている

---

### Task 2.5: 固定ページ作成
**見積もり**: 1h  
**依存**: Task 2.4  
**内容**:
- 全固定ページを管理画面から作成（スラッグ設定）
- フロントページを「ホーム」固定ページに設定
- グローバルナビゲーションメニュー作成・CONTACT に `nav-contact-btn` クラス付与

**参照**: [04_WordPress実装手順書.md](../../04_WordPress実装手順書.md) — STEP 5, 8

**完了条件**:
- [ ] 全8固定ページが作成されている
- [ ] 正しいスラッグが設定されている
- [ ] ナビゲーションが全ページで動作している

---

### Task 2.6: 各固定ページへのHTMLコンテンツ実装
**見積もり**: 3h  
**依存**: Task 2.5  
**内容**:
- Gutenberg ブロックエディタ + カスタムHTMLブロックで、Sprint 1 で作成した HTML を各固定ページに実装
- TOPページ11セクション（HERO / PHILOSOPHY / SOCIAL ISSUES / OUR APPROACH / BUSINESS OVERVIEW / SYSTEM DESIGN TEASER / NUMBERS / INSIGHT PICKUP / CASE TEASER / ABOUT / RECRUIT & CONTACT）
- その他7ページの実装

**参照**: [04_WordPress実装手順書.md](../../04_WordPress実装手順書.md) — STEP 7

**完了条件**:
- [ ] 全固定ページがWordPressで正常表示される
- [ ] スクロールアニメーションが動作する
- [ ] カウントアップアニメーションが動作する

---

## Sprint 2 完了条件（Definition of Done）

- [ ] WordPress で全ページが表示される
- [ ] Emanon PREMIUM + 子テーマのCSS が正常に適用されている
- [ ] ナビゲーション全リンクが機能する
- [ ] モバイルでレイアウト確認済み
- [ ] CSS競合（`!important` 多発等）が解消されている

---

## リスク

| リスク | 影響 | 対策 |
|--------|------|------|
| Emanon PREMIUM との CSS セレクタ競合 | 高 | 子テーマで上書き・specificity を高く設定 |
| Gutenberg ブロックのHTML解釈違い | 中 | カスタムHTMLブロックで全セクションをラップして回避 |
| さくらサーバーの PHP バージョン | 高 | インストール前に PHP 8.1以上を確認（Task 2.1 前提） |
