/*
 * @Author: huangli 
 * @Date: 2019-04-09 21:09:53 
 * @Last Modified by: huangli
 * @Last Modified time: 2019-04-11 23:17:55
 */

function CitySelectControl(options) {
  this.options = Object.assign({}, CitySelectControl.DEFAULTS, options);

  this._onCityClick = this._onCityClick.bind(this);
  this._onInfoClick = this._onInfoClick.bind(this);
}

CitySelectControl.DEFAULTS = {
  theme: 'light',
  placeholder: '请选择',
  // hot: ['110000', '120000', '310000', '440100', '440300', '330100', '500000', '510100', '420100']
  hot: ['440100', '440300', '330100', '510100'],
  zoom: 10
};

CitySelectControl.prototype.onAdd = function (map) {
  this._map = map;
  this._container = document.createElement('div');
  this._container.className = 'mapboxgl-ctrl';
  this._citySelectContainer = this._createNode('div', 'city-select-box ' + this.options.theme, '', this._container);
  this._cityInfoContainer = this._createNode('div', 'city-info-box', this.options.placeholder, this._citySelectContainer, '', this._onInfoClick);
  this._cityListContainer = this._createNode('div', 'city-list-box', '', this._citySelectContainer);
  this._active = false;
  this._render();
  return this._container;
};

CitySelectControl.prototype.onRemove = function () {
  this._container.parentNode.removeChild(this._container);
  this._map = undefined;
};

CitySelectControl.prototype._render = function () {
  // this._info = this._createNode('span', 'city-info-title', '重庆市', this._cityInfoContainer, '', this._onInfoClick);
  // 直辖市及港澳台
  var municipality = ['110000', '120000', '310000', '500000', '810000', '820000', '710000'];
  // 热门城市
  var hot = this.options.hot;
  if (hot.length > 0) {
    var hotCitysContainer = this._createNode('div', 'city-list city-list-hot', '', this._cityListContainer)
    for (var i = 0; i < hot.length; i++) {
      var code = hot[i];
      var city = this._getCity(code);
      this._createNode('a', 'city-link', city.cname, hotCitysContainer, city.code, this._onCityClick);
    }
  }
  
  var mcplContainer = this._createNode('div', 'city-list city-list-mp', '', this._cityListContainer);
  var cityListboxContainer = this._createNode('div', 'city-list city-list-pv', '', this._cityListContainer);
  var provs = CITYS['86'];
  for (var provcode in provs) {
    if (provs.hasOwnProperty(provcode)) {
      var prov = provs[provcode];
      var prov_city = CITYS[provcode]
      // 直辖市及港澳台
      if (municipality.indexOf(prov.code) > -1) {
        this._createNode('a', 'city-link', prov.cname, mcplContainer, prov.code, this._onCityClick);
      } else {
        // 省
        var provContainer = this._createNode('dl', 'city-list-dl', '', cityListboxContainer);
        this._createNode('dt', 'city-list-dt city-link', prov.cname, provContainer, prov.code, this._onCityClick);
        var cityContainer = this._createNode('dd', 'city-list-dd', '', provContainer);
        for (var citycode in prov_city) {
          if (prov_city.hasOwnProperty(citycode)) {
            var city = prov_city[citycode];
            this._createNode('a', 'city-link', city.cname, cityContainer, city.code, this._onCityClick);
          }
        }
      }

    }
  }
}

/**
 * @description city 的 click 事件
 * @param {any} e
 */
CitySelectControl.prototype._onCityClick = function (e) {
  let code = e.target.getAttribute('data-code');
  this._cityInfoContainer.innerText = e.target.innerText;
  console.log(code);

  let c = this._getCity(code);
  this._map.flyTo({
    center: [c.lon, c.lat],
    zoom: this.options.zoom
  })
}

/**
 * @description info 的 click 事件
 */
CitySelectControl.prototype._onInfoClick = function () {
  this._active = !this._active;
  this._active ? this._cityListContainer.classList.add('active') : this._cityListContainer.classList.remove('active');
}

/**
 * @description 获取城市属性
 * @param {string} code code
 */
CitySelectControl.prototype._getCity = function (code) {
  if (!!CITYS['86'][code]) return CITYS['86'][code];
  let provCode = code.substring(0, 2).padEnd(6, '0');
  return CITYS[provCode][code];
}


/**
 * @description 创建 node，绑定 node 到对应父级，
 * @param {string} className 类名
 * @param {node} container 父级 node
 * @param {string} code data-code 属性值
 * @param {func} fn click 事件
 * @returns {node}
 */
CitySelectControl.prototype._createNode = function (node, className, textContent, container, code, fn) {
  var a = document.createElement(node);
  a.className = className;
  a.textContent = textContent;
  if (code) a.setAttribute('data-code', code);
  if (fn) a.addEventListener('click', fn);
  container.appendChild(a);
  return a;
}

CitySelectControl.prototype._removeNode = function (node, fn) {
  node.remove();
  if (fn) node.removeEventListener('click', fn);
}