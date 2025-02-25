
export default CitySelectorControl
declare class CitySelectorControl implements mapboxgl.IControl{
    container: HTMLDivElement;
    buttonIn: HTMLButtonElement;
    buttonOut: HTMLButtonElement;
    onAdd(map: mapboxgl.Map): HTMLElement;
    map: mapboxgl.Map | undefined;
    onRemove(): void;
}
