# フェンリルイノベーションズ株式会社 — WordPress実装手順書

## 実装フロー全体

```
STEP 1  WordPress初期設定
STEP 2  Emanon PREMIUMテーマ設定
STEP 3  必須プラグイン設定
STEP 4  子テーマ作成・CSS/JS適用
STEP 5  固定ページ作成
STEP 6  カスタム投稿タイプ設定（CASE）
STEP 7  TOPページ実装（11セクション）
STEP 8  下層ページ実装
STEP 9  レスポンシブ確認・調整
STEP 10 さくらインターネット ドメイン紐付け
```

---

## STEP 1 — WordPress初期設定

### 基本設定（設定 > 一般）
- サイトのタイトル：`フェンリルイノベーションズ株式会社`
- キャッチフレーズ：`社会福祉のインフラを、再設計する。`
- WordPress アドレス・サイトアドレス：取得ドメインを設定
- タイムゾーン：東京
- 日付形式：`Y年n月j日`

### パーマリンク設定（設定 > パーマリンク）
- カスタム構造：`/%postname%/`

### 不要ページ・投稿の整理
- サンプルページ削除
- Hello World投稿削除
- コメント機能：設定 > ディスカッション > コメントをオフ

---

## STEP 2 — Emanon PREMIUM テーマ設定

### カスタマイザー設定（外観 > カスタマイズ）

**サイトロゴ・ファビコン**
- ヘッダーロゴ：SVGまたはPNG（白背景透過）推奨
- ファビコン：512×512px 以上

**カラー設定**
- メインカラー：`#C9A24A`（Gold）
- リンクカラー：`#C9A24A`
- 背景色：`#0B0B0D`

**フォント設定**
- 日本語フォント：Noto Sans JP
- 英語フォント：Inter or Montserrat（Google Fontsから）

**ヘッダー設定**
- レイアウト：透過ヘッダー対応のものを選択
- ヘッダー高さ：80px
- メニュー：グローバルナビゲーション（後述）

**フッター設定**
- フッターカラム：1カラム or 2カラム
- 著作権テキスト：`© 2025 Fenrir Innovations Inc.`

---

## STEP 3 — 必須プラグイン設定

### 既導入プラグインの確認・設定

| プラグイン | 設定ポイント |
|-----------|------------|
| SEO SIMPLE PACK | サイト名・デフォルトOGP画像・Google Search Console連携 |
| Emanon Blocks | ブロックエディタ拡張機能の有効化 |
| Contact Form 7 | コンタクトフォーム作成（後述） |

### 追加推奨プラグイン

| プラグイン | 用途 | 無料/有料 |
|-----------|------|---------|
| Custom Post Type UI | CASEカスタム投稿タイプ作成 | 無料 |
| Advanced Custom Fields (ACF) | 事例詳細のカスタムフィールド | 無料 |
| WP Super Cache | キャッシュ・高速化 | 無料 |
| Autoptimize | CSS/JS最適化 | 無料 |
| WebP Express | 画像最適化 | 無料 |

---

## STEP 4 — 子テーマ作成・CSS/JS適用

### 子テーマ作成

`/wp-content/themes/emanon-premium-child/` を作成し、以下2ファイルを設置：

**style.css**
```css
/*
Theme Name:   Emanon Premium Child
Template:     emanon-premium
*/
@import url("../emanon-premium/style.css");
```

**functions.php**
```php
<?php
// 子テーマのスタイル読み込み
add_action('wp_enqueue_scripts', function() {
    wp_enqueue_style(
        'emanon-premium-style',
        get_template_directory_uri() . '/style.css'
    );
    wp_enqueue_style(
        'fenrir-child-style',
        get_stylesheet_uri(),
        ['emanon-premium-style'],
        wp_get_theme()->get('Version')
    );
    // カスタムJS
    wp_enqueue_script(
        'fenrir-main',
        get_stylesheet_directory_uri() . '/assets/js/main.js',
        [],
        '1.0.0',
        true
    );
});

// Google Fonts読み込み
add_action('wp_enqueue_scripts', function() {
    wp_enqueue_style(
        'google-fonts',
        'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&family=Inter:wght@300;400;600;700&family=Montserrat:wght@600;700&display=swap',
        [],
        null
    );
});

// カスタム投稿タイプ：CASE（Custom Post Type UIを使う場合は不要）
add_action('init', function() {
    register_post_type('case', [
        'labels' => [
            'name'          => '導入事例',
            'singular_name' => '事例',
            'add_new_item'  => '新しい事例を追加',
        ],
        'public'       => true,
        'has_archive'  => true,
        'rewrite'      => ['slug' => 'case'],
        'supports'     => ['title', 'editor', 'thumbnail', 'excerpt'],
        'show_in_rest' => true,
    ]);
});
```

