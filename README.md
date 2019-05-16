# City Selector Control
[![npm](https://img.shields.io/npm/v/city-selector-control.svg)][npm-url] [![npm](https://img.shields.io/npm/dt/city-selector-control.svg?style=popout)][npm-url]

[npm-url]: https://www.npmjs.com/package/city-selector-control

***A City Selector Control for `mapbox-gl`***


## 快速开始

### 使用 CDN
``` html
<script src="https://cdn.jsdelivr.net/npm/city-selector-control@0.2.2/dist/index.js"></script>
<link href="https://cdn.jsdelivr.net/npm/city-selector-control@0.2.2/dist/style.css" rel="stylesheet">
````
``` html
<div id='map' style='width: 800px; height: 600px;'></div>
<script>
  mapboxgl.accessToken = '<your access token here>';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9'
  });
  map.addControl(new CitySelectorControl(), 'top-right');
</script>
```
### 模块化
``` bash
npm i city-selector-control
```
``` javascript
import CitySelectorControl from 'city-selector-control'
import 'city-selector-control/style.css'
// 默认选项
map.addControl(new CitySelectorControl(), 'top-right')

// 自定义
const citySelectorOptions = {
  theme: 'dark',
  placeholder: '全国',
  hot: ['110000', '340500'],
  zoom: 12
};
map.addControl(new CitySelectorControl(citySelectorOptions), 'top-right');
```

## 选项
|#|名称|类型|描述|默认值|
|---|---|---|---|---|
|1|`theme`|`String `|主题, 可选 `'light'` 或 `'dark'`.|`'light'`|
|2|`placeholder`|`String`|初始化时的文本.|`'请选择'` |
|2|`hot`|`Array`|热门城市编码，可为空 [].|`['440100', '440300', '330100', '510100']` |
|2|`zoom`|`Number`|选择城市后的缩放级别.|`10` |

## 截图

![theme](assets/theme.jpg)
![default](assets/default.gif)

