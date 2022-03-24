# richtext-parse-to-unity-egret

**中文** | [English](./README.en.md)

## 简介

richtext-parse-to-unity-egret是一个工具库，用于web富文本转化为游戏引擎（unity、egret）支持的格式。
同时转义对老牌的富文本编辑器做了初步兼容，推荐使用[wangEditor](https://github.com/wangeditor-team/wangEditor)开源的富文本编辑器V4或V5版本

## 使用方式
- browser
  
``` HTML
<script src="https://cdn.jsdelivr.net/npm/richtext-parse-to-unity-egret"></script>
<script>
  const { parseUnity, parseEgret } = window['richtext-parse-to-unity-egret']
</script>
```

- node
``` bash
$ npm i -g npm
$ npm i richtext-parse-to-unity-egret
```
``` typescript
// 引入两种转义方法
const { parseUnity, parseEgret } = require('richtext-parse-to-unity-egret');

/***
 * @description 转义unity支持的富文本格式
 * @params htmlStr 传入web富文本字段
 * @params setting{sizeMap} 配置项: 配置字号转化
 * */ 
const unityText = parseUnity(htmlStr: string, {
  sizeMap: {
    1: 32,
    2: 28,
    3: 26,
    4: 20,
    5: 16,
    6: 14,
    7: 12,
  }
})·

```

## 格式支持（后续继续支持...）

|         |    unity   |    egret   |
|   :-:   |     :-:    |    :-:   |
|字体大小|     ✔️     |     ✔️   |
|字体颜色|     ✔️     |     ✔️   |
|加粗   |     ✔️     |     ✔️   |
|下划线   |     ✔️     |    ❌  |
|斜体   |     ✔️     |    ❌  |
|行间距  |     ✔️     |     ❌   |
|居左/居中/居右|     ✔️     |     ❌    |
|跳转链接<br>[（跳转内部/跳转外部）](跳转规则 "跳转规则")|     ✔️     |     ✔️   |


## 链接跳转规则
web富文本格式
``` HTML
<!-- 内部跳转文本格式： <a name="#内部跳转代码标识"> -->
<a name="#125,151|2003,197|200003,114" type="gameSystemLink">跳转链接</a>

<!-- 外部跳转文本格式： <a name="#外部跳转链接"> -->
<a name="#www.baidu.com" type="gameSystemLink">跳转链接</a>
```

转义成unity格式
``` JavaScript
// 内部跳转
<link=openSystem__@@__125,151|2003,197|200003,114>跳转链接</link>

// 外部跳转
<link=openUrl__@@__www.baidu.com>跳转链接</link>
```


转义成egret格式
``` JavaScript
//  内部跳转
<a href='event:openURL_125,151|2003,197|200003,114'>跳转链接</a>

//  外部跳转
<a href='event:openURL_www.baidu.com'>跳转链接</a>
```

## 相关链接
- [unity富文本格式规则](http://digitalnativestudios.com/textmeshpro/docs/rich-text)
