# フェンリルイノベーションズ株式会社 — Emanon PREMIUM カスタムCSS設計書

## 適用箇所
WordPress 管理画面 > 外観 > カスタマイズ > 追加CSS に貼り付け、または
`/wp-content/themes/emanon-premium/` の `style.css` をインポートする子テーマを使用

---

## 1. CSS カスタムプロパティ（変数）定義

```css
:root {
  /* カラーパレット */
  --color-black:      #0B0B0D;
  --color-dark-blue:  #0F2A44;
  --color-gold:       #C9A24A;
  --color-silver:     #C6C9CE;
  --color-ice-blue:   #6FA3C8;
  --color-gray:       #8A939B;
  --color-white:      #FFFFFF;

  /* フォント */
  --font-ja:   'Noto Sans JP', sans-serif;
  --font-en:   'Inter', 'Montserrat', sans-serif;

  /* スペーシング */
  --section-padding-v: clamp(80px, 10vw, 140px);
  --section-padding-h: clamp(24px, 5vw, 80px);
  --max-width:         1280px;
  --content-width:     860px;

  /* トランジション */
  --transition-base:  0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
```

---

## 2. グローバルベーススタイル

```css
/* Googleフォント読み込み（functions.phpに追加推奨） */
/* @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&family=Inter:wght@300;400;600;700&family=Montserrat:wght@400;600;700&display=swap'); */

body {
  background-color: var(--color-black);
  color: var(--color-white);
  font-family: var(--font-ja);
  font-weight: 300;
  -webkit-font-smoothing: antialiased;
}

/* セクション共通 */
.fi-section {
  padding: var(--section-padding-v) var(--section-padding-h);
  width: 100%;
}

.fi-section--black     { background-color: var(--color-black); }
.fi-section--dark-blue { background-color: var(--color-dark-blue); }

.fi-container {
  max-width: var(--max-width);
  margin-inline: auto;
  width: 100%;
}

.fi-container--narrow {
  max-width: var(--content-width);
  margin-inline: auto;
}

/* セクションラベル */
.fi-section-label {
  display: block;
  font-family: var(--font-en);
  font-size: clamp(10px, 1.2vw, 12px);
  font-weight: 600;
  letter-spacing: 0.25em;
  color: var(--color-gold);
  text-transform: uppercase;
  margin-bottom: 1rem;
}

/* 見出しスタイル */
.fi-heading-xl {
  font-family: var(--font-ja);
  font-size: clamp(28px, 4vw, 56px);
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -0.01em;
  color: var(--color-white);
}

.fi-heading-lg {
  font-size: clamp(22px, 3vw, 40px);
  font-weight: 700;
  line-height: 1.4;
  color: var(--color-white);
}

.fi-heading-en {
  font-family: var(--font-en);
  font-size: clamp(36px, 6vw, 88px);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1;
  color: var(--color-white);
}

/* Gold装飾ライン */
.fi-gold-line {
  display: block;
  width: 40px;
  height: 2px;
  background-color: var(--color-gold);
  margin-block: 1.5rem;
}

/* 本文テキスト */
.fi-body {
  font-size: clamp(14px, 1.5vw, 16px);
  line-height: 1.9;
  color: var(--color-silver);
  font-weight: 300;
}
```

---

## 3. グローバルナビゲーション

```css
/* ヘッダー透過→スクロールで背景色付与 */
#site-header,
.emanon-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: transparent;
  transition: background var(--transition-base), box-shadow var(--transition-base);
  padding: 0 clamp(24px, 5vw, 80px);
}

#site-header.is-scrolled,
.emanon-header.is-scrolled {
  background: rgba(11, 11, 13, 0.95);
  backdrop-filter: blur(8px);
  box-shadow: 0 1px 0 rgba(201, 162, 74, 0.2);
}

/* ナビリンク */
.emanon-header .site-header-nav a {
  color: var(--color-white);
  font-family: var(--font-en);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  padding: 8px 0;
  position: relative;
  transition: color var(--transition-base);
}

.emanon-header .site-header-nav a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1px;
  background-color: var(--color-gold);
  transition: width var(--transition-base);
}

.emanon-header .site-header-nav a:hover::after {
  width: 100%;
}

/* CONTACTボタン */
.nav-contact-btn {
  display: inline-block;
  border: 1px solid var(--color-gold);
  color: var(--color-gold) !important;
  padding: 8px 20px !important;
  font-family: var(--font-en);
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition: background var(--transition-base), color var(--transition-base) !important;
}

.nav-contact-btn:hover {
  background: var(--color-gold) !important;
  color: var(--color-black) !important;
}

.nav-contact-btn::after {
  display: none !important;
}
```

---

## 4. HEROセクション（SECTION 01）

