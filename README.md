# City Selector Control
[![npm](https://img.shields.io/npm/v/city-selector-control.svg)][npm-url] [![npm](https://img.shields.io/npm/dt/city-selector-control.svg?style=popout)][npm-url]

[npm-url]: https://www.npmjs.com/package/city-selector-control

***A City Selector Control for `mapbox-gl`***


## Installation

```bash
npm i city-selector-control
```

## Usage

```javascript
new CitySelectorControl(options: Object)
```

### Options
|#|Name|Type|Description|Default|
|---|---|---|---|---|
|1|`theme`|`String `|Theme, optional `'light'` or `'dark'`.|`'light'`|
|2|`placeholder`|`String`|The initialized text.|`'请选择'` |
|2|`hot`|`Array`|The code for hot cities.|`['440100', '440300', '330100', '510100']` |
|2|`zoom`|`Number`|The desired zoom level.|`10` |

### Example

```javascript
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

## Screenshots

![theme](assets/theme.jpg)
![default](assets/default.gif)

