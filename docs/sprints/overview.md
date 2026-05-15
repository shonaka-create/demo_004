# スプリント計画 — フェンリルイノベーションズ コーポレートサイト

## 全体サマリー

| 項目 | 内容 |
|------|------|
| 総スプリント数 | 4スプリント |
| 予定総期間 | 約3〜4週間 |
| 現在地 | Sprint 1 進行中（index/about/system-design 完了） |

---

## スプリント一覧

| Sprint | テーマ | 期間 | 状態 |
|--------|--------|------|------|
| [Sprint 1](sprint-1.md) | 残5ページHTML実装 | 3〜4日 | 🟡 進行中 |
| [Sprint 2](sprint-2.md) | WordPress移行・基盤構築 | 5日 | ⏳ 待機中 |
| [Sprint 3](sprint-3.md) | 動的コンテンツ・フォーム・SEO | 3〜4日 | ⏳ 待機中 |
| [Sprint 4](sprint-4.md) | ドメイン・SSL・本番確認・納品 | 2〜3日 | ⏳ 待機中 |

---

## 依存関係図

```mermaid
gantt
    title フェンリルイノベーションズ サイト構築スケジュール
    dateFormat  YYYY-MM-DD
    section Sprint 1 HTML実装
    business.html          :s1-1, 2025-01-01, 1d
    insight.html           :s1-2, after s1-1, 1d
    case.html              :s1-3, after s1-2, 1d
    recruit.html           :s1-4, after s1-3, 0.5d
    contact.html           :s1-5, after s1-4, 0.5d
    section Sprint 2 WordPress移行
    WP初期設定             :s2-1, after s1-5, 1d
    子テーマ作成・CSS適用  :s2-2, after s2-1, 1d
    固定ページ作成         :s2-3, after s2-2, 1d
    TOPページ実装          :s2-4, after s2-3, 2d
    section Sprint 3 動的機能
    INSIGHT/CASE設定       :s3-1, after s2-4, 1d
    CF7フォーム設定        :s3-2, after s3-1, 1d
    SEO設定                :s3-3, after s3-2, 1d
    パフォーマンス最適化   :s3-4, after s3-3, 1d
    section Sprint 4 本番リリース
    ドメイン紐付け・SSL    :s4-1, after s3-4, 1d
    動作確認・修正         :s4-2, after s4-1, 1d
    納品チェック           :s4-3, after s4-2, 1d
```

---

## フェーズ全体 Exit Criteria

| フェーズ | 条件 |
|---------|------|
| Sprint 1完了 | 全8ページのHTMLが静的デモとして動作確認済み |
| Sprint 2完了 | WordPressで全固定ページが表示され、ナビゲーションが機能する |
| Sprint 3完了 | CF7フォーム送信・自動返信確認済み。PageSpeed 80以上 |
| Sprint 4完了 | HTTPS化・本番ドメインでの全ページ表示確認・納品チェックリスト全✅ |

---

## 現在の実装状況

### 完了ページ
- [x] `index.html` — TOP ページ（11セクション構成）
- [x] `about.html` — ABOUT ページ
- [x] `system-design.html` — SYSTEM DESIGN ページ

### 未実装ページ（Sprint 1 スコープ）
- [ ] `business.html` — BUSINESS + 詳細4ページ
- [ ] `insight.html` — INSIGHT 一覧
- [ ] `case.html` — CASE 一覧
- [ ] `recruit.html` — RECRUIT
- [ ] `contact.html` — CONTACT

### 共通ファイル
- [x] `style.css` — グローバルCSS（CSS変数・コンポーネント）
- [x] `script.js` — スクロールアニメーション・ハンバーガーメニュー