```css
.fi-hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: var(--color-black);
  overflow: hidden;
  padding: var(--section-padding-v) var(--section-padding-h);
}

.fi-hero__content {
  position: relative;
  z-index: 2;
  max-width: 800px;
}

.fi-hero__eyebrow {
  font-family: var(--font-en);
  font-size: 11px;
  letter-spacing: 0.3em;
  color: var(--color-gold);
  text-transform: uppercase;
  margin-bottom: 2rem;
}

.fi-hero__title {
  font-size: clamp(40px, 6vw, 80px);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--color-white);
  margin-bottom: 1.5rem;
}

.fi-hero__subtitle {
  font-size: clamp(14px, 1.6vw, 18px);
  line-height: 2;
  color: var(--color-silver);
  font-weight: 300;
  margin-bottom: 3rem;
  max-width: 520px;
}

/* CTAボタン */
.fi-btn {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-family: var(--font-en);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-decoration: none;
  padding: 16px 32px;
  transition: all var(--transition-base);
  cursor: pointer;
  border: none;
}

.fi-btn--outline {
  border: 1px solid var(--color-gold);
  color: var(--color-gold);
  background: transparent;
}

.fi-btn--outline:hover {
  background: var(--color-gold);
  color: var(--color-black);
}

.fi-btn--solid {
  background: var(--color-gold);
  color: var(--color-black);
  border: 1px solid var(--color-gold);
}

.fi-btn--solid:hover {
  background: transparent;
  color: var(--color-gold);
}

/* スクロールインジケーター */
.fi-scroll-indicator {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: var(--color-gray);
  font-family: var(--font-en);
  font-size: 10px;
  letter-spacing: 0.2em;
}

.fi-scroll-indicator::after {
  content: '';
  display: block;
  width: 1px;
  height: 48px;
  background: linear-gradient(to bottom, var(--color-gold), transparent);
  animation: scrollLine 1.8s ease-in-out infinite;
}

@keyframes scrollLine {
  0%   { opacity: 1; transform: scaleY(0); transform-origin: top; }
  50%  { opacity: 1; transform: scaleY(1); transform-origin: top; }
  51%  { transform-origin: bottom; }
  100% { opacity: 0; transform: scaleY(0); transform-origin: bottom; }
}

/* パーティクル背景（CSS実装） */
.fi-hero__bg {
  position: absolute;
  inset: 0;
  z-index: 1;
  background:
    radial-gradient(ellipse 60% 50% at 75% 50%, rgba(15, 42, 68, 0.6) 0%, transparent 70%),
    radial-gradient(ellipse 30% 40% at 85% 20%, rgba(201, 162, 74, 0.06) 0%, transparent 60%);
}
```

---

## 5. 数値強調セクション（SECTION 03, 07）

```css
.fi-stat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 40px;
}

.fi-stat-item {
  position: relative;
  padding: 32px;
  border-top: 1px solid rgba(201, 162, 74, 0.3);
}

.fi-stat-number {
  font-family: var(--font-en);
  font-size: clamp(40px, 5vw, 72px);
  font-weight: 700;
  color: var(--color-ice-blue);
  line-height: 1;
  margin-bottom: 0.5rem;
}

.fi-stat-label {
  font-size: 13px;
  color: var(--color-gray);
  line-height: 1.6;
}

.fi-stat-description {
  font-size: 14px;
  color: var(--color-silver);
  line-height: 1.7;
  margin-top: 0.75rem;
}
```

---

## 6. 事業カードグリッド（SECTION 05）

```css
.fi-business-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2px;
}

@media (max-width: 768px) {
  .fi-business-grid {
    grid-template-columns: 1fr;
  }
}

.fi-business-card {
  background: rgba(255, 255, 255, 0.03);
  padding: 48px 40px;
  border: 1px solid rgba(198, 201, 206, 0.08);
  transition: background var(--transition-base), border-color var(--transition-base);
  position: relative;
  overflow: hidden;
}

.fi-business-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 3px;
  height: 0;
  background: var(--color-gold);
  transition: height var(--transition-base);
}

.fi-business-card:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(201, 162, 74, 0.2);
}

.fi-business-card:hover::before {
  height: 100%;
}

.fi-business-card__number {
  font-family: var(--font-en);
  font-size: 11px;
  letter-spacing: 0.2em;
  color: var(--color-gold);
  margin-bottom: 1.5rem;
}

.fi-business-card__title {
  font-size: clamp(18px, 2vw, 22px);
  font-weight: 700;
  color: var(--color-white);
  margin-bottom: 1rem;
  line-height: 1.4;
}

.fi-business-card__body {
  font-size: 14px;
  color: var(--color-silver);
  line-height: 1.8;
  font-weight: 300;
}

.fi-business-card__link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 2rem;
  font-family: var(--font-en);
  font-size: 11px;
  letter-spacing: 0.15em;
  color: var(--color-gold);
  text-decoration: none;
  text-transform: uppercase;
}

.fi-business-card__link::after {
  content: '→';
  transition: transform var(--transition-base);
}

.fi-business-card:hover .fi-business-card__link::after {
  transform: translateX(4px);
}
```

---

## 7. 引用ブロック（SECTION 06）

