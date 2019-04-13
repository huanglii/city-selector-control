/*
 * @Author: huangli 
 * @Date: 2019-04-09 21:09:53 
 * @Last Modified by: huangli
 * @Last Modified time: 2019-04-13 09:15:08
 */

import Citys from './data/citys'
class CitySelectorControl {
  constructor(options) {
    this.options = Object.assign({}, {
      theme: 'light',
      placeholder: '请选择',
      // hot: ['110000', '120000', '310000', '440100', '440300', '330100', '500000', '510100', '420100']
      hot: ['440100', '440300', '330100', '510100'],
      zoom: 10
    }, options);
    this._onCityClick = this._onCityClick.bind(this);
    this._onInfoClick = this._onInfoClick.bind(this);
  }
  onAdd(map) {
    this._map = map;
    this._container = document.createElement('div');
    this._container.className = 'mapboxgl-ctrl';
    this._citySelectContainer = this._createNode('div', 'city-selector-box ' + this.options.theme, '', this._container);
    this._cityInfoContainer = this._createNode('div', 'city-info-box', this.options.placeholder, this._citySelectContainer, '', this._onInfoClick);
    this._cityListContainer = this._createNode('div', 'city-list-box', '', this._citySelectContainer);
    this._active = false;
    this._render();
    return this._container;
  }

  onRemove() {
    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
  }

  _render() {
    // 直辖市及港澳台
    const municipality = ['110000', '120000', '310000', '500000', '810000', '820000', '710000'];
    // 热门城市
    const hot = this.options.hot;
    if (hot.length > 0) {
      const hotCitysContainer = this._createNode('div', 'city-list city-list-hot', '', this._cityListContainer)
      for (let i = 0; i < hot.length; i++) {
        const code = hot[i];
        const city = this._getCity(code);
        this._createNode('a', 'city-link', city.cname, hotCitysContainer, code, this._onCityClick);
      }
    }

    let mcplContainer = this._createNode('div', 'city-list city-list-mp', '', this._cityListContainer);
    let cityListboxContainer = this._createNode('div', 'city-list city-list-pv', '', this._cityListContainer);
    const provs = Citys['86'];
    for (let provcode in provs) {
      if (provs.hasOwnProperty(provcode)) {
        const prov = provs[provcode];
        const prov_city = Citys[provcode];
        // 直辖市及港澳台
        if (municipality.indexOf(provcode) > -1) {
          this._createNode('a', 'city-link', prov.cname, mcplContainer, provcode, this._onCityClick);
        } else {
          // 省
          let provContainer = this._createNode('dl', 'city-list-dl', '', cityListboxContainer);
          this._createNode('dt', 'city-list-dt city-link', prov.cname, provContainer, provcode, this._onCityClick);
          let cityContainer = this._createNode('dd', 'city-list-dd', '', provContainer);
          for (let citycode in prov_city) {
            if (prov_city.hasOwnProperty(citycode)) {
              const city = prov_city[citycode];
              this._createNode('a', 'city-link', city.cname, cityContainer, citycode, this._onCityClick);
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
  _onCityClick(e) {
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
  _onInfoClick() {
    this._active = !this._active;
    this._active ? this._cityListContainer.classList.add('active') : this._cityListContainer.classList.remove('active');
  }

  /**
   * @description 获取城市属性
   * @param {string} code code
   */
  _getCity(code) {
    if (!!Citys['86'][code]) return Citys['86'][code];
    let provCode = code.substring(0, 2).padEnd(6, '0');
    return Citys[provCode][code];
  }


  /**
   * @description 创建 node，绑定 node 到对应父级，
   * @param {string} className 类名
   * @param {node} container 父级 node
   * @param {string} code data-code 属性值
   * @param {func} fn click 事件
   * @returns {node}
   */
  _createNode(node, className, textContent, container, code, fn) {
    let a = document.createElement(node);
    a.className = className;
    a.textContent = textContent;
    if (code) a.setAttribute('data-code', code);
    if (fn) a.addEventListener('click', fn);
    container.appendChild(a);
    return a;
  }

  _removeNode(node, fn) {
    node.remove();
    if (fn) node.removeEventListener('click', fn);
  }
}

export default CitySelectorControl;