# Project Start

```shell
git clone https://github.com/GizEight/EI-EI-EIGHT.git
cd EI-EI-EIGHT
yarn
yarn dev
```

---

## Git

### デフォルトブランチ

`develop`

### Git flow

[フィーチャー ブランチ](https://www.atlassian.com/ja/git/tutorials/comparing-workflows/gitflow-workflow#:~:text=develop%0A%C2%A0main-,%E3%83%95%E3%82%A3%E3%83%BC%E3%83%81%E3%83%A3%E3%83%BC%20%E3%83%96%E3%83%A9%E3%83%B3%E3%83%81,-%E3%81%9D%E3%82%8C%E3%81%9E%E3%82%8C%E3%81%AE%E3%83%96%E3%83%A9%E3%83%B3%E3%83%81)

1. `develop` ブランチから `feature/ブランチ名` で切る
2. 作業後、`feature/ブランチ名` ブランチをリモートリポジトリにプッシュ
3. `develop` に対して `feature/ブランチ名` で `PR(プルリクエスト)` を作成する
4. レビュー後、レビュワーが `develop` にマージする。

### Commit

- 原則 `Commit` には `prefix` を付与する

#### `prefix` 一覧

| prefix       | description                                  |
| ------------ | -------------------------------------------- |
| [ feature ]  | 新規機能実装                                 |
| [ add ]      | プログラムの新規追加（より細かい単位）       |
| [ update ]   | 既存のプログラムの更新                       |
| [ fix ]      | プログラム修正・バグフィックス               |
| [ refactor ] | リファクタリング（機能に影響を一切与えない） |

#### 例

```git
[ feature ] google login
[ add ] google firebase auth provider
[ update ] google auth with confirmation dialog
[ fix ] google auth api not working
[ refactor ] google auth api
```

---
