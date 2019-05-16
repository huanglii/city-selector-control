# City Selector Control
[![npm](https://img.shields.io/npm/v/city-selector-control.svg)][npm-url] [![npm](https://img.shields.io/npm/dt/city-selector-control.svg?style=popout)][npm-url]

[npm-url]: https://www.npmjs.com/package/city-selector-control

***A City Selector Control for `mapbox-gl`***


## Quickstart

### Using CDN
``` html
<script src="https://cdn.jsdelivr.net/npm/city-selector-control@0.2.1/dist/city-selector-control.js"></script>
<link href="https://cdn.jsdelivr.net/npm/city-selector-control@0.2.1/dist/city-selector-control.css" rel="stylesheet">
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
### Module bundler
``` bash
npm i city-selector-control
```
``` javascript
import CitySelectorControl from 'city-selector-control'
import 'city-selector-control/style.css'
// default options
map.addControl(new CitySelectorControl(), 'top-right')

// custom options
const citySelectorOptions = {
  theme: 'dark',
  placeholder: '全国',
  hot: ['110000', '340500'],
  zoom: 12
};
map.addControl(new CitySelectorControl(citySelectorOptions), 'top-right');
```

## Options
|#|Name|Type|Description|Default|
|---|---|---|---|---|
|1|`theme`|`String `|Theme, optional `'light'` or `'dark'`.|`'light'`|
|2|`placeholder`|`String`|The initialized text.|`'请选择'` |
|2|`hot`|`Array`|The code for hot cities.|`['440100', '440300', '330100', '510100']` |
|2|`zoom`|`Number`|The desired zoom level.|`10` |

## Screenshots

![theme](assets/theme.jpg)
![default](assets/default.gif)

