# フェンリルイノベーションズ — デザインシステム

> **注記**: 本プロジェクトは Tailwind CSS ではなく CSS カスタムプロパティ（変数）によるカスタムCSSを採用。  
> CSS実装の全コードは [03_カスタムCSS設計書.md](../../03_カスタムCSS設計書.md) を参照。

---

## 1. デザインコンセプト

| 項目 | 内容 |
|------|------|
| 方向性 | ハイエンド・プレミアム・知性的 |
| キーワード | 「社会システムの設計者」としての重厚感 |
| カラートーン | ダーク（#0B0B0D）× Gold（#C9A24A） |
| フォントトーン | セリフ除外・ジオメトリック系サンセリフで知性と清潔感 |

---

## 2. カラーパレット

### 2.1 定義

```css
:root {
  --color-black:     #0B0B0D;  /* 背景メイン */
  --color-dark-blue: #0F2A44;  /* 背景サブ（セクション交互） */
  --color-gold:      #C9A24A;  /* アクセント・CTA・見出し装飾 */
  --color-silver:    #C6C9CE;  /* 本文補助・罫線 */
  --color-ice-blue:  #6FA3C8;  /* 数値強調・インフォグラフィック */
  --color-gray:      #8A939B;  /* キャプション・注釈 */
  --color-white:     #FFFFFF;  /* テキスト・背景ライト区間 */
}
```

### 2.2 使用ルール

| カラー | 使用箇所 | 使用禁止 |
|--------|---------|---------|
| Black `#0B0B0D` | メイン背景・HERO背景 | テキスト本文（コントラスト不足） |
| Dark Blue `#0F2A44` | セクション交互背景（偶数） | — |
| Gold `#C9A24A` | CTAボタン・セクションラベル・装飾ライン・見出し強調 | 大面積の背景 |
| Silver `#C6C9CE` | 本文テキスト・カード本文 | — |
| Ice Blue `#6FA3C8` | 数値・インフォグラフィック強調のみ | 通常テキスト |
| Gray `#8A939B` | キャプション・注釈・フッターナビ | 重要テキスト |
| White `#FFFFFF` | ヘッダーロゴ・ナビリンク・見出し | 暗背景以外 |

### 2.3 コントラスト比（WCAG AA準拠確認）

| 前景 | 背景 | コントラスト比 | AA判定 |
|------|------|-------------|--------|
| White `#FFFFFF` | Black `#0B0B0D` | 20.7:1 | ✅ |
| Silver `#C6C9CE` | Black `#0B0B0D` | 11.2:1 | ✅ |
| Gold `#C9A24A` | Black `#0B0B0D` | 6.8:1 | ✅ |
| Silver `#C6C9CE` | Dark Blue `#0F2A44` | 8.5:1 | ✅ |
| Gray `#8A939B` | Black `#0B0B0D` | 4.9:1 | ✅（AA） |
| Ice Blue `#6FA3C8` | Black `#0B0B0D` | 6.1:1 | ✅ |

---

## 3. タイポグラフィ

### 3.1 フォントファミリー

```css
--font-ja: 'Noto Sans JP', sans-serif;
--font-en: 'Inter', 'Montserrat', sans-serif;
```

**Google Fonts 読み込み（推奨）:**
```
Noto Sans JP: 300 / 400 / 500 / 700
Inter: 300 / 400 / 600 / 700
Montserrat: 400 / 600 / 700
```

### 3.2 タイポグラフィスケール

| クラス | サイズ | 用途 |
|--------|--------|------|
| `.fi-heading-xl` | `clamp(28px, 4vw, 56px)` | ページ主要見出し（h1相当） |
| `.fi-heading-lg` | `clamp(22px, 3vw, 40px)` | セクション見出し（h2相当） |
| `.fi-heading-en` | `clamp(36px, 6vw, 88px)` | 英語大見出し（HERO等） |
| `.fi-section-label` | `clamp(10px, 1.2vw, 12px)` | セクションラベル（大文字・letter-spacing広め） |
| `.fi-body` | `clamp(14px, 1.5vw, 16px)` | 本文 |
| キャプション | `11〜12px` | 日付・出典・フッターナビ |

### 3.3 フォントウェイト

| ウェイト | 用途 |
|---------|------|
| 300 (Light) | 本文・サブコピー |
| 400 (Regular) | 通常テキスト |
| 600 (SemiBold) | ナビゲーション・ラベル |
| 700 (Bold) | 見出し |

---

## 4. スペーシング