**assets/js/main.js**（03_カスタムCSS設計書.md の JavaScript部分を配置）

---

## STEP 5 — 固定ページ作成

### ページ一覧と作成手順

管理画面 > 固定ページ > 新規追加

| ページ名 | スラッグ | テンプレート選択 |
|---------|---------|--------------|
| HOME | （フロントページ設定で対応） | フロントページ |
| ABOUT | `about` | 固定ページ（全幅推奨） |
| SYSTEM DESIGN | `system-design` | 固定ページ（全幅） |
| BUSINESS | `business` | 固定ページ（全幅） |
| RECRUIT | `recruit` | 固定ページ（全幅） |
| CONTACT | `contact` | 固定ページ（全幅） |
| プライバシーポリシー | `privacy` | 固定ページ（標準） |

### フロントページ設定
設定 > 表示設定 > ホームページの表示：「固定ページ」→ HOME を選択

---

## STEP 6 — カスタム投稿タイプ設定（CASE）

### Custom Post Type UIで設定

投稿タイプのスラッグ：`case`
投稿タイプの複数形ラベル：`導入事例`
アーカイブあり：Yes
アーカイブスラッグ：`case`
GutenbergUIを使用：Yes

### ACFでカスタムフィールドグループ「事例詳細」作成

| フィールドラベル | フィールド名 | フィールドタイプ |
|--------------|------------|--------------|
| 業種 | `case_industry` | セレクト（介護/医療/保育/宗教法人/その他） |
| 施設規模 | `case_scale` | テキスト |
| 地域 | `case_region` | テキスト |
| 課題（支援前） | `case_challenge` | テキストエリア |
| 成果（数値） | `case_result_number` | テキスト |
| 成果（説明） | `case_result_text` | テキストエリア |
| クライアントの声 | `case_testimonial` | テキストエリア |

---

## STEP 7 — TOPページ実装（Gutenbergブロック）

### 各セクションのブロック構成

TOPページはGutenbergブロックエディタで実装。
Emanon Blocksの「フルワイドセクション」ブロックを活用。

**基本構造（各セクション）：**
```
[フルワイドセクション] ← 背景色設定
  └ [グループ / 最大幅コンテナ]
      ├ [段落] ← セクションラベル（.fi-section-label）
      ├ [見出し] ← メインタイトル
      ├ [段落] ← 本文
      └ [ボタン / カスタムHTML]
```

**SECTION 01 HERO の実装例（カスタムHTMLブロック）：**
```html
<section class="fi-hero">
  <div class="fi-hero__bg"></div>
  <div class="fi-hero__content fi-anim">
    <span class="fi-hero__eyebrow">Fenrir Innovations Inc.</span>
    <h1 class="fi-hero__title">
      社会福祉の<br>インフラを、再設計する。
    </h1>
    <p class="fi-hero__subtitle fi-anim fi-anim--delay-1">
      フェンリルイノベーションズ株式会社は、地域福祉エコシステムの<br>
      ネットワーク化と経営統合により、持続可能な社会基盤を構築します。
    </p>
    <a href="/about/" class="fi-btn fi-btn--outline fi-anim fi-anim--delay-2">
      私たちの思想を知る
    </a>
  </div>
  <div class="fi-scroll-indicator">SCROLL</div>
</section>
```

**SECTION 07 数値セクションの実装例：**
```html
<section class="fi-section fi-section--dark-blue">
  <div class="fi-container">
    <span class="fi-section-label fi-anim">NUMBERS</span>
    <div class="fi-stat-grid">
      <div class="fi-stat-item fi-anim fi-anim--delay-1">
        <div class="fi-stat-number" data-count="6">0</div>
        <div class="fi-stat-label">+<br>事業ドメイン数</div>
      </div>
      <div class="fi-stat-item fi-anim fi-anim--delay-2">
        <div class="fi-stat-number" data-count="3">0</div>
        <div class="fi-stat-label">支援対象セクター</div>
      </div>
      <!-- ... -->
    </div>
  </div>
</section>
```

---

## STEP 8 — グローバルナビゲーション設定

