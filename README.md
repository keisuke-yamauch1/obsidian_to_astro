# Obsidian to Astro

ObsidianのコンテンツをAstroプロジェクト構造にコピーするスクリプトです。

## 機能

- ObsidianのブログポストをAstroのコンテンツディレクトリにコピー
- Obsidianの日記エントリをAstroのコンテンツディレクトリにコピー
- Obsidianの画像をAstroの画像ディレクトリにコピー
- .envファイルによるパス設定
- 既に存在するファイルは移行の対象外（上書きされません）

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
