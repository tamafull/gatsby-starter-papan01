---
title: GatsbyのMarkdownレンダリングを直したい
date: 2021-08-28
cover: /images/gatsby-mandom.png
category: Issue
tags:
  - Gatsby
  - Markdown
---
Markdownレンダリングがおかしいので直したい。  
以下テスト項目。修正されてたら正常に表示される。  

### 番号付きリストに続く形でバレットを打つと、番号付きリストとして扱われてしまう
1. 1.
2. 2.
- bullet
3. 3.

### バレットに続く形で番号付きリストを使うと、バレットとして扱われてしまう

- bullet
- bullet
1. 1.
2. 2.

### 番号に続く文字列が番号の上に来てしまうことがある
1. 1行目  
    2行目  
    1. 1-1行目  
        1-2行目  
