import citys from './data/citys'
import {createNode} from './utils'
import type { Citys } from './data/citys'
import type {CitySelectorOptions} from './index.d'
export default class CitySelectorControl{
  options = {
    theme: 'light',
    placeholder: '请选择',
    // hot: ['110000', '120000', '310000', '440100', '440300', '330100', '500000', '510100', '420100']
    hot: ['440100', '440300', '330100', '510100'],
    zoom: 10,
  } as CitySelectorOptions
  private _map: mapboxgl.Map | undefined
  private _container: HTMLElement | undefined
  private _citySelectContainer: HTMLElement | undefined
  private _cityListboxContainer: HTMLElement | undefined
  private _cityInfoContainer: HTMLElement | undefined
  private _cityListContainer: HTMLElement | undefined
  private _active: boolean | undefined

  constructor(options: CitySelectorOptions) {
    this.options = Object.assign(
      {},
      {
        theme: 'light',
        placeholder: '请选择',
        // hot: ['110000', '120000', '310000', '440100', '440300', '330100', '500000', '510100', '420100']
        hot: ['440100', '440300', '330100', '510100'],
        zoom: 10,
      },
      options
    )
    this._onCityClick = this._onCityClick.bind(this)
    this._onInfoClick = this._onInfoClick.bind(this)
    this._onLetterClick = this._onLetterClick.bind(this)
  }
  onAdd(map: mapboxgl.Map) {
    this._map = map
    this._container = document.createElement('div')
    this._container.className = 'mapboxgl-ctrl'
    this._citySelectContainer = createNode('div', 'city-selector-box ' + this.options.theme, '', this._container)
    this._cityInfoContainer = createNode(
      'div',
      'city-info-box',
      this.options.placeholder,
      this._citySelectContainer,
      '',
      this._onInfoClick
    )
    this._cityListContainer = createNode('div', 'city-list-box', '', this._citySelectContainer)
    this._active = false
    this._render()
    return this._container
  }

  onRemove() {
    this._container?.parentNode?.removeChild(this._container)
    this._map = undefined
  }

  private _render() {
    // 热门城市
    const hot = this.options.hot
    // 直辖市及港澳台
    const municipality = ['110000', '120000', '310000', '500000', '810000', '820000', '710000']
    // 省拼音快捷索引
    const provLetters = ['A', 'F', 'G', 'H', 'J', 'L', 'N', 'Q', 'S', 'X', 'Y', 'Z']
    if (hot.length > 0) {
      const hotCitysContainer = createNode('div', 'city-list city-list-hot', '', this._cityListContainer as HTMLElement)
      for (let i = 0; i < hot.length; i++) {
        const code = hot[i]
        const city = this._getCity(code)
        createNode('a', 'city-link', city.cname, hotCitysContainer, code, this._onCityClick)
      }
    }
    const provs: Citys[string] = citys['86']
    // 直辖市及港澳台
    let mcplContainer = createNode('div', 'city-list city-list-mp', '', this._cityListContainer as HTMLElement)
    for (let i = 0; i < municipality.length; i++) {
      const provcode= municipality[i]
      let prov = provs[provcode]
      createNode('a', 'city-link', prov.cname, mcplContainer, provcode, this._onCityClick)
    }
    // 省拼音快捷索引
    let provLetterboxContainer = createNode('div', 'city-list city-list-lt', '', this._cityListContainer as HTMLElement)
    for (let i = 0; i < provLetters.length; i++) {
      createNode('div', 'letter-link', provLetters[i], provLetterboxContainer, '', this._onLetterClick)
    }
    // 省
    this._cityListboxContainer = createNode('div', 'city-list city-list-pv', '', this._cityListContainer as HTMLElement)
    // 按拼音排序
    let provsSortedKeys = Object.keys(provs).sort((a, b) => {
      return provs[a].pyname.charCodeAt() - provs[b].pyname.charCodeAt()
    })
    for (let i = 0; i < provsSortedKeys.length; i++) {
      const provcode = provsSortedKeys[i]
      if (municipality.indexOf(provcode) > -1) {
        continue // 直辖市及港澳台
      }
      const prov = provs[provcode]
      const prov_city = citys[provcode]
      // 省
      let provContainer = createNode('dl', 'city-list-dl letter-' + prov.pyname[0], '', this._cityListboxContainer)
      createNode('dt', 'city-list-dt city-link', prov.cname, provContainer, provcode, this._onCityClick)
      let cityContainer = createNode('dd', 'city-list-dd', '', provContainer)
      // 省对应的市
      for (let citycode in prov_city) {
        if (prov_city.hasOwnProperty(citycode)) {
          const city = prov_city[citycode]
          createNode('a', 'city-link', city.cname, cityContainer, citycode, this._onCityClick)
        }
      }
    }
  }

  /**
   * @description city 的 click 事件
   * @param {any} e
   */
  private _onCityClick(e) {
    let code = e.target.getAttribute('data-code')
    this._cityInfoContainer!.innerText = e.target.innerText

    let c = this._getCity(code)
    this._map && this._map.flyTo({
      center: [c.lon, c.lat],
      zoom: this.options.zoom,
    })
  }

  /**
   * @description letter 的 click 事件
   * @param {*} e
   */
  private _onLetterClick(e) {
    let l = e.target.innerText
    this._cityListboxContainer?.querySelector('.letter-' + l)?.scrollIntoView(true)
  }

  /**
   * @description info 的 click 事件
   */
  private _onInfoClick() {
    this._active = !this._active
    this._active ? this._cityListContainer?.classList.add('active') : this._cityListContainer?.classList.remove('active')
  }

  /**
   * @description 获取城市属性
   * @param {string} code code
   */
  private _getCity(code: string) {
    if (!!citys['86'][code]) return citys['86'][code]
    let provCode = code.substring(0, 2).padEnd(6, '0')
    return citys[provCode][code]
  }
}
