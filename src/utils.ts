/**
 * @description 创建 node，绑定 node 到对应父级，
 * @param {string} className 类名
 * @param {node} container 父级 node
 * @param {string} code data-code 属性值
 * @param {func} fn click 事件
 * @returns {node}
 */
export function createNode(
  node: keyof HTMLElementTagNameMap,
  className: string,
  textContent: string,
  container: HTMLElement,
  code?: string,
  fn?: EventListener
): HTMLElement {
  let a = document.createElement(node)
  a.className = className
  a.textContent = textContent
  if (code) a.setAttribute('data-code', code)
  if (fn) a.addEventListener('click', fn)
  container.appendChild(a)
  return a
}

export function removeNode(node, fn) {
  node.remove()
  if (fn) node.removeEventListener('click', fn)
}
