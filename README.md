# cola-demo

- cola.jsを使ったネットワーク図描画のデモサイトです。
- Webサーバを通して見える場所にファイルを配置して、ブラウザで開いてください。
  - `python3 -m http.server 8080` と実行してhttp://localhost:8080 を開くとか
  - ローカルホストに置いてfile://でアクセスするとブラウザに怒られます
- 処理はクライアントサイド(JacaScript)で実行します。
- JSONをフォームに入力してUpdateボタンを押すと描画します。
  - sample1, sample2, sample3のボタンを押すとサンプルのJSONが入力されます。
    - sampla3は2500ノードで大量のためちょっと描画まで時間がかかるようです
  - グループ囲みは、チェックを操作してUpdateボタンを推してください。
- JSONの形式
  - nodes: 配列
    - { "name": "名前", "group": 番号 }
  - links: 配列
    - { "target": nodeのインデックス, "source": nodeのインデックス }
    - "value": 線の太さ も書けます(省略可能)
    - nodeのインデックスは先頭が0
