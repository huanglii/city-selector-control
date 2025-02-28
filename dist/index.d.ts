/// <reference types="mapbox-gl" />

declare class CitySelectorControl {
    options: CitySelectorOptions;
    private _map;
    private _container;
    private _citySelectContainer;
    private _cityListboxContainer;
    private _cityInfoContainer;
    private _cityListContainer;
    private _active;
    constructor(options: CitySelectorOptions);
    onAdd(map: mapboxgl.Map): HTMLElement;
    onRemove(): void;
    private _render;
    /**
     * @description city 的 click 事件
     * @param {any} e
     */
    private _onCityClick;
    /**
     * @description letter 的 click 事件
     * @param {*} e
     */
    private _onLetterClick;
    /**
     * @description info 的 click 事件
     */
    private _onInfoClick;
    /**
     * @description 获取城市属性
     * @param {string} code code
     */
    private _getCity;
}
export default CitySelectorControl;

export declare interface CitySelectorOptions {
    theme: 'light' | 'dark';
    placeholder: string;
    hot: string[];
    zoom: number;
}

export { }
