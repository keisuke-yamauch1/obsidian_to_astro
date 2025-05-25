# Obsidian to Astro

ObsidianのコンテンツをAstroプロジェクト構造にコピーするスクリプトです。Markdown形式のコンテンツを変換し、特定のURLを埋め込みコンポーネントに自動変換します。

## 機能

- ObsidianのブログポストをAstroのコンテンツディレクトリにコピー
- Obsidianの日記エントリをAstroのコンテンツディレクトリにコピー
- Obsidianの画像をAstroの画像ディレクトリにコピー
- .envファイルによるパス設定
- 既に存在するファイルは移行の対象外（上書きされません）
- フロントマターのタグから "astro_blog/" プレフィックスを自動的に削除
- ブログ記事には最初の70文字から自動的に説明（description）を生成
- Obsidian形式の画像リンク (![[filename]]) をAstro形式 (![Image](../../assets/filename)) に変換
- Obsidian形式の日記リンク ([[YYYY-MM-DD_xxxxx]]) をAstro形式 ([xxxxx](/diary/YYYY/MM/DD)) に変換
- Obsidian形式のブログリンク ([[00001_ブログタイトル]]) をAstro形式 ([ブログタイトル](/blog/1)) に変換
- 画像ファイルは .png, .jpg, .jpeg, .gif 形式のみコピー
- 必要な出力ディレクトリが存在しない場合は自動的に作成
- YouTube、Twitter（X）の埋め込みURLを自動検出し、対応するastro-embedコンポーネントに変換
- 埋め込みコンポーネントが必要なファイルは自動的に.mdx形式に変換
- 必要なimport文を自動的にフロントマターの後に追加

## 埋め込みコンポーネントの変換

このスクリプトは以下のURLを検出し、対応するastro-embedコンポーネントに変換します：

- YouTube: `https://www.youtube.com/watch?v=xxxx` → `<YouTube id="xxxx" playlabel="Play" />`
- Twitter/X: `https://twitter.com/user/status/xxxx` → `<Tweet id="https://twitter.com/user/status/xxxx" />`

これらのURLを含むファイルは自動的に.mdx形式に変換され、必要なimport文が追加されます。

## セットアップ

1. このリポジトリをクローン
2. 依存関係をインストール:
   ```
   npm install
   ```
3. .envファイルでパスを設定:
   ```
   BLOG_PATH=blog
   DIARY_PATH=diary
   IMAGES_PATH=assets
   OUTPUT_CONTENT_PATH=src/content
   OUTPUT_IMAGES_PATH=src/assets
   ```

## 使用方法

スクリプトを実行:

```
npm start
```

これにより:
- BLOG_PATHから全ての.mdファイルをOUTPUT_CONTENT_PATH/blogにコピー
- DIARY_PATHから全ての.mdファイルをOUTPUT_CONTENT_PATH/diaryにコピー
- IMAGES_PATHから全ての画像ファイルをOUTPUT_IMAGES_PATHにコピー

注意: 既に存在するファイルはスキップされ、上書きされません。コンソールにスキップされたファイルのログが表示されます。

## テスト

テストを実行するには:

```
npm test
```

これにより、test/ディレクトリ内のサンプルファイルを使用して変換機能がテストされます。