```css
.fi-quote-section {
  padding: var(--section-padding-v) var(--section-padding-h);
  background: var(--color-black);
  position: relative;
  overflow: hidden;
}

.fi-quote {
  max-width: 900px;
  margin-inline: auto;
  text-align: center;
  position: relative;
  z-index: 2;
}

.fi-quote__mark {
  font-family: var(--font-en);
  font-size: 120px;
  color: rgba(201, 162, 74, 0.08);
  line-height: 0.8;
  font-weight: 700;
  margin-bottom: -20px;
  display: block;
}

.fi-quote__text {
  font-family: var(--font-ja);
  font-size: clamp(22px, 3.5vw, 48px);
  font-weight: 700;
  line-height: 1.5;
  color: var(--color-gold);
  letter-spacing: 0.02em;
}

.fi-quote__link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-top: 3rem;
  font-family: var(--font-en);
  font-size: 12px;
  letter-spacing: 0.2em;
  color: var(--color-silver);
  text-decoration: none;
  text-transform: uppercase;
  transition: color var(--transition-base);
}

.fi-quote__link:hover {
  color: var(--color-gold);
}
```

---

## 8. INSIGHTカード（SECTION 08）

```css
.fi-insight-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}

@media (max-width: 960px) {
  .fi-insight-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 600px) {
  .fi-insight-grid { grid-template-columns: 1fr; }
}

.fi-insight-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(198, 201, 206, 0.08);
  overflow: hidden;
  transition: transform var(--transition-base), border-color var(--transition-base);
  text-decoration: none;
}

.fi-insight-card:hover {
  transform: translateY(-4px);
  border-color: rgba(201, 162, 74, 0.25);
}

.fi-insight-card__thumbnail {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  display: block;
  opacity: 0.8;
  transition: opacity var(--transition-base);
}

.fi-insight-card:hover .fi-insight-card__thumbnail {
  opacity: 1;
}

.fi-insight-card__body {
  padding: 24px;
}

.fi-insight-card__tag {
  display: inline-block;
  font-family: var(--font-en);
  font-size: 10px;
  letter-spacing: 0.15em;
  color: var(--color-gold);
  text-transform: uppercase;
  margin-bottom: 0.75rem;
}

.fi-insight-card__title {
  font-size: 15px;
  font-weight: 700;
  color: var(--color-white);
  line-height: 1.55;
  margin-bottom: 0.5rem;
}

.fi-insight-card__date {
  font-family: var(--font-en);
  font-size: 11px;
  color: var(--color-gray);
  letter-spacing: 0.05em;
}
```

---

## 9. フッター

```css
.fi-footer {
  background: #080809;
  padding: 80px clamp(24px, 5vw, 80px) 40px;
  border-top: 1px solid rgba(201, 162, 74, 0.15);
}

.fi-footer__inner {
  max-width: var(--max-width);
  margin-inline: auto;
}

.fi-footer__logo {
  font-family: var(--font-en);
  font-size: 18px;
  font-weight: 700;
  color: var(--color-white);
  letter-spacing: 0.05em;
  margin-bottom: 3rem;
}

.fi-footer__nav {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 32px;
  margin-bottom: 3rem;
}

.fi-footer__nav a {
  font-family: var(--font-en);
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-gray);
  text-decoration: none;
  transition: color var(--transition-base);
}

.fi-footer__nav a:hover {
  color: var(--color-gold);
}

.fi-footer__bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(198, 201, 206, 0.08);
  flex-wrap: wrap;
  gap: 1rem;
}

.fi-footer__copyright {
  font-family: var(--font-en);
  font-size: 11px;
  color: var(--color-gray);
  letter-spacing: 0.05em;
}
```

---

## 10. スクロールアニメーション（JavaScript + CSS）

```css
/* アニメーション定義 */
.fi-anim {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}

.fi-anim.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.fi-anim--delay-1 { transition-delay: 0.1s; }
.fi-anim--delay-2 { transition-delay: 0.2s; }
.fi-anim--delay-3 { transition-delay: 0.3s; }
.fi-anim--delay-4 { transition-delay: 0.4s; }
```

```javascript
// Intersection Observer でスクロールアニメーション発火
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll('.fi-anim').forEach(el => observer.observe(el));

  // スクロールヘッダー
  const header = document.querySelector('#site-header, .emanon-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('is-scrolled', window.scrollY > 60);
    }, { passive: true });
  }
});
```

---

## 11. レスポンシブ対応（スマホ）

```css
@media (max-width: 768px) {
  :root {
    --section-padding-v: 64px;
    --section-padding-h: 24px;
  }

  .fi-hero__title {
    font-size: clamp(32px, 8vw, 48px);
  }

  .fi-business-grid {
    grid-template-columns: 1fr;
  }

  .fi-stat-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  /* ハンバーガーメニュー（Emanon標準UIを活用） */
  .emanon-header .site-header-nav {
    /* Emanonのモバイルメニュー機能に委ねる */
  }
}
```