```css
--section-padding-v: clamp(80px, 10vw, 140px);  /* セクション上下余白 */
--section-padding-h: clamp(24px, 5vw, 80px);     /* セクション左右余白 */
--max-width:         1280px;                      /* コンテンツ最大幅 */
--content-width:     860px;                       /* 本文コンテンツ幅 */
```

### スペーシング基準（8px グリッド）

| 値 | 用途 |
|----|------|
| 8px | 小アイテム間（タグ等） |
| 16px | フィールド間・小コンポーネント内余白 |
| 24px | カード内パディング（モバイル） |
| 32px | カード間・リスト間 |
| 40px | セクション内コンポーネント間 |
| 48px | カード内パディング（デスクトップ） |
| 80〜140px | セクション上下余白（clampで可変） |

---

## 5. コンポーネント仕様

### 5.1 ボタン

| バリアント | 背景 | テキスト | ボーダー | ホバー |
|-----------|------|---------|---------|--------|
| `.fi-btn--outline` | transparent | Gold | 1px Gold | Gold背景・Blackテキスト |
| `.fi-btn--solid` | Gold | Black | 1px Gold | transparent・Goldテキスト |

共通: `padding: 16px 32px`, `font-en`, `font-size: 13px`, `letter-spacing: 0.12em`, `text-transform: uppercase`

### 5.2 カード（事業カード）

- 背景: `rgba(255,255,255,0.03)`
- ボーダー: `1px solid rgba(198,201,206,0.08)`
- ホバー: 背景少し明るく + ボーダー Gold 化 + 左辺Gold縦線出現
- パディング: `48px 40px`

### 5.3 セクションラベル

- フォント: `font-en`, font-weight: 600
- サイズ: `clamp(10px, 1.2vw, 12px)`
- カラー: Gold
- letter-spacing: `0.25em`
- text-transform: uppercase

### 5.4 数値強調（Statistics）

- フォント: `font-en`, font-weight: 700
- サイズ: `clamp(40px, 5vw, 72px)`
- カラー: Ice Blue
- ボーダートップ: `1px solid rgba(201,162,74,0.3)`

### 5.5 装飾ライン（Gold Line）

```css
.fi-gold-line {
  width: 40px;
  height: 2px;
  background-color: var(--color-gold);
  margin-block: 1.5rem;
}
```

---

## 6. アニメーション

### 6.1 トランジション

```css
--transition-base: 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
```

### 6.2 スクロールアニメーション

- 実装: `IntersectionObserver` + `.fi-anim` / `.is-visible` クラス
- 初期状態: `opacity: 0; transform: translateY(24px)`
- 完了状態: `opacity: 1; transform: translateY(0)`
- 遅延クラス: `--delay-1`（0.1s）〜 `--delay-4`（0.4s）

### 6.3 スクロールインジケーター（HERO）

- CSS `@keyframes` のみで実装（JS不使用）
- Gold の縦線が上→下へフェードイン・フェードアウト

### 6.4 カウントアップ（NUMBERS セクション）

- `data-count` 属性の値まで数値をカウントアップ
- `IntersectionObserver` で視野内に入ったタイミングで発火

---

## 7. レスポンシブブレークポイント

| ブレークポイント | 幅 | 対象デバイス |
|---------------|----|-----------| 
| モバイル | 〜 767px | スマートフォン（最小 375px iPhone SE） |
| タブレット | 768px 〜 1023px | タブレット |
| デスクトップ | 1024px 〜 | PC（最大幅 1280px） |

### モバイル時の主な変更

```css
@media (max-width: 768px) {
  --section-padding-v: 64px;
  --section-padding-h: 24px;
  .fi-business-grid { grid-template-columns: 1fr; }
  .fi-stat-grid     { grid-template-columns: 1fr; gap: 24px; }
}
```

---

## 8. ヘッダー

- 初期: 透過（`background: transparent`）
- スクロール後 (>60px): `rgba(11,11,13,0.95)` + `backdrop-filter: blur(8px)` + Gold 下線
- 実装: scroll イベント + `.is-scrolled` クラス付与

---

## 9. ワイヤーフレーム参照

実装の参照元となる設計書：

| 資料 | パス |
|------|------|
| TOPページ構成書 | [../../01_サイト構成書_TOP.md](../../01_サイト構成書_TOP.md) |
| 下層ページ構成書 | [../../02_サイト構成書_下層ページ.md](../../02_サイト構成書_下層ページ.md) |
| CSS設計書（フルコード） | [../../03_カスタムCSS設計書.md](../../03_カスタムCSS設計書.md) |
| WordPress実装手順書 | [../../04_WordPress実装手順書.md](../../04_WordPress実装手順書.md) |