### メニュー作成
外観 > メニュー > 新規メニュー「グローバルナビゲーション」作成

| ラベル | リンク先 | 備考 |
|------|---------|------|
| HOME | `/` | |
| ABOUT | `/about/` | |
| SYSTEM DESIGN | `/system-design/` | |
| BUSINESS | `/business/` | ドロップダウン可 |
| INSIGHT | `/insight/` | |
| CASE | `/case/` | |
| RECRUIT | `/recruit/` | |
| CONTACT | `/contact/` | CSSクラス：`nav-contact-btn` |

### CONTACTボタンにクラス付与
メニュー編集画面で「表示オプション」→「CSSクラス」にチェック  
CONTACTメニュー項目の「CSSクラス（オプション）」に `nav-contact-btn` を入力

---

## STEP 9 — SEO SIMPLE PACK 設定

### 基本設定
- サイト名：`フェンリルイノベーションズ株式会社`
- サイト名のセパレーター：`|`
- ホームのタイトルタグ：`社会福祉のインフラを、再設計する。 | フェンリルイノベーションズ株式会社`

### OGP設定
- デフォルトOGP画像：1200×630px のブランド画像を設定
- Twitter Card：`summary_large_image`

### ページ別メタ設定（各固定ページ編集画面下部）

| ページ | メタタイトル | メタディスクリプション |
|-------|------------|-------------------|
| HOME | 社会福祉のインフラを、再設計する。 | フェンリルイノベーションズ株式会社は、社会福祉法人のネットワーク化と経営統合により、持続可能な地域福祉エコシステムを構築します。 |
| ABOUT | 私たちについて | フェンリルイノベーションズの理念・ビジョン・会社情報をご紹介します。 |
| SYSTEM DESIGN | システム設計思想 | 社会福祉を再設計するフェンリルイノベーションズのビジネスモデルと構想。 |
| BUSINESS | 事業内容 | 医療・介護・保育・宗教法人向けコンサルティング、IT導入支援、M&A支援など4つの事業軸。 |

---

## STEP 10 — さくらインターネット ドメイン紐付け

### 手順（ドメイン取得後）

1. **ドメイン取得**（さくらインターネット or お名前.com等）  
   推奨ドメイン例：`f-innov.jp`（既存参考URLと同系統）

2. **さくらインターネット コントロールパネルでドメイン設定**
   - サーバーコントロールパネル > ドメイン設定 > ドメインの追加
   - 「取得済みのドメインを移管せず使用する」を選択

3. **DNS設定**（ドメイン管理会社の管理画面）
   - Aレコード：さくらサーバーのIPアドレスを設定
   - さくらサーバーIPは コントロールパネル > サーバー情報 で確認

4. **SSL証明書設定**（Let's Encrypt）
   - さくらコントロールパネル > ドメイン設定 > SSL設定
   - 「無料SSL（Let's Encrypt）」を選択・適用
   - 反映まで最大72時間

5. **WordPress アドレス更新**
   - WordPress管理画面 > 設定 > 一般
   - WordPress アドレス・サイトアドレスを `https://ドメイン名` に更新

6. **リダイレクト設定**（.htaccess）
   ```apache
   RewriteEngine On
   RewriteCond %{HTTPS} off
   RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   ```

---

## 納品チェックリスト

### デザイン・コーディング
- [ ] TOPページ 11セクション完成
- [ ] 全下層ページ完成
- [ ] グローバルナビゲーション動作確認
- [ ] フッター確認
- [ ] スクロールアニメーション動作確認
- [ ] CTAボタン全箇所の遷移確認

### レスポンシブ
- [ ] スマートフォン（375px〜）確認
- [ ] タブレット（768px〜）確認
- [ ] デスクトップ（1280px〜）確認
- [ ] ハンバーガーメニュー動作確認

### WordPress機能
- [ ] お問い合わせフォーム送信・自動返信確認
- [ ] INSIGHTブログ投稿・表示確認
- [ ] CASE事例投稿・表示確認
- [ ] SEOメタ情報設定完了

### パフォーマンス
- [ ] Google PageSpeed Insights スコア 80以上（モバイル）
- [ ] 画像最適化（WebP変換）
- [ ] キャッシュプラグイン設定

### SSL・セキュリティ
- [ ] HTTPS化確認
- [ ] 管理画面URL変更（セキュリティ対策）
- [ ] WordPress・プラグイン最新版確認
